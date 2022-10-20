//our first react component for our person app!
//so we can use jsx to make a component load React
import React from "react";
//add a bunch of chakra ui components
import {
    Box,
    Input,
    Button,
    Textarea,
    Stack,
    Select,
    useToast,
} from"@chakra-ui/react";
//bring in useAuth from our hooks so we can make sure to logged in for this comp
import useAuth from "../hooks/useAuth";
//bring AddPerson function from our api
import { AddPerson } from "../api/person";
//import { userAgent } from "next/server";
//import { async } from "@firebase/util";

//define react jsx component
const addPerson = () => {
    //every form control (text input) we want to associate a react state
    const [ title, setTitle] = React.useState("");
    const [ description, setDescription] = React.useState("");
    const [ status, setStatus] = React.useState("pending");
    const [ isLoading, setIsLoading] = React.useState(false);
    const toast = useToast();
    //call useAuth()
    const { isLoggedIn, user } = useAuth() || {};
    //lets define a function to run that handles the add person operation
    const handlePersonCreate = async () => {
        if (!isLoggedIn ) {
            toast(
                {
                    title: "You must log in to create a person",
                    status: "error",
                    duration: 9000,
                    isClosable: ture
                }
            );
            return;
        }
        //if our code continues to run this far, user is logged in
        setIsLoading(true);
        //lets build a obj val template
        const person = {
            title,
            description,
            status,
            userId: user.userId
        };
        // call our api function that should add a new doc to firestore collection
        await addPerson(person);
        //once we get past the previous, the firestore doc is made (or an error)
        setIsLoading(false);
        setTitle("");
        setDescription("");
        setStatus("pending");
        //show a floaty with status update
        toast(
            {
                title: "To do created",
                status: "success"
            }
        );
    };
    //lets return the markup for this jsx component
    return (
        <Box w="40" margin="0 auto" display= "block" mt={5}>
        <Stack direction ="column">
        <Input
        placeholder="Title"
        value={title}
        onChange={ (e) => setTitle( e.target.value ) }
        />
        <Textarea
    placeholder= "Description"
    value={description}
    onChange={ (e) => setDescription( e.target.value ) }
        />
        <Select
        value={status} 
         onChange={ (e) => setStatus( e.target.value ) }>
         <option 
         value={"pending"} 
         style= {{Color: "yellow", fontWeight: "bold" }} 
         >
            Pending
          </option>

          <option 
         value={"completed"} 
         style= {{Color: "green", fontWeight: "bold" }} 
         >
            Completed
          </option>
         </Select>
         <Button
            onClick={ () => handlePersonCreate() }
            disabled= { title.length < 1 || description.length < 1 || isLoading}
            variantColor="teal"
            variant="solid"
            >
            Add Person
         </Button>
            </Stack>
            </Box>
    );
};
//dont forget to export the component function
export default addPerson;