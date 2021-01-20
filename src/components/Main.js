import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Footer } from "./Footer";
import { MenuBar } from "./MenuBar";
import Content from "./Content";

const Main = () => {
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
