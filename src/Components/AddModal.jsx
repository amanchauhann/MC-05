import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import { useState } from "react"
import { useData } from "../Contexts/DataContext"

const AddModal = ({ isOpen, onClose }) => {
    const { food_data, set_food_filters, food_dispatch, food_filters } = useData()

    const [each_ingredients, set_each_ingredients] = useState("")
    const [all_ingredients, set_all_ingredients] = useState([])

    const [each_instruction, set_each_instruction] = useState("")
    const [all_instruction, set_all_instruction] = useState([])

    const [new_recipe, set_new_recipe] = useState({
        name: "",
        image: "",
        type: "",
        ingredients: [],
        instructions: []
    })

    console.log("popo", food_data)
    const ingredient_handler = (e) => {
        set_each_ingredients(e.target.value)
    }

    const add_ingredient = () => {
        set_all_ingredients(prev => [...prev, each_ingredients])
        set_new_recipe(prev => ({ ...prev, ingredients: [...prev.ingredients, each_ingredients] }))
        set_each_ingredients("")
    }

    const instructions_handler = (e) => {
        set_each_instruction(e.target.value)
    }

    const add_instruction = () => {
        set_all_instruction(prev => [...prev, each_instruction])
        set_new_recipe(prev => ({ ...prev, instructions: [...prev.instructions, each_instruction] }))
        set_each_instruction("")
    }

    const submit_handler = (e) => {
        e.preventDefault()
        // console.log("submit aman")
        food_dispatch({ type: "INITIALISE_DATA", payload: [...food_data.recipes, new_recipe] })
        const to_store = [...food_data.recipes, new_recipe]
        localStorage.setItem('myrecipes', JSON.stringify(to_store));
        set_new_recipe({
            name: "",
            image: "",
            type: "",
            ingredients: [],
            instructions: []
        })
        set_all_instruction([])
        set_all_ingredients([])
        onClose()
    }
    // console.log(all_ingredients)
    return (
        <>
            <form>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Modal Title</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>

                            <label> Name:
                                <Input value={new_recipe.name} onChange={(e) => set_new_recipe(prev => ({ ...prev, name: e.target.value }))} />
                            </label>
                            <label> Add Image:
                                <Input value={new_recipe.image} onChange={(e) => set_new_recipe(prev => ({ ...prev, image: e.target.value }))} />
                            </label>
                            <label> Type:
                                <Input value={new_recipe.type} onChange={(e) => set_new_recipe(prev => ({ ...prev, type: e.target.value }))} />
                            </label>
                            <label> Ingredients:
                                <Input value={each_ingredients} onChange={ingredient_handler} />
                                {all_ingredients && <Text>{all_ingredients.join(", ")}</Text>}
                                <Button disabled={true} onClick={add_ingredient}>Add Ingredient</Button>
                            </label>
                            <br />
                            <label> Instructions:
                                <Input value={each_instruction} onChange={instructions_handler} />
                                {all_instruction && <Text>{all_instruction.join(", ")}</Text>}
                                <Button onClick={add_instruction}>Add Instruction</Button>
                            </label>


                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button variant='ghost' onClick={submit_handler}>Add Recipie</Button>

                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </form>
        </>
    )
}

export default AddModal