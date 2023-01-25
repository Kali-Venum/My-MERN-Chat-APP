import { Box } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import SideDrower from "../Components/misc/SideDrower";
import MyChats from "../Components/misc/MyChats";
import ChatBox from "../Components/misc/ChatBox";

export default function ChatPage() {
  const user = useSelector((state) => state.user.value);

  return (
    <div>
      {user && <SideDrower />}
      <Box>
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
}
