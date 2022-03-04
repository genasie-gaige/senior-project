import {
    VStack,
    Heading,
    Button
} from '@chakra-ui/react';
import React from 'react';
import { Link } from "react-router-dom";
import { fetchData } from "../AwsApi";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    fetchDataFormDynamoDb() {
        fetchData("ESP_DB_table")
    }

    render() {
        return (
            <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start" >
                <VStack spacing={3} alignItems="flex-start">
                    <Heading size="2xl">Main</Heading>
                </VStack>

                <button onClick={() => this.fetchDataFormDynamoDb()}> Fetch </button>

                <Button variant="primary" size="sm" w="full" textDecoration="underline">
                    <Link to="/">Log out</Link>
                </Button>
            </VStack>
        );
    }
}
export default Main;
