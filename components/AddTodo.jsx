//our first react component for our todo app!
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
    Text
} from"@chakra-ui/react";
import { Link } from '@chakra-ui/react'
//bring in useAuth from our hooks so we can make sure to logged in for this comp
import useAuth from "../hooks/useAuth";
//bring addTodo function from our api
import { addTodo } from "../api/todo";
//import { userAgent } from "next/server";
//import { async } from "@firebase/util";

//define react jsx component
const AddTodo = () => {
    //every form control (text input) we want to associate a react state
    const [ title, setTitle] = React.useState("");
    const [ contacts, setContacts] = React.useState("");
    const [ description, setDescription] = React.useState("");
    const [ status, setStatus] = React.useState("pending");
    const [ isLoading, setIsLoading] = React.useState(false);
    const toast = useToast();
    //call useAuth()
    const { isLoggedIn, user } = useAuth() || {};
    //lets define a function to run that handles the add todo operation
    const handleTodoCreate = async () => {
        if (!isLoggedIn ) {
            toast(
                {
                    title: "You must log in to create a todo",
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
        const todo = {
            title,
            description,
            contacts,
            status,
            userId: user.userId
        };
        // call our api function that should add a new doc to firestore collection
        await addTodo(todo);
        //once we get past the previous, the firestore doc is made (or an error)
        setIsLoading(false);
        setTitle("");
        setContacts()
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

<Input
        placeholder="Your Name"
        value={ contacts}
        onChange={ (e) => setContacts( e.target.value ) }
        />

        <Textarea
    placeholder= "Description"
    value={description}
    onChange={ (e) => setDescription( e.target.value ) }
        />
        
      <Link href='http://localhost:3000/add-person' isExternal>
  Click me to get to Add-Person!
</Link>
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
            onClick={ () => handleTodoCreate() }
            disabled= { title.length < 1 || description.length < 1 || isLoading}
            variantColor="teal"
            variant="solid"
            >
            Add Todo
         </Button>
            </Stack>
            <Text>Main documents type: "todo/ " and place Admin, User1, or 
csueFMDVyPLhSjoPTxrD</Text>
            </Box>
    );
};
//dont forget to export the component function
export default AddTodo;