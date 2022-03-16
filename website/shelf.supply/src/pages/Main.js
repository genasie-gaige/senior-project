import {
    VStack,
    Heading,
    Button,
    HStack,
    Text,
    Spinner,
    Container
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { useMutation, useQuery } from "@apollo/client"
import { getAll } from "../graphql/Query"
import { fetchData } from '../AwsApi'
import { UPDATE_POST } from '../graphql/Mutation'

function Main() {
    var [medicationList, setMedicationList] = useState(0)
    var [reorderList, setReorderList] = useState([])
    var { data, loading, refetch } = useQuery(getAll)
    const [updateMed] = useMutation(UPDATE_POST)
    const [awsWeight, setAwsWeight] = useState(0)
    const [isPickedUp, setIsPickedUp] = useState(false)
    const [medPicked, setMedPicked] = useState(0)
    const [isDone, setIsDone] = useState(true)

    useEffect(() => {
        var interval = setInterval(async () => {
            let awsData = await fetchData("ESP_DB_table").then((value) => {
                return value;
            })
            console.log(awsData)

            if (awsData.medicine === '0' && !isPickedUp && awsWeight !== awsData.weight) {
                setAwsWeight(awsData.weight)
            }
            if (awsData.medicine !== '0') {
                setIsPickedUp(true)
                setMedPicked(awsData.medicine)
            }
            if (awsData.medicine === '0' && isPickedUp) handleChange()
            setMedicationList(generateMedsHTML())
            setReorderList(generateOrderHTML())
        }, 5000)

        return () => clearInterval(interval)
    })
    if (loading) return <Spinner />

    async function handleChange() {
        setIsDone(false)
        var curData = await fetchData("ESP_DB_table").then((value) => {
            return value;
        })
        while (curData.medicine !== '0') {
            curData = await fetchData("ESP_DB_table").then((value) => {
                return value;
            })
        }
        setTimeout(async () => {
            setIsDone(true)
            curData = await fetchData("ESP_DB_table").then((value) => {
                return value;
            })
            let diff = awsWeight - curData.weight
            let newWeight = data.getAll[medPicked - 1].curWeight - diff
            console.log(data.getAll)
            console.log(medPicked)
            console.log(data.getAll[medPicked - 1])
            console.log(data.getAll[medPicked - 1].curWeight)
            console.log(diff)
            console.log(newWeight)

            update(data.getAll[medPicked - 1].id, newWeight.toString())
            refetch()
            setMedicationList(generateMedsHTML())
            setReorderList(generateOrderHTML())
            setIsPickedUp(false)
        }, 5000)
    }

    const update = (id, newWeight) => updateMed({
        variables: {
            id: id,
            curWeight: newWeight
        }
    })
    function generateMedsHTML() {
        var html = data.getAll.map((item) => {
            var percent = Math.floor(item.curWeight / item.startWeight * 100)
            return (
                <HStack key={item.id}>
                    <Text textDecoration="underline" fontWeight="bold">{item.name}:</Text>
                    <Text>{percent}% remaining</Text>
                </HStack>
            )
        })
        return html
    }
    function generateOrderHTML() {
        var html = data.getAll.map((item) => {
            var percent = Math.floor(item.curWeight / item.startWeight * 100)
            if (percent <= 50) {
                return (
                    <HStack key={item.id}>
                        <Text textDecoration="underline" fontWeight="bold">{item.name}:</Text>
                        <Text>{percent}% remaining</Text>
                    </HStack>
                )
            } else {
                return null
            }
        })
        return html
    }

    return (
        <VStack w="full" h="full" p={10} spacing={10} alignItems="Container-start" >
            {isDone ?
                <Container>
                    <VStack spacing={3} alignItems="Container-start">
                        <Heading size="2xl">Order List</Heading>
                    </VStack>
                    <VStack>{reorderList}</VStack>
                    <br></br>
                    <VStack spacing={3} alignItems="Container-start">
                        <Heading size="2xl">Medication List</Heading>
                    </VStack>
                    <VStack alignItems="Container-start">{medicationList}</VStack>

                    <Button variant="primary" size="lg" w="full" bg='gray.50'>
                        <Link to='/addMeds'>Add New</Link>
                    </Button>
                    <Button variant="primary" size="sm" w="full" textDecoration="underline">
                        <Link to="/login">Log out</Link>
                    </Button>
                </Container>
                :
                <Container>
                    <HStack>
                        <Text>
                            Updating Weight
                        </Text>
                        <Spinner />
                    </HStack>
                </Container>
            }

        </VStack>
    )
}
export default Main;
