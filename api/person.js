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

const addPerson = async ( { userId, age, description, status,  username,  hair} ) => {
    
    try{
        await addDoc(
            collection(db, "Person" ), 
            {
                user: userId,
                age: age,
                description:  description,
                status:  status,
                username: username,
                hair: hair,
                createdAt: new Date().getTime()
            }
        );
    } catch (err) {
    console.log(err);
}
};
const togglePersonStatus = async ( { docId, status } ) => {
    try {
        //gran a ref tp a existing firestore doc by id
        const PersonRef = doc( db, "Person", docId );
    //update the doc
        await updateDoc(
            PersonRef,
            {
                status: status
            }
        )

    } catch(err) {
        console.log(err);
    }
};

const deletePerson = async ( docId ) => {
    try{
        //gran a ref tp a existing firestore doc by id
        const PersonRef = doc( db, "Person", docId );
        await deleteDoc( PersonRef );

    } catch (err) {
        console.log(err);
    }
};

export { addPerson, togglePersonStatus, deletePerson  };