import {
    Heading,
    HStack,
    VStack,
    Text,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';
import { Link } from "react-router-dom";

const ConnectWifi = () => {

    const bgColor = useColorModeValue('gray.50', 'whiteAlpha.50');
    return (
        <VStack
            w="full"
            h="full"
            p={10}
            spacing={6}
            align="flex-start"
        >
            <Heading size="2xl">Connect Device to WiFi</Heading>
            <VStack spacing={4} alignItems="stretch" w="full">
                <HStack>
                    <Heading size="sm">Step 1:</Heading>
                    <Text>Plug in device</Text>
                </HStack>
                <HStack>
                    <Heading size="sm">Step 2:</Heading>
                    <Text>Search for other networks in WiFi settings on your computer</Text>
                </HStack>
                <HStack>
                    <Heading size="sm">Step 3:</Heading>
                    <Text>Select 'Smart Shelf' and input 'password' for the password</Text>
                </HStack>
                <HStack>
                    <Heading size="sm">Step 4:</Heading>
                    <Text>Wait for pop-up window</Text>
                </HStack>
                <HStack>
                    <Heading size="sm">Step 5:</Heading>
                    <Text>Select Configure WiFi and input your local WiFi credentials</Text>
                </HStack>
                <Button variant="primary" size="lg" w="full" bg={bgColor}>
                    <Link to="/main">Continue</Link>
                </Button>
            </VStack>
        </VStack>
    );
};

export default ConnectWifi;
