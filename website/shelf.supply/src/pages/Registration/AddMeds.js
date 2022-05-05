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
import { Link, useLocation } from "react-router-dom"
import { useMutation, useQuery } from "@apollo/client"
import { CREATE_POST } from "../../graphql/Mutation"
import { getAll } from "../../graphql/Query"
import { fetchData } from '../../AwsApi'

function AddMeds(props) {
    var location = useLocation()
    const [addNew] = useMutation(CREATE_POST)
    var { data, loading } = useQuery(getAll)
    const [dataLength, setDataLength] = useState(1)
    const [totalWeight, setTotalWeight] = useState(0)
    const [isDone, setIsDone] = useState(true)
    const toMain = `/main/${location.state.state.user}`
    const state = location.state
    if (loading) return 'loading'

    const beginAdd = () => {
        setIsDone(false)
        setTimeout(() => {
            setIsDone(true)
            addItem()
        }, 10000)
    }

    const addItem = async () => {
        if (dataLength === 0) setDataLength(data.getAll.length)
        let name = document.getElementById('medName').value
        let id = document.getElementById('medId').value
        let awsData = await fetchData(location.state.state.appKey).then((value) => {
            return value;
        })
        console.log(awsData)

        addNew({
            variables: {
                name: name,
                user: location.state.state.user,
                medId: id,
                shelfSpot: `${dataLength}`,
                startWeight: `${awsData.weight - totalWeight - 9}`,
                curWeight: `${awsData.weight - totalWeight - 9}`
            }
        })
        setTotalWeight(awsData.weight)
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
                <Button variant="primary" size="lg" w="full" bg='gray.50' disabled={!isDone} onClick={() => beginAdd()}>
                    Add
                </Button>
                {isDone ? < Link to={toMain} state={state}><Button variant="primary" size="lg" w="full" bg='gray.50'>Continue</Button></Link> : <Spinner />}
            </VStack >
        </VStack >
    )

}

export default AddMeds;
