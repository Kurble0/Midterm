import React from "react";
import {
    Box,
    Heading,
    SimpleGrid,
    Text
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import {
    doc,
    getDoc
} from "firebase/firestore";
import { db } from "../../firebase";
import { async } from "@firebase/util";
//define the jsx comp to show just one single to do in our ui
const TodoItem = ({itemData}) => {
    // enforce user login
    const { user } = useAuth() || {};
    if (!user) {
        return;
    }
    //if our code continues execution to here, a user is logged in
    //we can retun the jsx component
    return (
        <Box mt={5}> 
    <Heading as="h3" fontSize={"xl"}>
        { itemData.title }
    </Heading>
    <Text>
    { itemData.description }
    </Text>
    <Text>
    { itemData.status }
    </Text>
    <Text>
    { itemData.createdAt }
    </Text>
        </Box>
    );
};

//define the Req getServerSideProps() function that Next.js will call
//When it gets a dynamically-routed URl: /todo/blah <- here the id will= blahhh
export async function getServerSideProps(context) {
    //function will receive all it needs from Next.js in contet var
    //if we want to get the url param that next.js set for id 'cause [id].js
    //context.params.id
    let itemData = null;
    //get a doc from firestore collection
    const docRef = doc (db, 'todo', context.params.id );
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() ) {
        itemData = docSnap.data();
    }
    return {
        props: {
            itemData
        }
    };
}



const PersonItem = ({itemData}) => {
    // enforce user login
    const { user } = useAuth() || {};
    if (!user) {
        return;
    }
    //if our code continues execution to here, a user is logged in
    //we can retun the jsx component
    return (
        <Box mt={5}> 
    <Heading as="h3" fontSize={"xl"}>
        { itemData.title }
    </Heading>
    <Text>
    { itemData.description }
    </Text>
    <Text>
    { itemData.status }
    </Text>
    <Text>
    { itemData.createdAt }
    </Text>
        </Box>
    );
};

//define the Req getServerSideProps() function that Next.js will call
//When it gets a dynamically-routed URl: /todo/blah <- here the id will= blahhh
export async function getServerSideProps2(context) {
    //function will receive all it needs from Next.js in contet var
    //if we want to get the url param that next.js set for id 'cause [id].js
    //context.params.id
    let itemData = null;
    //get a doc from firestore collection
    const docRef = doc (db, 'person', context.params.id );
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() ) {
        itemData = docSnap.data();
    }
    return {
        props: {
            itemData
        }
    };
}
//Export the comp!!
export default TodoItem; PersonItem;