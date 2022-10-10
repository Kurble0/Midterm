import React from "react";
import {Box, Button, Link, Text, useColorMode } from "@chakra-ui/react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FaGoogle, FaMoon, FaSun } from "react-icons/fa";
import {auth } from "../firebase";
import useAuth from "../hooks/useAuth";

//react jsx login componet
const Auth = () => {
    const { toggleColorMode, colorMode } = useColorMode();
    const {isLoggedIn, user } =useAuth() || {};
    //define a function to perform the login operation
    const handleAuth = async () => {
        const provider = new GoogleAuthProvider();
        //some async calls with promises
        signInWithPopup(
            auth,
            provider
            ).then(
                //since we got a promise, inside the then we get results returns
                (result) => {
                    //this gives you a google Access token. you can use it to access the google API
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    //now we should be able to get info about user who logged in
                    const user = result.user;
                }
            ).catch(
                (error) => {
                    const errorCode = error.code;
                    const errorMessage = error.Message;
                    const email = error.customData.email;
                    const credential = GoogleAuthProvider.credentialFromError(error);
                    console.log("authentication error " + errorCode + errorMessage);
                }
            );
    };
    //define the jsx component
    return(

        <Box position={"fixed"} top="5%" right="5%">
            <Button onClick={() => toggleColorMode()}>
            {colorMode == "dark" ? <FaSun /> : <FaMoon/>}

            </Button>
            {" "}
            {isLoggedIn && (
                <>
                <Text color="green.500">{user.email}</Text>
                <Link color="red.500" onClick={() => auth.signOut()}>
                    Logout
                </Link>
                
                </>
            ) }
            {!isLoggedIn && (
                <Button leftIcon={<FaGoogle />} onClick={ () => handleAuth()}>
                    Login with Google
                </Button>
            )}
       
            </Box>
    );
};
//export!
export default Auth;