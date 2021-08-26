import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { Footer } from "./Footer";
import { MenuBar } from "./MenuBar";
import Content from "./Content";
import { useKeycloak } from "@react-keycloak/web";
import { CardContext } from "../context/CardContext";
import { DATA_CARD, EXPRITIME_HIDER_LOADER } from "../constants/ConstantString";
import useFullPageLoader from "../hooks/useFullPageLoader";
import axios from "axios";
import PermissionService from "../service/PermissionService";
import { MenuContext } from "../context/MenuContext";
import { Provider } from "react-redux";
import store from "../store";
import { fetchMenus } from "../actions/actionCreator";

const Main = () => {

  const [keycloak] = useKeycloak();

  let history = useHistory();

  // const [loader, showLoader, hideLoader] = useFullPageLoader();


  // const { keycloak } = useKeycloak();
  const [card, setCard] = useState(0)






  useEffect(() => {

    let numberInCard = JSON.parse(sessionStorage.getItem(DATA_CARD))?.length !== undefined ? JSON.parse(sessionStorage.getItem(DATA_CARD))?.length : 0
    setCard(numberInCard)

    // fetchMenuBarAPI();

  }, [])




  return (
    <div>

      <Provider store={store}>

        <CardContext.Provider value={{ card, setCard }}>

          <Router>
            <div>
              <MenuBar />
              <Content />
              <Footer />
            </div>
          </Router>

        </CardContext.Provider>

      </Provider>
    
    </div>
  );
};

const mapStateToProps = state => {
  return {
    menuData: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMenus: () => dispatch(fetchMenus())
  }
}

export default Main;
