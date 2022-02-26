import {
    VStack,
    Heading,
    Button,
    useBreakpointValue,
    useColorModeValue
} from '@chakra-ui/react';
import { Link } from "react-router-dom";

const Main = () => {

    const colSpan = useBreakpointValue({ base: 2, md: 1 });
    const bgColor = useColorModeValue('gray.50', 'whiteAlpha.50');
    return (
        <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
            <VStack spacing={3} alignItems="flex-start">
                <Heading size="2xl">Main</Heading>
            </VStack>

            <Button variant="primary" size="sm" w="full" textDecoration="underline">
                <Link to="/">Log out</Link>
            </Button>
        </VStack>
    );
};
export default Main;
