//this js file is our /api file has code to interact with firestore db
import { db } from "../firebase";
//now we can import functions from firebase sdk
import {
    collection,
    addDoc,
    updateDoc,
    doc,
    deleteDoc
}from "firebase/firestore";
//import { async } from "@firebase/util";

const addTodo = async ( { userId, title, description, status} ) => {
    
    try{
        await addDoc(
            collection(db, "todo" ), 
            {
                user: userId,
                title: title,
                description:  description,
                status:  status,
                createdAt: new Date().getTime()
            }
        );
    } catch (err) {
    console.log(err);
}
};
const toggleTodoStatus = async ( { docId, status } ) => {
    try {
        //gran a ref tp a existing firestore doc by id
        const todoRef = doc( db, "todo", docId );
    //update the doc
        await updateDoc(
            todoRef,
            {
                status: status
            }
        )

    } catch(err) {
        console.log(err);
    }
};

const deleteTodo = async ( docId ) => {
    try{
        //gran a ref tp a existing firestore doc by id
        const todoRef = doc( db, "todo", docId );
        await deleteDoc( todoRef );

    } catch (err) {
        console.log(err);
    }
};

export { addTodo, toggleTodoStatus, deleteTodo  };