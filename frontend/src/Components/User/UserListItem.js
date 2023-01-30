import { Box, Text, Avatar } from "@chakra-ui/react";

const UserListItem = (props) => {
  return (
    <Box
    //   onClick={props.handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      display="flex"
      alighnItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderredious="lg"
    >
      <Avatar mr={2} size="sm" cursor="pointer" name={props.user.name} />
      <Box>
        <Text>{props.user.name}</Text>
        <Text fontSize="xs">
          <b>Email:- </b> {props.user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
