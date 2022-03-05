import {
    FormControl,
    FormLabel,
    Input,
    VStack,
    Heading,
    Button,
    Text
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client"
import { CREATE_POST } from "../../graphql/Mutation"
import { getAll } from "../../graphql/Query"


function AddMeds() {

    const [addNew] = useMutation(CREATE_POST)
    var { data, loading } = useQuery(getAll)
    const [dataLength, setDataLength] = useState(0)
    if (loading) return 'loading'

    const addItem = () => {
        if (dataLength === 0) setDataLength(data.getAll.length)
        var name = document.getElementById('medName').value
        var id = document.getElementById('medId').value
        addNew({
            variables: {
                name: name,
                medId: id,
                shelfSpot: `${dataLength}`,
                startWeight: "0",
                curWeight: "0"
            }
        })

        setDataLength(dataLength + 1)
        console.log(data)
    }

    return (
        <VStack w="full" h="full" p={10} spacing={10} alignItems="center" >
            <VStack spacing={3} alignItems="flex-start">
                <Heading size="2xl">Add Items</Heading>
                <Text>Add each item in order of shelf placement</Text>
            </VStack>
            <VStack >
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input id='medName' isRequired={true} />
                </FormControl>
                <FormControl>
                    <FormLabel>ID</FormLabel>
                    <Input id='medId' isRequired={true} />
                </FormControl>
                <Button variant="primary" size="lg" w="full" bg='gray.50' onClick={() => addItem()}>
                    Add
                </Button>
                <Button variant="primary" size="lg" w="full" bg='gray.50'>
                    <Link to="/main">Continue</Link>
                </Button>
            </VStack>
        </VStack>
    );

};

export default AddMeds;
