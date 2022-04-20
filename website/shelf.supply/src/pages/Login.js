import {
    FormControl,
    FormLabel,
    Input,
    VStack,
    Heading,
    Button,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import Axios from 'axios';
import { Link } from "react-router-dom";
import { useState } from 'react'

const Login = () => {
    const bgColor = useColorModeValue('gray.50', 'whiteAlpha.50');
    const [showErrorMsg, setShowErrorMsg] = useState(false)
    const [signedIn, setSignedIn] = useState(false)
    const [toMain, setToMain] = useState({ pathname: "/login" })
    const [state, setState] = useState()

    const getUsers = async () => {
        var userInput = document.getElementById('username').value
        var passInput = document.getElementById('password').value
        var users
        await Axios.get('http://localhost:3002/users').then((response) => {
            users = response;
        })

        console.log(users)

        var istrue = users.data.map(((user) => {
            var isfound = false;
            if (user.userName === userInput &&
                user.password === passInput) {
                setToMain(`/main/${userInput}`)
                setState({ appKey: user.applianceKey, user: userInput })
                setSignedIn(true)
                isfound = true
            }
            return isfound;
        }))

        if (!istrue) setShowErrorMsg(true)
    }

    return (
        <VStack w="full" h="full" p={10} spacing={10} alignItems="center" >
            <VStack spacing={3} alignItems="flex-start">
                <Heading size="2xl">Log in</Heading>
            </VStack>
            <VStack >
                <Text color={showErrorMsg ? 'red' : 'white'}></Text>
                <FormControl>
                    <FormLabel >Username</FormLabel>
                    <Input id="username" />
                </FormControl>
                <FormControl>
                    <FormLabel >Password</FormLabel>
                    <Input id="password" />
                </FormControl>

                {signedIn ?
                    <Link to={toMain} state={{ state }}>
                        <Button variant="primary" size="lg" w="full" bg={bgColor}>
                            Continue
                        </Button>
                    </Link> :
                    <Button variant="primary" size="lg" w="full" bg={bgColor} onClick={() => getUsers()}>
                        Signin
                    </Button>}
                <Link to="/">
                    <Button variant="primary" size="sm" w="full" textDecoration="underline">
                        Sign up
                    </Button>
                </Link>
            </VStack>
        </VStack>
    );
};
export default Login;
