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

  return (
    <>
      {props.children ? (
        <span onClick={onOpen}> {props.children} </span>
      ) : (
        <IconButton
          d={{ base: "flex" }}
          icon={<AtSignIcon />}
          onClick={onOpen}
        />
      )}

      <Modal size={"lg"} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.userStateData.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Email:- {props.userStateData.email}</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfileModal;
