//import 2 react functions to implement react hooks with effect and state
import { useEffect, useState } from "react";
import {auth } from "../firebase";

const useAuth = () => {
    //ask react to define a state var and a associated function to change its var
        const [user, setUser] = useState(null);
        const [isLoggedIn, setIsLoggedIn ] = useState(false);
        //ask react to manage our state var based on a block of code we give it to
        useEffect(
            //we passing a anonymous arrow function to reacts userEffect
            () => {
                auth.onAuthStateChanged(
                    //passing another anonymous function to firebase onAuthstate
                (user) => {
                    // woth the user obj val that firebase returns to react states
                    setIsLoggedIn( user && user.uid ? true : false );
                    // set react state var user
                    setUser( user );
                }     
                );
            }
        );
        return { user, isLoggedIn };
}

export default useAuth;