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
import { Link } from "react-router-dom";

const Signup = () => {

    const colSpan = useBreakpointValue({ base: 2, md: 1 });
    const bgColor = useColorModeValue('gray.50', 'whiteAlpha.50');
    return (
        <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
            <VStack spacing={3} alignItems="flex-start">
                <Heading size="2xl">Sign up</Heading>
            </VStack>
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
                        <FormLabel>Title</FormLabel>
                        <Input placeholder="Admin" />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={colSpan}>
                    <FormControl>
                        <FormLabel>City</FormLabel>
                        <Input placeholder="Atlanta" />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={colSpan}>
                    <FormControl>
                        <FormLabel>State</FormLabel>
                        <Input placeholder="Georgia" />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                    <FormControl>
                        <FormLabel>Username</FormLabel>
                        <Input placeholder="Username123" />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={colSpan}>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={colSpan}>
                    <FormControl>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                    <Button variant="primary" size="lg" w="full" bg={bgColor}>
                        <Link to="/main">Continue to Main Screen</Link>
                    </Button>
                </GridItem>
                <GridItem colSpan={2}>
                    <Button variant="primary" size="lg" w="full" bg={bgColor}>
                        <Link to="/deviceSetup">Continue to Device Setup</Link>
                    </Button>
                </GridItem>
                <GridItem colSpan={2}>
                    <Button variant="primary" size="sm" w="full" textDecoration="underline">
                        <Link to="/login">Go to Login</Link>
                    </Button>
                </GridItem>
            </SimpleGrid>
        </VStack>
    );
};
export default Signup;
