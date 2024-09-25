import { MoreVert } from "@mui/icons-material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
// import { Users } from "../../dummyDate";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { AuthContext } from "../../state/AuthContext";
import "./Post.css";
export default function Post({ post }) {
  const REACT_APP_PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/api/users?userId=${post.userId}`);
      console.log(response);
      setUser(response.data);
      // console.log(response);
    };

    fetchUser();
  }, [post.userId]);

  const handLike = async () => {
    try {
      //いいねのAPIを叩く
      await axios.put(`/api/posts/${post._id}/like`, {
        userId: currentUser._id,
      });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? REACT_APP_PUBLIC_FOLDER + user.profilePicture
                    : REACT_APP_PUBLIC_FOLDER + "/person/noAvatar.png"
                }
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postRight">
            
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img
            src={REACT_APP_PUBLIC_FOLDER + post.img}
            alt=""
            className="postImg"
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={REACT_APP_PUBLIC_FOLDER + "/heart.png"}
              alt=""
              className="likeIcon"
              onClick={() => handLike()}
            />
            <span className="postLikeCounter">
              {like}人がいいねを押しました。
            </span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment}:コメント</span>
          </div>
        </div>
      </div>
    </div>
  );
}
