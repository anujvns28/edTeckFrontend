import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { rootState } from '../../../reducer';

type PrivateRouteNode = {
  children:React.ReactNode
}

const PrivateRoute = ({children}:PrivateRouteNode) => {
  const {token} = useSelector((state:rootState) => state.auth);

  if(token !== null){
   return children
  }
  else{
  return    <Navigate to={"/login"}/>
  }
}

export default PrivateRoute
