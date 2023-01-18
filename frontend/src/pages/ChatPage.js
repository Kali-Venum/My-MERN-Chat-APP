import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ChatPage() {
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    console.log(data);
    setChats((state) => data);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      {chats.map((chat) => (
        <div key={chat.id}> {chat.title} </div>
      ))}
    </div>
  );
}
