import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent: React.FC = () => {
    return <Outlet/>
};

export default PrivateComponent;
