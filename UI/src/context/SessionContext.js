import React from "react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../Utils";


const SessionContext = React.createContext({
    userInformation: {},
    dologin: () => {},
    doLogOut: () => {},
    getAuthToken: () => {},
    getUserDetails: () => {}
});

export default SessionContext;

export const SessionContextProvider = (props) => {
    const navigate = useNavigate();

    const [userInformation,setUserInformation] = useState({
            auth_token: "",
            email: "",
            role: -1,
            workshop: null
    });

    function dologin(email, password){
        //make API call to get user auth token
        // setUserInformation({
        //     userName: "fmurillom",
        //     userRole: "user",
        //     authToken: "123456"
        // });
        postData("http://127.0.0.1:8000/login", {email: email, password: password}).then((results) =>{
            setUserInformation({
                auth_token: results.auth_token,
                email: results.email,
                role: results.role,
                workshop: results.workshop,
                workshop_id: results.workshop_id
            })
            localStorage.setItem("email", results.email);
            localStorage.setItem("role", results.role);
            localStorage.setItem("auth_token", results.auth_token);
            localStorage.setItem("workshop", results.workshop);
            localStorage.setItem("workshop_id", results.workshop_id);
        });
        
    }

    function doLogOut() {
        setUserInformation({
            auth_token: "",
            email: "",
            role: -1,
            workshop: null,
            workshop_id: null
        });
        localStorage.setItem("email", "");
            localStorage.setItem("role", "");
            localStorage.setItem("auth_token", "");
            localStorage.setItem("workshop", "");
            localStorage.setItem("workshop_id", "");
        navigate("/");
        
    }

    function getAuthToken(){
        return localStorage.getItem("auth_token");
    }

    function getUserDetails(){
        return {
            email: localStorage.getItem("email"),
            role: localStorage.getItem("role"),
            auth_token: localStorage.getItem("auth_token"),
            workshop: localStorage.getItem("workshop"),
            workshop_id: localStorage.getItem("workshop_id")
        };
    }

    const sessionContextHandling = useMemo(
        () => ({
            userInformation,
            dologin,
            doLogOut,
            getAuthToken,
            getUserDetails
        }),
        [userInformation]
    );

    return (
        <SessionContext.Provider value={sessionContextHandling}>
            {props.children}
        </SessionContext.Provider>
    );
};