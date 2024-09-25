import { Home, Notifications, Person } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import { Users } from "../../dummyDate";
import "./Sidebar.css";

export default function Sidebar() {
  const currentUser = Users[0]; // 例としてkishi（最初のユーザを使用）
  const username = currentUser.username;

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Home className="sidebarIcon" />
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <span className="sidebarListItemText">ホーム</span>
            </Link>
          </li>
          {/* <li className="sidebarListItem">
                <Search className="sidebarIcon" />
                <span className="sidebarListItemText">検索</span>
            </li> */}
          <li className="sidebarListItem">
            <Notifications className="sidebarIcon" />
            <Link
              to="/message1"
              style={{ textDecoration: "none", color: "black" }}
            >
              <span className="sidebarListItemText">メッセージ</span>
            </Link>
          </li>
          {/* <li className="sidebarListItem">
                <Bookmark className="sidebarIcon" />
                <span className="sidebarListItemText">ブックマーク</span>
            </li> */}
          <li className="sidebarListItem">
            <Person className="sidebarIcon" />
            <Link
              to={`/profile/${username}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <span className="sidebarListItemText">プロフィール</span>
            </Link>
          </li>
          {/* <li className="sidebarListItem">
                <Settings className="sidebarIcon" />
                <span className="sidebarListItemText">設定</span>
            </li> */}
        </ul>

        {/* <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map((user) => (
            <CloseFriend user={user} key={user.id} />
          ))}
        </ul> */}
      </div>
    </div>
  );
}
