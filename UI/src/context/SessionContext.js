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
            userRole: "owner",
            authToken: "123456"
        });
        localStorage.setItem("userCredentials", {
            userName: "fmurillom",
            userRole: "owner",
            authToken: "123456"
        });
    }

    function doLogOut() {
        setUserInformation({
            userName: "",
            userRole: "",
            authToken: ""
        });

        navigate("/");
        
    }

    function getAuthToken(){
        return userInformation.authToken;
    }

    function getUserDetails(){
        return userInformation;
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