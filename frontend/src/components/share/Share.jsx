import { Image } from "@mui/icons-material";
import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../state/AuthContext";
import "./Share.css";
//import Reavrasaj  from "./ogesasas/kishikounosues:"
export default function Share() {
  const REACT_APP_PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [isPosting, setIsPosting] = useState(false); // 投稿中かどうかの状態
  const [isPosted, setIsPosted] = useState(false); // 投稿成功後の状態

  const [file, setFile] = useState(null);
  console.log(file);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPosting(true); // 投稿中に設定

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await axios.post("/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      await axios.post("/api/posts", newPost);
      setIsPosting(false); // 投稿完了に設定
      setIsPosted(true); // 投稿成功に設定
      window.location.reload();
    } catch (err) {
      console.log(err);
      setIsPosting(false); // 投稿失敗に設定
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              user.profilePicture
                ? REACT_APP_PUBLIC_FOLDER + user.profilePicture
                : REACT_APP_PUBLIC_FOLDER + "/person/noAvatar.png"
            }
            alt=""
            className="shareProfileImg"
          />

          <input
            type="text"
            className="shareInput"
            placeholder="今何してる？"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />

        <form className="shareButtons" onSubmit={(e) => handleSubmit(e)}>
          <label className="shareOptions" htmlFor="file">
            <Image className="shareIcon" htmlColor="blue" />
            <span className="shareOptionText">写真</span>
            <input
              type="file"
              id="file"
              accept=".png, .jpeg, .jpg"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
          {/* <div className="shareOptions">
            <Gif className="shareIcon" htmlColor="hotpink" />
            <span className="shareOptionText">GIF</span>
          </div>
          <div className="shareOptions">
            <Face className="shareIcon" htmlColor="green" />
            <span className="shareOptionText">気持ち</span>
          </div>
          <div className="shareOptions">
            <Analytics className="shareIcon" htmlColor="red" />
            <span className="shareOptionText">投票</span>
          </div> */}
          <button
            className={`shareButton ${isPosted ? "posted" : ""}`}
            type="submit"
            disabled={isPosting} // 投稿中はボタンを無効化
          >
            {isPosting ? "投稿中..." : "投稿"}
          </button>
        </form>
      </div>
    </div>
  );
}
