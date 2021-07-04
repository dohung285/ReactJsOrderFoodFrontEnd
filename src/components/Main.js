import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Footer } from "./Footer";
import { MenuBar } from "./MenuBar";
import Content from "./Content";
import { useKeycloak } from "@react-keycloak/web";

const Main = () => {


  // const { keycloak } = useKeycloak();

  // useEffect(() => {
  //   keycloak.init({onLoad: 'login-required'});
  // }, [])


  return (
    <Router>
      <div>
        <MenuBar />
        <Content />
        <Footer />
      </div>
    </Router>
  );
};

export default Main;
