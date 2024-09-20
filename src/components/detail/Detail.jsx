import { auth } from "../../lib/firebase";
import "./detail.css";

function Detail() {
  return (
    <div className="detail">
      <div className="user">
        <img src="./avatar.png" />
        <h2>Bang Pham</h2>
        <p>Tui ten la Bang Pham</p>
      </div>

      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Setting</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photo">
            <div className="photoItem ">
              <div className="photoDetail">
                <img src="./meow.jpg" alt="" />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button>Block user</button>
        <button className="logout" onClick={() => auth.signOut()}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Detail;
