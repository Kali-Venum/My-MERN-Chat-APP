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
  useToast,
} from "@chakra-ui/react";

function Register() {
  const toast = useToast();
  
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [loading, setLoading] = useState(false);

  const onRegisterHandler = async () => {
    setLoading((state) => true);
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please provide all the details.",
        description: "Please provide name, email, password & confirm password",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setLoading((state) => false);
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Password & Confirm password is unmatched.",
        description: "Please provide the right password & confirm password.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setLoading((state) => false);
      return;
    }

    try {
      
    } catch (error) {
      
    }
  };

  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
    >
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type={"text"}
          placeholder="Enter your name"
          onChange={(e) => setName((state) => e.target.value)}
          value={name}
        />
      </FormControl>
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
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your confirm password"
            onChange={(e) => setConfirmPassword((state) => e.target.value)}
            value={confirmPassword}
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
        onClick={onRegisterHandler}
        isLoading={loading}
      >
        Register
      </Button>
    </VStack>
  );
}

export default Register;
