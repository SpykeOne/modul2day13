import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  Icon,
  InputRightAddon,
  InputRightElement,
  FormHelperText,
} from "@chakra-ui/react";

import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useFormik } from "formik";
import axios from "axios";
import jsCookie from "js-cookie";
import * as Yup from "yup";
import { useState } from "react";
import auth_types from "../../../redux/reducer/auth/type";
import { axiosInstance } from "../../../lib/hoc/api";
import { useRouter } from 'next/router'
import { useDispatch } from "react-redux";

export default function login() {
  const [passwordView, setPasswordView] = useState(false);

  const dispatch = useDispatch()

  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required("email harus diisi"),
      password: Yup.string().required("password harus diisi"),
    }),
    validateOnChange: false,
    onSubmit: async (values) => {
      try{
        const res = await axiosInstance.get('/users', {params : {
        email:values.email, 
      }
    })

       if(!res.data.length){
        throw new Error("Username not found")
       }
       
       if(res.data[0].password != values.password){
        throw new Error("Password is incorrect")
       }
       const userData = res.data[0]
       dispatch({
        type: auth_types.AUTH_LOGIN,
        payload: res.data
       })

       jsCookie.set("userData", JSON.stringify(userData))

       router.push("/home")
      } catch (error) {
        console.log(error)
      }
    },
  });


  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            {formik.values.email}
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email" isInvalid={formik.errors.email}>
              <FormLabel>Email address</FormLabel>

              <Input
                type="email"
                onChange={(event) =>
                  formik.setFieldValue("email", event.target.value)
                }
              />
              <FormHelperText>{formik.errors.email}</FormHelperText>
            </FormControl>
            <FormControl id="password" isInvalid={formik.errors.password}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={passwordView ? "text" : "password"}
                  onChange={(event) =>
                    formik.setFieldValue("password", event.target.value)
                  }
                />

                <InputRightAddon>
                  <Icon
                    fontSize="xl"
                    onClick={() => setPasswordView(!passwordView)}
                    as={passwordView ? IoMdEye : IoMdEyeOff}
                    sx={{ _hover: { cursor: "pointer" } }}
                  />
                </InputRightAddon>
              </InputGroup>
              <FormHelperText>{formik.errors.password}</FormHelperText>
            </FormControl>
            <Stack spacing={10}>
              <Button
                onClick={formik.handleSubmit}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
