import React from "react";
import {
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { AtSignIcon } from "@chakra-ui/icons";

function ProfileModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(props.userStateData, "<<<=== props.userStateData...");

  return (
    <>
      {props.userStateData ? (
        <h1>{props.userStateData.name}</h1>
      ) : (
        <IconButton
          d={{ base: "flex" }}
          icon={<AtSignIcon />}
          onClick={onOpen}
        />
      )}
    </>
  );
}

export default ProfileModal;
