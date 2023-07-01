import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const FoodCard = ({ image, name, type }) => {
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
            </Card>
        </>
    )
}

export default FoodCard