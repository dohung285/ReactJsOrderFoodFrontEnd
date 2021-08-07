import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Footer } from "./Footer";
import { MenuBar } from "./MenuBar";
import Content from "./Content";
import { useKeycloak } from "@react-keycloak/web";
import { CardContext } from "../context/CardContext";
import { DATA_CARD } from "../constants/ConstantString";

const Main = () => {


  // const { keycloak } = useKeycloak();
  const [card, setCard] = useState(0)

  


  useEffect(() => {

    let numberInCard = JSON.parse(sessionStorage.getItem(DATA_CARD))?.length !== undefined ? JSON.parse(sessionStorage.getItem(DATA_CARD))?.length : 0
    setCard(numberInCard)
    // console.log(`` )
    // console.log(`numberInCard`, numberInCard)

  }, [])




  return (
    <CardContext.Provider value={{ card, setCard }}>
      <Router>
        <div>
          <MenuBar />
          <Content />
          <Footer />
        </div>
      </Router>
    </CardContext.Provider>
  );
};

export default Main;
