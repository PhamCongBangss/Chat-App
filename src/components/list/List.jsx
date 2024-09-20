import Chatlist from "./chatlist/Chatlist";
import "./list.css";
import Userinfo from "./Userinfo/Userinfo";

function List() {
  return (
    <div className="list">
      <Userinfo />
      <Chatlist />
    </div>
  );
}

export default List;
