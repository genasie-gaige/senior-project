import {
    FormControl,
    FormLabel,
    Input,
    VStack,
    Heading,
    Button,
    useColorModeValue
} from '@chakra-ui/react';
import { Link } from "react-router-dom";

const Login = () => {

    const bgColor = useColorModeValue('gray.50', 'whiteAlpha.50');
    return (
        <VStack w="full" h="full" p={10} spacing={10} alignItems="center" >
            <VStack spacing={3} alignItems="flex-start">
                <Heading size="2xl">Log in</Heading>
            </VStack>
            <VStack >
                <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input />
                </FormControl>
                <Button variant="primary" size="lg" w="full" bg={bgColor}>
                    <Link to="/main">Continue</Link>
                </Button>
                <Button variant="primary" size="sm" w="full" textDecoration="underline">
                    <Link to="/">Sign up</Link>
                </Button>
            </VStack>
        </VStack>
    );
};
export default Login;
