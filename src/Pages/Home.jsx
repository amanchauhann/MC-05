import { Button, Flex, Heading, Input, useDisclosure } from "@chakra-ui/react"
import FoodCard from "../Components/Card"
import { useData } from "../Contexts/DataContext"
import { wrap } from "framer-motion"
import AddModal from "../Components/AddModal"

const Home = () => {
    const { food_data, set_food_filters, food_dispatch, food_filters } = useData()

    // const filtered_data = food_data.recipes.filter(each => {
    //     if (food_data.filter) {
    //         return each[food_filters.filter].includes(food_filters.search)
    //     }
    //     else {
    //         return;
    //     }
    // }
    // )
    // const filtered_data = food_data.recipes.filter(each => each.name.toLowerCase().trim().includes(food_filters.search))

    const filtered_data = food_data.recipes.filter(each => {
        if (food_filters.filter === "name") {
            return each.name.toLowerCase().includes(food_filters.search.toLowerCase().trim())
        } else if (food_filters.filter === "cuisines") {
            return each.type.toLowerCase().includes(food_filters.search)
        } else if (food_filters.filter === "ingredients") {
            return each.ingredients.some((element) => element.includes(food_filters.search.toLowerCase().trim()))
        } else {
            return each;
        }
    })
    // console.log("aaaaa", filtered_data)


    const search_handler = (e) => {
        set_food_filters(prev => ({ ...prev, search: e.target.value }))
        // food_dispatch({
        //     type: "FILTER", payload: {
        //         search: e.target.value,
        //         filter: food_data.filtered_recipes.filter
        //     }
        // })
    }

    const filter_handler = (e) => {
        // console.log(e.target.value)
        set_food_filters(prev => ({ ...prev, filter: e.target.value }))
        // food_dispatch({
        //     type: "FILTER", payload: {
        //         search: food_data.filtered_recipes.search,
        //         filter: e.target.value
        //     }
        // })
    }


    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Input placeholder="search" onChange={search_handler} />
            <form onChange={filter_handler}>
                <label>
                    <input type="radio" name="filter_by" value="name" />
                    Name
                </label>
                <label>
                    <input type="radio" name="filter_by" value="ingredients" />
                    Ingredients
                </label>
                <label>
                    <input type="radio" name="filter_by" value="cuisines" />
                    Cusinies
                </label>
            </form>
            <Button onClick={onOpen} m={3} color={"white"} bg={"red"}>Add Recipie</Button>
            <Heading>
                ALL PRODUCTS
            </Heading>

            <Flex flexWrap={"wrap"}>
                {filtered_data?.map((each_food, i) => <FoodCard key={i} {...each_food} />)}
            </Flex>

            <AddModal isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default Home