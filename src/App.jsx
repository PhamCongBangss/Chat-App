import { useEffect } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import userStorage from "./lib/userStorage";
import chatStorage from "./lib/chatStorage";

const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = userStorage();
  const { chatId } = chatStorage();

  useEffect(
    function () {
      const unSub = onAuthStateChanged(auth, (user) => {
        fetchUserInfo(user?.uid);
      });

      return function () {
        unSub();
      };
    },
    [fetchUserInfo]
  );

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Detail />}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;
