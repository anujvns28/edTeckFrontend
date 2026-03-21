import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'
import { RootState } from '../../..';

type OpentRoteType = {
    children: React.ReactNode
}

const OpenRoute = ({children}:OpentRoteType) => {
    const {token} = useSelector((state:RootState) => state.auth);

    if(token === null){
     return children
    }else{
        return <Navigate to="/dashboard/My-profile"/>
    }
}

export default OpenRoute
