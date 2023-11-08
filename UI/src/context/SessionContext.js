import React from "react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";


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
        userName: "",
        userRole: "",
        authToken: ""
    });

    function dologin(){
        //make API call to get user auth token
        setUserInformation({
            userName: "fmurillom",
            userRole: "user",
            authToken: "123456"
        });
        localStorage.setItem("userName", "fmurillom");
        localStorage.setItem("userRole", "user");
        localStorage.setItem("authToken", "123456");
    }

    function doLogOut() {
        setUserInformation({
            userName: "",
            userRole: "",
            authToken: ""
        });
        localStorage.setItem("userName", userInformation.userName);
        localStorage.setItem("userRole", userInformation.userRole);
        localStorage.setItem("authToken", userInformation.authToken);
        navigate("/");
        
    }

    function getAuthToken(){
        return localStorage.getItem("authToken");
    }

    function getUserDetails(){
        return {
            userName: localStorage.getItem("userName"),
            userRole: localStorage.getItem("userRole"),
            authToken: localStorage.getItem("authToken")
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