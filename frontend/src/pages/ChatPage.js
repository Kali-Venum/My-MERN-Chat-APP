import { Box } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import SideDrower from "../Components/misc/SideDrower";
import MyChats from "../Components/misc/MyChats";
import ChatBox from "../Components/misc/ChatBox";

export default function ChatPage() {
  const user = useSelector((state) => state.user.value);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrower userStateData={user.data} />}
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        w={"100%"}
        h={"91.5vh"}
        p={"10px"}
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
}
