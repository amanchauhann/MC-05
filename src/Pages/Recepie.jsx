import { Box, Button, Card, CardBody, CardFooter, Heading, Image, ListItem, OrderedList, Stack, Text } from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import { useData } from "../Contexts/DataContext"

const Recepie = () => {
    const { item } = useParams()
    const { food_data: { recipes } } = useData()
    const filtered_recipe = recipes.filter(each => each.name.toLowerCase().trim() === item.toLowerCase().trim())
    const { image, type, ingredients, instructions } = filtered_recipe[0]
    console.log(filtered_recipe)
    return (
        <>
            <Card
                p={5}
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
                border={"1px solid grey"}
            >
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '300px' }}
                    src={image}
                    alt='Caffe Latte'
                />

                <CardBody>
                    <Text fontSize={"lg"}><Box as="span" fontWeight="bold">Cuisine:</Box> {type}</Text>

                    <Text py='2'>
                        <Box as="span" fontWeight="bold">
                            Ingredients:</Box> {ingredients.join(", ")}
                    </Text>
                    <Box>
                        <Text fontWeight="bold">Instructions</Text>
                        <OrderedList>
                            {instructions?.map(each => <ListItem>
                                {each}
                            </ListItem>)}
                        </OrderedList>
                    </Box>

                </CardBody>
            </Card>
        </>
    )
}

export default Recepie