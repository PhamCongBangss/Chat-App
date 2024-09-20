import { useEffect, useState } from "react";
import "./chatlist.css";
import AddUser from "./addUser/AddUser";
import userStorage from "../../../lib/userStorage";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import chatStorage from "../../../lib/chatStorage";

function Chatlist() {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);

  const { currentUser } = userStorage();
  const { changeChat, chatId } = chatStorage();

  useEffect(
    function () {
      const unSub = onSnapshot(
        doc(db, "userchats", currentUser.id),
        async (res) => {
          const items = res.data().chats;
          const promisses = items.map(async (item) => {
            const userDocRef = doc(db, "users", item.receiverId);
            const userDocSnap = await getDoc(userDocRef);

            const user = userDocSnap.data();

            return { ...item, user };
          });

          const chatData = await Promise.all(promisses);
          setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
        }
      );

      return function () {
        unSub();
      };
    },
    [currentUser.id]
  );

  async function handleSelect(chat) {
    changeChat(chat.chatId, chat.user);
  }

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="/search.png" alt="" />
          <input type="text" placeholder="Search" />
        </div>
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          onClick={() => setAddMode((add) => !add)}
          alt=""
          className="add"
        />
      </div>

      {chats.map((chat) => (
        <div
          className="item"
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
        >
          <img src={chat.user.avatar || "./avatar.png"} alt="" />
          <div className="text">
            <span>{chat.user.username}</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {addMode && <AddUser />}
    </div>
  );
}

export default Chatlist;
