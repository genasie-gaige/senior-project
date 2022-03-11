import {
    VStack,
    Heading,
    Button,
    HStack,
    Text
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { getAll } from "../graphql/Query"
import { fetchData } from '../AwsApi'

function Main() {
    var [medicationList, setMedicationList] = useState(0)
    var [reorderListHtml, setReOrderListHtml] = useState(0)
    var reorderList = []
    var { data, loading, refetch } = useQuery(getAll)

    useEffect(() => {
        var interval = setInterval(() => {
            refetch()
            if (loading) return 'loading'
            console.log(data)
            setMedicationList(generateMedsHTML())
            setReOrderListHtml(generateOrderHTML())
        }, 30000)

        return () => clearInterval(interval)
    })
    if (loading) return 'loading'

    function generateOrderHTML() {
        var html = reorderList.map((item) => {
            var percent = Math.floor(item.curWeight / item.startWeight * 100)
            return (
                <HStack key={item.id}>
                    <Text textDecoration="underline" fontWeight="bold">{item.name}</Text>
                    <Text>{percent}% remaining</Text>
                </HStack>
            )
        })
        return html
    }

    function generateMedsHTML() {
        var html = data.getAll.map((item) => {
            var percent = Math.floor(item.curWeight / item.startWeight * 100)
            if (percent <= 50) reorderList.push(item.name)
            return (
                <HStack key={item.id}>
                    <Text textDecoration="underline" fontWeight="bold">{item.name}:</Text>
                    <Text>{percent}% remaining</Text>
                </HStack>
            )
        })
        return html
    }
    medicationList = generateMedsHTML()
    return (
        <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start" >
            <VStack spacing={3} alignItems="flex-start">
                <Heading size="2xl">Order List</Heading>
            </VStack>
            <VStack>{reorderListHtml}</VStack>
            <br></br>
            <VStack spacing={3} alignItems="flex-start">
                <Heading size="2xl">Medication List</Heading>
            </VStack>
            <VStack alignItems="flex-start">{medicationList}</VStack>

            <Button variant="primary" size="lg" w="full" bg='gray.50'>
                <Link to='/addMeds'>Add New</Link>
            </Button>
            <Button variant="primary" size="sm" w="full" textDecoration="underline">
                <Link to="/">Log out</Link>
            </Button>
        </VStack>
    )
}
export default Main;
