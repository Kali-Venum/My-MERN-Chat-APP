import {
  Box,
  Button,
  Menu,
  MenuButton,
  Text,
  Tooltip,
  Avatar,
  MenuList,
  MenuDivider,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

import ProfileModal from "./ProfileModal";

function SideDrower(props) {
  const [search, useSearch] = useState("");
  const [searchResult, useSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  console.log(props.userStateData, "<<== props.userStateData...")

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg={"white"}
        w={"100%"}
        p={"5px 10px 5px 10px"}
        borderWidth={"5px"}
      >
        <Tooltip label="Search users to chat." hasArrow placement="bottom-end">
          <Button variant={"ghost"}>
            <BsSearch />
            <Text d={{ base: "none", md: "flex" }} px={"4"}>
              Search Users
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize={"2xl"}>My-Chat-App</Text>
        <div>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size={"sm"}
                cursor={"pointer"}
                name={props.userStateData.name}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal userStateData={props.userStateData}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              {/* <MenuDivider /> */}
              {/* <MenuItem>Logout</MenuItem> */}
            </MenuList>
          </Menu>
        </div>
      </Box>
    </>
  );
}

export default SideDrower;
