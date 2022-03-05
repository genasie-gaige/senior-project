import {
    Heading,
    HStack,
    VStack,
    Text,
    Button
} from '@chakra-ui/react';
import React from 'react';
import { Link } from "react-router-dom";
import { fetchData } from '../../AwsApi';


class ConnectWifi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisabled: true,
            showErrorMsg: false
        }
    }

    checkConnection() {
        var data = fetchData("ESP_DB_table")
        if (data != null) {
            this.setState({
                isDisabled: false
            });
        } else {
            this.setState({
                showErrorMsg: true
            });
        }
    }

    render() {
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
                    <Button variant="primary" size="lg" w="full" bg='gray.50' onClick={this.checkConnection.bind(this)}>
                        Check Connection
                    </Button>
                    <Button variant="primary" size="lg" w="full" bg='gray.50' disabled={this.state.isDisabled}>
                        <Link to={this.state.isDisabled ? '/deviceSetup' : '/addMeds'}>Continue</Link>
                    </Button>
                    <Text color={this.state.showErrorMsg ? 'red' : 'white'}>Error with connection. Try again.</Text>
                </VStack>
            </VStack>
        );
    }
};

export default ConnectWifi;
