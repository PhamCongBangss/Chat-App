import { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import chatStorage from "../../lib/chatStorage";
import userStorage from "../../lib/userStorage";

function Chat() {
  const [chat, setChat] = useState(null);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const { chatId, user } = chatStorage();
  const { currentUser } = userStorage();

  const endRef = useRef(null);

  useEffect(function () {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  useEffect(
    function () {
      const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
        setChat(res.data());
      });

      return function () {
        unSub();
      };
    },
    [chatId]
  );

  console.log(chat);
  function handleEmoji(e) {
    setText((text) => text + e.emoji);
    setOpen(false);
  }

  async function handleSend() {
    if (text === "") return;

    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
        }),
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatRef = doc(db, "userchats", id);
        const userChatSnapshot = await getDoc(userChatRef);

        if (userChatSnapshot.exists()) {
          const userChatData = userChatSnapshot.data();
          console.log(userChatData);
          const chatIndex = userChatData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatData.chats[chatIndex].lastMessage = text;
          userChatData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatRef, {
            chats: userChatData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="/avatar.png" />

          <div className="text">
            <span>Bang Pham</span>
            <p>Xin chao viet nam</p>
          </div>
        </div>

        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>

      <div className="center">
        {chat?.messages?.map((message) => {
          <div className="message own" key={message?.createdAt}>
            <div className="text">
              {message.img && <img src={message.img} alt="" />}
              <p>{message.text}</p>
              {<span></span>}
            </div>
          </div>;
        })}

        <div className="message own">
          <div className="text">
            <p>Hello nhaaa</p>
            <span>1 minute ago</span>
          </div>
        </div>
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          value={text}
          type="text"
          placeholder="Type a message..."
          onChange={(e) => setText(e.target.value)}
        />
        <div className="emoji">
          <img src="./emoji.png" onClick={() => setOpen((open) => !open)} />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendButton" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
