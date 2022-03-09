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
import { fetchData } from '../../AwsApi';
import SharedVariables from '../../SharedVariables';


function AddMeds() {
    const [addNew] = useMutation(CREATE_POST)
    var { data, loading, refetch } = useQuery(getAll)
    const [dataLength, setDataLength] = useState(0)
    const [totalWeight, setTotalWeight] = useState(0)
    if (loading) return 'loading'

    const addItem = async () => {
        if (dataLength === 0) setDataLength(data.getAll.length)
        var name = document.getElementById('medName').value
        var id = document.getElementById('medId').value
        var awsData = await fetchData("ESP_DB_table").then((value) => {
            return value;
        })

        addNew({
            variables: {
                name: name,
                medId: id,
                shelfSpot: `${dataLength}`,
                startWeight: `${awsData.weight - totalWeight}`,
                curWeight: `${awsData.weight - totalWeight}`
            }
        })
        setTotalWeight(awsData.weight)
        SharedVariables.prevWeight = awsData.weight
        setDataLength(dataLength + 1)
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
