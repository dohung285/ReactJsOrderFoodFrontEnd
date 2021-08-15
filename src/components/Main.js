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

const Main = () => {

  const [keycloak] = useKeycloak();

  let history = useHistory();

  const [loader, showLoader, hideLoader] = useFullPageLoader();


  // const { keycloak } = useKeycloak();
  const [card, setCard] = useState(0)

  const [menu, setMenu] = useState(null)

  const permissionService = new PermissionService();



  const fetchAllNameOfSystemByUsernameAPI = async (username) => {
    let result = await permissionService.getAllNameOfSystemByUsername(username);
    // console.log(`fetchAllNameOfSystemByUsernameAPI`, result)
    if (result?.status === 1000) {
      return result?.list
    }
    return null
  }


  const fetchMenuBarAPI = async () => {
    showLoader()
    axios.get(`http://localhost:8082/services/orderfood/api/menu/byWithRole`)
      .then(res => {
        // console.log(`res`, res.data)
        let result = res.data

        let arrayRemain = result;
        if (!keycloak?.authenticated) {
          arrayRemain = result.filter(item => item.label !== "Hệ thống");
        }
        if (arrayRemain) {

          let arrayTmp = [];
          let x = arrayRemain.forEach(element => {
            // console.log(`element`, element)
            let arrayItems = []
            if (element.label !== 'Trang chủ' && element.label !== 'Giới thiệu' && element.label !== 'Liên hệ') {

              if (element.label === 'Hệ thống' && keycloak?.authenticated && keycloak?.idTokenParsed?.preferred_username !== 'hungdx') {

                fetchAllNameOfSystemByUsernameAPI(keycloak?.idTokenParsed?.preferred_username).then(data => {
                  console.log(`data`, data)

                  const filteredArray = element?.items.filter(value => data.includes(value.label));
                  console.log(`filteredArray`, filteredArray)


                  const y = filteredArray.forEach(item => {
                    // console.log(`items`, item)
                    const objItems = {
                      icon: item.icon,
                      label: item.label,
                      command: () => history.push(`${item.command}`)
                    }
                    // console.log(`objItems`, objItems)
                    arrayItems.push(objItems)
                  })
                })

              } else {
                const y = element?.items.forEach(item => {
                  // console.log(`items`, item)
                  const objItems = {
                    icon: item.icon,
                    label: item.label,
                    command: () => history.push(`${item.command}`)
                  }
                  // console.log(`objItems`, objItems)
                  arrayItems.push(objItems)
                })
              }

              const objHasItems = {
                icon: element.icon,
                label: element.label,
                items: arrayItems
              }
              arrayTmp.push(objHasItems)
            }
            else {

              const obj = {
                icon: element.icon,
                label: element.label,
                command: () => history.push(`${element.command}`)
              }
              // console.log(`obj`, obj)
              arrayTmp.push(obj)
            }
          });

          setMenu(arrayTmp);
        }
      }).catch(err => {
        console.log("Error getDistinctDmcqt()", err);
      })

    setTimeout(hideLoader, EXPRITIME_HIDER_LOADER)
  };




  useEffect(() => {

    let numberInCard = JSON.parse(sessionStorage.getItem(DATA_CARD))?.length !== undefined ? JSON.parse(sessionStorage.getItem(DATA_CARD))?.length : 0
    setCard(numberInCard)

    fetchMenuBarAPI();

  }, [keycloak.authenticated])




  return (
    <div>

      <CardContext.Provider value={{ card, setCard }}>
        <MenuContext.Provider value={{ menu, setMenu }}>
          <Router>
            <div>
              <MenuBar />
              <Content />
              <Footer />
            </div>
          </Router>
        </MenuContext.Provider>
      </CardContext.Provider>
      {loader}
    </div>
  );
};

export default Main;
