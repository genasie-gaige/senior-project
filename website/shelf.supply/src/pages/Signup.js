import {
    FormControl,
    FormLabel,
    Input,
    VStack,
    Heading,
    SimpleGrid,
    GridItem,
    Button,
    useBreakpointValue,
    useColorModeValue
} from '@chakra-ui/react';
import { Link } from "react-router-dom"
import Axios from 'axios'
import { useState } from 'react'

const Signup = () => {

    const colSpan = useBreakpointValue({ base: 2, md: 1 })
    const bgColor = useColorModeValue('gray.50', 'whiteAlpha.50')
    const [signedUp, setSignedup] = useState(false)
    const [toAdd, setToAdd] = useState({ pathname: "/" })
    const [state, setState] = useState()

    const addUser = async () => {
        var users = await Axios.get('http://localhost:3002/users').then((response) => {
            return response;
        })

        await Axios.post('http://localhost:3002/create', {
            userId: users.data.length,
            password: document.getElementById('password').value,
            userName: document.getElementById('username').value,
            applianceKey: document.getElementById('applianceKey').value,
        }).then(() => {
            console.log('done');
        })

        setToAdd(`/addMeds/${document.getElementById('username').value}`)
        setState({ appKey: document.getElementById('applianceKey').value, user: document.getElementById('username').value })

        setSignedup(true)
    }

    return (
        <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
            < VStack spacing={3} alignItems="flex-start" >
                <Heading size="2xl">Sign up</Heading>
            </VStack >
            <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
                <GridItem colSpan={colSpan}>
                    <FormControl>
                        <FormLabel>First Name</FormLabel>
                        <Input placeholder="John" />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={colSpan}>
                    <FormControl>
                        <FormLabel>Last Name</FormLabel>
                        <Input placeholder="Doe" />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                    <FormControl>
                        <FormLabel>Appliance Key</FormLabel>
                        <Input id="applianceKey" placeholder="Shelf2" />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                    <FormControl>
                        <FormLabel>Username</FormLabel>
                        <Input id="username" placeholder="Username123" />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={colSpan}>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input id="password" />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={colSpan}>
                    <FormControl>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input />
                    </FormControl>
                </GridItem>
                {!signedUp ? <GridItem colSpan={2}>
                    <Button variant="primary" size="lg" w="full" bg={bgColor} onClick={() => addUser()}>
                        Signup
                    </Button>
                </GridItem> :
                    <GridItem colSpan={2}>
                        <Link to={toAdd} state={{ state }}>
                            <Button variant="primary" size="lg" w="full" bg={bgColor} >
                                Continue
                            </Button>
                        </Link>
                    </GridItem>}
                <GridItem colSpan={2}>
                    <Link to={"/login"}>
                        <Button variant="primary" size="sm" w="full" textDecoration="underline">
                            Go to Login
                        </Button>
                    </Link>
                </GridItem>
            </SimpleGrid>
        </VStack >
    );
};
export default Signup;
