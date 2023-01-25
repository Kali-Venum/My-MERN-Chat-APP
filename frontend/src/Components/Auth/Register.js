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

function Register() {
  const navigate = useNavigate();
  const toast = useToast();

  const [showOne, setShowOne] = useState(false);
  const [showTwo, setShowTwo] = useState(false);
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
      setLoading((state) => true);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          name,
          email,
          password,
          confirmPassword,
        },
        config
      );

      if (data) {
        toast({
          title: "Registration successful.",
          description: "You have been registered successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        setLoading((state) => false);
        navigate("/chats");
      }
    } catch (error) {
      toast({
        title: "Registration Faild",
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
            type={showOne ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setPassword((state) => e.target.value)}
            value={password}
          />
          <InputRightElement>
            <Button
              h={"40px"}
              size={"sm"}
              onClick={(e) => setShowOne((state) => !state)}
            >
              {showOne ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={showTwo ? "text" : "password"}
            placeholder="Enter your confirm password"
            onChange={(e) => setConfirmPassword((state) => e.target.value)}
            value={confirmPassword}
          />
          <InputRightElement>
            <Button
              h={"40px"}
              size={"sm"}
              onClick={(e) => setShowTwo((state) => !state)}
            >
              {showTwo ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
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
