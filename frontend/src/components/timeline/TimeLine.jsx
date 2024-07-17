import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
//import { Post } from "../../dummyDate";
import { AuthContext } from "../../state/AuthContext";
import Post from "../post/Post";
import Share from "../share/Share";
import "./TimeLine.css";

export default function TimeLine({ username }) {
  const [posts, setPosts] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = username
        ? await axios.get(`/api/posts/profile/${username}`)
        : await axios.get(`/api/posts/timeline/${user._id}`); //PostmanからとってきたuserId
      setPosts(
        response.data.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        })
      );

      // console.log(response);
    };

    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="timeline">
      <div className="timelineWrapper">
        <Share />
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
}
