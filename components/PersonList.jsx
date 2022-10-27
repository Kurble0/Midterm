import React, {useEffect } from "react";
import {
    Badge,
    Box,
    Heading,
    SimpleGrid,
    Text,
    useToast,
} from"@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import {
    collection,
    onSnapshot,
    query,
    where
} from "firebase/firestore";
import { db } from "../firebase";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { deletePerson, togglePersonStatus } from "../api/person";
//import { async } from "@firebase/util";
//difine jsx comp for the list
const PersonList = () => {
    const [person, setPerson] = React.useState([]);
    const { user } = useAuth() || {};
    const toast = useToast();
    // tell react to update the ui with refreshData()!
    useEffect(
        () => {
            if (!user) {
                setPerson([]);
                return;
             }
             //if code continues to here, user is logged in
             //do query on firestore collection
             const q = query(
                 collection(db, "person"),
                 where("user", "==", user.uid)
             );
             //since query() is async, here we setup a event handler with firebase
             onSnapshot(
                 q,
                 (querySnapshot) => {
                     //in this function we have all results from q in querrysnapshot
                     let ar= [];
                     querySnapshot.docs.forEach(
                         (doc) => {
                            ar.push( 
                         {
                             id: doc.id,
                             ...doc.data()
                         }
                            );
                         }
                     );
                     //once we loop thru forEach and we have arry of docs in ar
                     setPerson(ar);
                 }
             );
            
        },
        [user]
    );
    //build nested function to delete a person
    const handlePersonDelete = async (id) => {
        if(
            confirm("Are you sure you want to delete?")
        ) {
            deletePerson(id);
            toast(
               {
                Title: "Person deleted successfully",
                status: "success"
               } 
            );
        }
    };
    //build nested function to toggle status
    const handleToggle = async (id, status) => {
        const newStatus = status == "completed" ? "pending" : "completed";
        await togglePersonStatus(
            {
                docId: id,
                status: newStatus
            }

        );
        toast(
            {
               title:`Person marked ${newStatus}`, 
               status: newStatus == "completed" ? "success" : "warning",
            }
        );
    };
    //finally we can difine the jsx for component
    return(
        <Box mt={5}>
        <SimpleGrid column={{base: 1, md: 3 }} spacing={8}>
        { person &&
        person.map(
            (person) => (
        <Box
        p={3}
        boxShadow="2xl"
        shadow={"dark-lg"}
        transition="0.2s"
        _hover={{ boxShadow: "sm" }}
         >
            <Heading as="h3" fontSize={"xl"}>
            {person.title}
            {" "}
            <Badge
            color="red.500"
            bg="inherit"
            transition={"0.2s"}
            _hover={{
                bg: "inherit",
                transform: "scale(1.2",
            }}
            float="right"
            size="xs"
            onClick={ () => handlePersonDelete(person.id) }
            >
                <FaTrash />
            </Badge>
            <Badge
            color={person.status == "pending" ? "gray.500" : "green.500"}
            bg="inherit"
            transition={"0.2s"}
            _hover={{
              bg: "inherit",
              transform:  "scale(1.2)",

            }}
            float="right"
            size="xs"
            onClick={ () => handleToggle(person.id, person.status) }
            >
                {person.status == "pending" ? <FaToggleOff /> : <FaToggleOn />}
            </Badge>
            <Badge
            float="right"
            opacity="0.8"
            bg={ person.status == "pending" ? "yellow.500" : "green.500"}
            >
                {person.status }
            </Badge>
            </Heading>
            <Text>
            {person.description }
            </Text>
        </Box>
         )
    )
    }
    </SimpleGrid>
    </Box>
    );
};
export default PersonList;