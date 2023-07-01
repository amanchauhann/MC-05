import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useData } from "../Contexts/DataContext"

const FoodCard = ({ image, name, type }) => {
    const { food_data, set_food_filters, food_dispatch, food_filters } = useData()
    const delete_handler = () => {
        const without_deleted = food_data.recipes.filter(each => each.name !== name)
        localStorage.setItem('myrecipes', JSON.stringify(without_deleted))
        food_dispatch({ type: "INITIALISE_DATA", payload: without_deleted })
    }
    return (
        <>
            <Card maxW='xs'>
                <CardBody>
                    <Flex direction="column" gap={5} h={"100%"} justify={"space-between"}>

                        <Image
                            src={image}
                            alt='Green double couch with wooden legs'
                            borderRadius='lg'
                            pb={5}
                        />
                        <Flex direction={"column"} gap={5}>
                            <Heading size='md'>{name}</Heading>
                            <Box>
                                <Flex justify={"space-between"}>
                                    <Text>Cuisine type: </Text>
                                    <Text>{type}</Text>
                                </Flex>
                                <Flex justify={"space-between"}>
                                    <Text>Ingredients: </Text>
                                    <Link to={`/reciepe/${name}`}>See Recepie</Link>
                                </Flex>
                                <Flex justify={"space-between"}>
                                    <Text>Instructions: </Text>
                                    <Link to={`/reciepe/${name}`}>See Recepie</Link>
                                </Flex>
                            </Box>


                        </Flex>
                    </Flex>
                </CardBody>
                <CardFooter>
                    <Button onClick={delete_handler} variant={"solid"} bg={"red"} color={"black"}>Delete</Button>
                </CardFooter>
            </Card>
        </>
    )
}

export default FoodCard