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

    const [stateData, setData] = useState({})
    const [addNew, err] = useMutation(CREATE_POST)
    var { data, loading } = useQuery(getAll)
    if (loading) return 'loading'

    const setStateData = () => {
        setData(data.getAll)
        console.log(data)
    }

    const addItem = () => {
        setStateData()
        var name = document.getElementById('medName').value
        var id = document.getElementById('medId').value
        addNew({
            variables: {
                name: name,
                medId: id,
                shelfSpot: `${stateData.length}`,
                startWeight: "0",
                curWeight: "0"
            }
        })

        console.log(err)

        setStateData()
        console.log(stateData)
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
                <Button variant="primary" size="lg" w="full" bg='gray.50' onClick={() => setStateData()}>
                    Debug
                </Button>
                <Button variant="primary" size="lg" w="full" bg='gray.50'>
                    <Link to="/main">Continue</Link>
                </Button>
            </VStack>
        </VStack>
    );

};

export default AddMeds;
