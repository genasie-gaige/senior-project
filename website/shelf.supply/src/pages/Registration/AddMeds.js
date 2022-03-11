import {
    FormControl,
    FormLabel,
    Input,
    VStack,
    Heading,
    Button,
    Text,
    Spinner
} from '@chakra-ui/react';
import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { useMutation, useQuery } from "@apollo/client"
import { CREATE_POST } from "../../graphql/Mutation"
import { getAll } from "../../graphql/Query"
import { fetchData } from '../../AwsApi'
import SharedVariables from '../../SharedVariables'

function AddMeds() {
    const [addNew] = useMutation(CREATE_POST)
    var { data, loading } = useQuery(getAll)
    const [dataLength, setDataLength] = useState(0)
    const [totalWeight, setTotalWeight] = useState(0)
    const [isDone, setIsDone] = useState(true)
    if (loading) return 'loading'

    const addItem = async () => {
        setIsDone(false)
        setTimeout(() => setIsDone(true), 3000)
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
                <Text>Place medication on shelf then press "Add".</Text>
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
                <Button variant="primary" size="lg" w="full" bg='gray.50' disabled={!isDone} onClick={() => addItem()}>
                    Add
                </Button>
                {isDone ? <Button variant="primary" size="lg" w="full" bg='gray.50'>< Link to="/main">Continue</Link></Button> : <Spinner />}
            </VStack >
        </VStack >
    )

}

export default AddMeds;
