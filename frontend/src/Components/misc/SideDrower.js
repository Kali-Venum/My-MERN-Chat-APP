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
  Input,
  useToast,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import axios from "axios";

import ProfileModal from "./ProfileModal";
import ChatLoading from "./ChatLoading";
import UserListItem from "../User/UserListItem";

function SideDrower(props) {
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  // const [selectedChat, setSelectedChat] = useState();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please provide a search text.",
        description: "Enter a search text to get search results.",
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "top-left",
      });
    } else {
      try {
        setLoading((state) => true);

        const tokenData = localStorage.getItem("userInfo");
        const accessToken = JSON.parse(tokenData);
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken.token}`,
          },
        };

        const { data } = await axios.get(
          `api/users/all?search=${search}`,
          config
        );

        if (data) {
          setLoading((state) => false);
          setSearchResult((state) => data);
        }
      } catch (error) {
        toast({
          title: "Error Occured..!",
          description: "Failed to load search results.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    }
  };

  // const accessChat = async () => {
  //   try {
  //     setLoadingChat((state) => true)

  //     const config = {
  //       "Content-Type": "application/json",
  //       headers: {
  //         Authorization: `Bearer ${accessToken.token}`,
  //       },
  //     };

  //     const {data} = await axios.post('/api/chat', {userId}, config);

  //     if(data){
  //       setLoadingChat((state) => false);
  //       setSelectedChat(data)
  //     }
  //   } catch (error) {
      
  //   }
  // };

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
          <Button variant={"ghost"} onClick={onOpen}>
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
              <MenuDivider />
              <MenuItem onClick={() => logoutHandler()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display={"flex"} pb={2}>
              <Input
                placeholder="Search users by name & email"
                mr={2}
                value={search}
                onChange={(e) => setSearch((state) => e.target.value)}
              />
              <Button colorScheme="green" onClick={handleSearch}>
                Search
              </Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.data?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  // handleFunction={() => accessChat(props.userStateData._id)}
                />
              ))
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrower;
