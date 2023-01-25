import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

function Login() {
  const navigate = useNavigate();
  const toast = useToast();

  const [show, setShow] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const onLoginHandler = async () => {
    setLoading((state) => true);
    if (!email || !password) {
      toast({
        title: "Please provide all the details.",
        description: "Please provide your email & password.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setLoading((state) => false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        },
        config
      );
      if (data) {
        toast({
          title: "Login Successful",
          description: "You have successfully logged in to your account.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading((state) => false);
        navigate("/chats");
      }
    } catch (error) {
      toast({
        title: "Login Faild",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setLoading((state) => false);
    }
  };

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
              {show ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme={"green"}
        width={"100%"}
        marginTop={"15px"}
        onClick={onLoginHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        colorScheme={"blue"}
        width={"100%"}
        marginTop={"15px"}
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("12345678A");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
}

export default Login;
