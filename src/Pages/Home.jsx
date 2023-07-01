import { Flex, Heading, Input } from "@chakra-ui/react"
import FoodCard from "../Components/Card"
import { useData } from "../Contexts/DataContext"
import { wrap } from "framer-motion"

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
    const filtered_data = food_data.recipes.filter(each => each.name.toLowerCase().trim().includes(food_filters.search))
    console.log("aaaaa", filtered_data)

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
        console.log(e.target.value)
        set_food_filters(prev => ({ ...prev, filter: e.target.value }))
        // food_dispatch({
        //     type: "FILTER", payload: {
        //         search: food_data.filtered_recipes.search,
        //         filter: e.target.value
        //     }
        // })
    }

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

            <Heading>
                ALL PRODUCTS
            </Heading>

            <Flex flexWrap={"wrap"}>
                {food_data.recipes?.map((each_food, i) => <FoodCard key={i} {...each_food} />)}
            </Flex>


        </>
    )
}

export default Home