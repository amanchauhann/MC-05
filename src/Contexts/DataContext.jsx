import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { recipes } from "../Data/Data";

const DataContext = createContext()

const reciepe_reducer = (state, { type, payload }) => {
    switch (type) {
        case "INITIALISE_DATA":
            const storedRecipes = localStorage.getItem("myrecipes");
            const recipes = storedRecipes ? JSON.parse(storedRecipes) : payload;
            return {
                ...state,
                recipes: recipes
            }
    }
}

export const DataProvider = ({ children }) => {
    const [food_filters, set_food_filters] = useState({
        search: "",
        filter: ""
    })
    // console.log("filters, ", food_filters)
    const initial_data = {
        recipes: []
        // filtered_recipes: {}
    }

    const [food_data, food_dispatch] = useReducer(reciepe_reducer, initial_data)

    useEffect(() => {
        food_dispatch({ type: "INITIALISE_DATA", payload: recipes })
    }, [])
    // console.log("am", food_filters)
    return (
        <DataContext.Provider value={{ food_data, set_food_filters, food_dispatch, food_filters }}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => useContext(DataContext)