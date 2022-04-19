import {
    FormControl,
    FormLabel,
    Input,
    VStack,
    Heading,
    Button,
    useColorModeValue
} from '@chakra-ui/react';
import Axios from 'axios';
import { Link } from "react-router-dom";
import { useState } from 'react'
import Main from './Main'

const Login = () => {

    const bgColor = useColorModeValue('gray.50', 'whiteAlpha.50');
    const [redirect, setRedirect] = useState(false)
    const [key, setKey] = useState('')
    const [username, setUsername] = useState('')

    const getUsers = async () => {
        var users
        await Axios.get('http://localhost:3002/users').then((response) => {
            users = response;
        })

        console.log(users)

        users.data.map(((user) => {
            if (user.userName === document.getElementById('username').value &&
                user.password === document.getElementById('password').value) {
                setKey(user.applianceKey)
                setUsername(user.userName)
                setRedirect(true)
                return 0
            }
            return 0
        }))
    }

    const renderRedirect = () => {
        if (redirect) {
            return <Main appKey={key} user={username} />
        }
    }

    return (
        <VStack w="full" h="full" p={10} spacing={10} alignItems="center" >
            {renderRedirect()}
            <VStack spacing={3} alignItems="flex-start">
                <Heading size="2xl">Log in</Heading>
            </VStack>
            <VStack >
                <FormControl>
                    <FormLabel >Username</FormLabel>
                    <Input id="username" />
                </FormControl>
                <FormControl>
                    <FormLabel >Password</FormLabel>
                    <Input id="password" />
                </FormControl>
                <Button variant="primary" size="lg" w="full" bg={bgColor} onClick={() => getUsers()}>
                    Continue
                </Button>
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
