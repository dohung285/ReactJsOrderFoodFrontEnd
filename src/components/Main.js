import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { fetchMenus } from "../actions/actionCreator";
import { DATA_CARD, MENU } from "../constants/ConstantString";
import { CardContext } from "../context/CardContext";
import { MenuContext } from "../context/MenuContext";
import { NotificationContext } from "../context/NotificationContext";
import { onMessageListener } from "../firebase";
import PermissionService from "../service/PermissionService";
import store from "../store";
import Content from "./Content";
import { Footer } from "./Footer";
import { MenuBar } from "./MenuBar";

const Main = () => {

  const [keycloak] = useKeycloak();

  let history = useHistory();

  // const [loader, showLoader, hideLoader] = useFullPageLoader();


  // const { keycloak } = useKeycloak();
  const [card, setCard] = useState(0)
  const [notification, setNotification] = useState(0)
  const [menu, setMenu] = useState(null)



  const permissionService = new PermissionService();
  const checkPermissionGetNotificationOfUsername = async () => {
    // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
    let result = await permissionService.checkHasPermissionGetNotification('halt');
    console.log(`checkPermissionGetNotificationOfUsername`, result)
    if (result?.status === 1000) {

    }
  }


  onMessageListener().then(payload => {
    // setShow(true);
    console.log(`payload`, payload)
    let numberNotification = notification;

    setNotification((numberNotification + 1))
    // setNotification({ title: payload.notification.title, body: payload.notification.body })
    // console.log(payload);
  }).catch(err => console.log('failed: ', err));

  const fetchAllNameOfSystemByUsernameAPI = async (username) => {
    console.log(`username`, username)
    let result = await permissionService.getAllNameOfSystemByUsername(username);
    console.log(`fetchAllNameOfSystemByUsernameAPI`, result)
    if (result?.status === 1000) {
      // console.log(`object`, result?.list)
      // setArrayPermissionOfUser(result?.list)
      return result?.list
    }
    return null
  }

  // const fetchMenuBarAPI = () => {
  //   return axios.get(`http://localhost:8082/services/orderfood/api/menu/byWithRole`)
  //     .then(res => {
  //       // console.log(`res`, res?.data)
  //       let result = res?.data

  //       // console.log(`checkArray`, Array.isArray(result))

  //       let arrayTmp = [];
  //       result.forEach(element => {
  //         // console.log(`element`, element)
  //         if (element?.label === 'Món ăn') { // nếu là item món ăn thì duyệt các phần tử con tạo link
  //           const arrayItems = element?.items;
  //           let arrayTmpItems = []
  //           // tao array item con
  //           arrayItems.forEach(item => {
  //             // console.log(`item`, item)
  //             const objItems = {
  //               icon: item.icon,
  //               label: item.label,
  //               command: () => history.push(`${item.command}`)
  //             }
  //             arrayTmpItems.push(objItems)
  //           })

  //           const objHasItems = {
  //             icon: element.icon,
  //             label: element.label,
  //             items: arrayTmpItems
  //           }
  //           arrayTmp.push(objHasItems)
  //         } else { // nếu ko phải là item món ăn thì tạo item link
  //           const obj = {
  //             icon: element.icon,
  //             label: element.label,
  //             command: () => history.push(`${element.command}`)
  //           }
  //           arrayTmp.push(obj)
  //         }
  //       })
  //       setMenu(arrayTmp)
  //     }).catch(err => {
  //       console.log("Error fetchMenuBar()", { ...err });
  //     })
  // };

  const fetchMenuBarAPI = () => {
    return axios.get(`http://localhost:8082/services/orderfood/api/menu/byWithRole`)
      .then(res => {
        // console.log(`res`, res?.data)
        let result = res?.data

        // console.log(`checkArray`, Array.isArray(result))

        let arrayTmp = [];
        result.forEach(element => {
          // console.log(`element`, element)
          if (element?.label === 'Món ăn') { // nếu là item món ăn thì duyệt các phần tử con tạo link
            const arrayItems = element?.items;
            let arrayTmpItems = []
            // tao array item con
            arrayItems.forEach(item => {
              // console.log(`item`, item)
              const objItems = {
                icon: item.icon,
                label: item.label,
                command: () => history.push(`${item.command}`)
              }
              arrayTmpItems.push(objItems)
            })

            const objHasItems = {
              icon: element.icon,
              label: element.label,
              items: arrayTmpItems
            }
            arrayTmp.push(objHasItems)
          } else { // nếu ko phải là item món ăn thì tạo item link
            const obj = {
              icon: element.icon,
              label: element.label,
              command: () => history.push(`${element.command}`)
            }
            arrayTmp.push(obj)
          }
        })
        localStorage.setItem(MENU,JSON.stringify(arrayTmp))
      }).catch(err => {
        console.log("Error fetchMenuBar()", { ...err });
      })
  };


  const addMenuItemMonAnAPI = async () => {
    axios.get(`http://localhost:8082/services/orderfood/api/menu/item-monan`)
      .then(res => {
        // console.log(`res`, res?.data?.response)
        console.log(`menu`, menu)
      })
      .catch(error => console.log(`error`, error))
  }



  useEffect(() => {



    let numberInCard = JSON.parse(sessionStorage.getItem(DATA_CARD))?.length !== undefined ? JSON.parse(sessionStorage.getItem(DATA_CARD))?.length : 0
    setCard(numberInCard)

    fetchMenuBarAPI();
    // addMenuItemMonAnAPI();
    // getPermissionForUsername();

  }, [])




  return (
    <div>

      <Provider store={store}>

        <MenuContext.Provider value={{ menu, setMenu }}>
          <CardContext.Provider value={{ card, setCard }}>

            <NotificationContext.Provider value={{ notification, setNotification }}>
              <Router>
                <div>
                  <MenuBar />
                  <Content />
                  <Footer />
                </div>
              </Router>
            </NotificationContext.Provider>

          </CardContext.Provider>
        </MenuContext.Provider>

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
