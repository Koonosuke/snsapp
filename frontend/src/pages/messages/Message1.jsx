import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./Message1.css";
const clientId = Math.random().toString(36).substring(2, 11);
const socket = io("http://localhost:3018", {
  transports: ["websocket"],
  query: { clientId: clientId },
});
export default function Message1() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [sender, setSender] = useState("あなた");
  const [newSenderName, setNewSenderName] = useState("");
  const [senders, setSenders] = useState(["岸", "川﨑", "小池"]);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    socket.on("chat message", (msg) => {
      console.log("Received message:", msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    return () => {
      socket.off("chat message");
      socket.disconnect();
    };
  }, []);
  const sendMessage = () => {
    if (inputMessage.trim() !== "") {
      const message = {
        sender: sender,
        text: inputMessage,
        timestamp: new Date().toLocaleTimeString(),
      };
      console.log("Sending message:", message);
      socket.emit("chat message", message);
      setInputMessage("");
    }
  };
  const addSender = () => {
    if (newSenderName.trim() !== "" && !senders.includes(newSenderName)) {
      setSenders((prevSenders) => [...prevSenders, newSenderName]);
      setNewSenderName("");
    }
  };
  return (
    <div className="message1-background">
      <div className="chat-container">
        <h1>メッセージ</h1>
        <div className="messages-container">
          {messages.map((msg, index) => (
            <p key={index} className="message">
              <strong>{msg.sender}</strong>: {msg.text}{" "}
              <span className="timestamp">{msg.timestamp}</span>
            </p>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="input-message"
          />
          <button onClick={sendMessage} className="send-button">
            送信
          </button>
        </div>
        <div>
          <input type="file" id="file" accept=".png, .jpeg, .jpg" />
          <h3>自分の名前を押すか、追加して送信してね</h3>
        </div>
        <div className="sender-buttons">
          {senders.map((senderName, index) => (
            <button
              key={index}
              onClick={() => setSender(senderName)}
              className="sender-button"
            >
              {senderName}
            </button>
          ))}
        </div>
        <div className="add-sender-container">
          <input
            type="text"
            value={newSenderName}
            onChange={(e) => setNewSenderName(e.target.value)}
            placeholder="新しい名前を入力"
            className="input-new-sender"
          />
          <button onClick={addSender} className="add-sender-button">
            追加
          </button>
        </div>
      </div>
    </div>
  );
}
