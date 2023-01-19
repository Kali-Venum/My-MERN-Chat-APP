import React, { useState } from "react";
import {
  VStack,
  StackDivider,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";

function Login() {
  const [show, setShow] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onLoginHandler = () => {
    console.log("click...");
  }

  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
    >
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type={"email"}
          placeholder="Enter your email"
          onChange={(e) => setEmail((state) => e.target.value)}
          value={email}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setPassword((state) => e.target.value)}
            value={password}
          />
          <InputRightElement>
            <Button
              h={"40px"}
              size={"sm"}
              onClick={(e) => setShow((state) => !state)}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme={"green"}
        width={"100%"}
        marginTop={"15px"}
        onClick={onLoginHandler}
      >
        Login
      </Button>
    </VStack>
  );
}

export default Login;
