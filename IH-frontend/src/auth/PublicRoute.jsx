import React from "react";
import {useAuth } from "../context/AuthContext";
import { Navigate} from "react-router-dom";





const PublicRoute =({children})=>{
    const {user}=useAuth()




    if(user && user.isEmailverified && user.isVerified){
        return <Navigate to={`/${user.role} `} replace/>
    }

    return <> {children}</>

};

export default PublicRoute;