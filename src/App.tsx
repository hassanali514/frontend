import React from 'react';
import { Route, Routes } from "react-router-dom"
import { Layout, Menu } from "antd"
import { Content, Header } from "antd/es/layout/layout"
import Login from './components/Login/Login';
import PrivateComponent from './components/PrivateComponent';

const App: React.FC = () => {

  return (
    <>
      <Content>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateComponent />}>
            <Route path="/hassan2" element={"hassan2"} />
            <Route path="/hassan3" element={"hassan3"} />
          </Route>
        </Routes>
      </Content>
    </>
  )
};

export default App;