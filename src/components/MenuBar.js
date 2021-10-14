import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import Axios from 'axios';
import { includes } from "lodash";
import { Badge } from 'primereact/badge';
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../asset/images/lg-order-food.png";
import { AUTHENTICATED, EXPRITIME_HIDER_LOADER, MENU } from "../constants/ConstantString";
import { PERMISSION_CTS, PERMISSION_ND, PERMISSION_NTK_DKHS, PERMISSION_NTK_DKNHS, PERMISSION_NTK_TCHS, PERMISSION_NTK_TKHS, PERMISSION_QLDK, PERMISSION_TTDN, PERMISSION_VT } from "../constants/PermissionString";
import { CardContext } from "../context/CardContext";
import { MenuContext } from "../context/MenuContext";
import { NotificationContext } from "../context/NotificationContext";
import useFullPageLoader from "../hooks/useFullPageLoader";
import CardService from "../service/CardService";
import MenuService from "../service/MenuService";
import NotificationService from "../service/NotificationService";
import PermissionService from "../service/PermissionService";



export const MenuBar = () => {


  const [loader, showLoader, hideLoader] = useFullPageLoader();
  let history = useHistory();

  const [keycloak] = useKeycloak();

  const [cardNumber, setCardNumber] = useState(0)
  const [arrayPermissionOfUser, setArrayPermissionOfUser] = useState([])

  const service = new MenuService();
  const cardService = new CardService();
  const permissionService = new PermissionService();
  const notificationService = new NotificationService();

  const { card, setCard } = useContext(CardContext)
  const { notification, setNotification } = useContext(NotificationContext)
  const { menu, setMenu } = useContext(MenuContext)

  const [menuLocalStorage, setmenuLocalStorage] = useState(null)

  const [permissionNotification, setPermissionNotification] = useState(false)

  const [userIsNew, setUserIsNew] = useState(false)

  const [itemMonAn, setItemMonAn] = useState(null)








  function handleLogout() {
    history.push("/");
    return keycloak.logout();
  }

  const [active, setActive] = useState(false);

  const [items, setItems] = useState([])

  // const roleOfUser = ["a", "c", "d", "e", "f", "g", "h", "i"]; // fake "f", "g", "h", "i"

  const itemsx = [
    {
      label: "Hệ thống",
      icon: "pi pi-fw pi-desktop",
      items: [
        {
          label: "Người dùng",
          icon: "pi pi-fw pi-user-plus",
          permission: PERMISSION_ND,
          command: () => history.push("/nguoi-dung"),
        },
        {
          label: "Vai trò",
          icon: "pi pi-fw pi-user-plus",
          permission: PERMISSION_VT,
          command: () => history.push("/vai-tro"),
        },
        {
          label: "Chứng thư số",
          icon: "pi pi-fw pi-user-plus",
          permission: PERMISSION_CTS,
          command: () => history.push("/chung-thu-so"),
        },
        {
          label: "Quản lý đăng ký",
          icon: "pi pi-fw pi-user-plus",
          permission: PERMISSION_QLDK,
          command: () => history.push("/qldk"),
        },
        {
          label: "Thông tin doanh nghiệp",
          icon: "pi pi-fw pi-user-plus",
          permission: PERMISSION_TTDN,
          command: () => history.push("/thong-tin-doanh-nghiep"),
        },
      ],
    },

    {
      label: "Nộp tờ khai",
      icon: "pi pi-fw pi-desktop",
      items: [
        {
          label: "Đăng ký hồ sơ",
          icon: "pi pi-fw pi-user-plus",

          permission: PERMISSION_NTK_DKHS,
          command: () => history.push('/dang-ky-nhop-ho-so')
        },
        {
          label: "Trình ký hồ sơ",
          icon: "pi pi-fw pi-user-plus",

          permission: PERMISSION_NTK_TKHS,
          command: () => history.push('/trinh-ky-ho-so')
        },
        {
          label: "Đăng ký ngừng hô sơ",
          icon: "pi pi-fw pi-user-plus",
          permission: PERMISSION_NTK_DKNHS,
          command: () => history.push("/chung-thu-so"),
        },
        {
          label: "Tra cứu hồ sơ",
          icon: "pi pi-fw pi-user-plus",
          permission: PERMISSION_NTK_TCHS,
          command: () => history.push("/chung-thu-so"),
        },
      ],
    },

    {
      label: "Nộp thuế",
      icon: "pi pi-fw pi-desktop",
      command: () => history.push("/fake-nopthue")
      // items: [
      //   {
      //     label: "Lập giấy nộp tiền",
      //     icon: "pi pi-fw pi-user-plus",
      //     permission: PERMISSION_NT_LGNT,
      //     command: () => history.push('/lap-giay-nop-tien')
      //   },
      //   {
      //     label: "Lập giấy nộp tiền thay",
      //     icon: "pi pi-fw pi-user-plus",
      //     permission: PERMISSION_NT_LGNTT,
      //     command: () => history.push('/lap-giay-nop-tien-thay')
      //   },
      //   {
      //     label: "Tra cứu giấy nộp tiền",
      //     icon: "pi pi-fw pi-user-plus",
      //     permission: PERMISSION_NT_TCGNT,
      //     command: () => history.push("/tra-cuu-giay-nop-tien"),
      //   },
      //   {
      //     label: "Tra cứu thông báo",
      //     icon: "pi pi-fw pi-user-plus",
      //     permission: PERMISSION_NT_TCTB,
      //     command: () => history.push("/tra-cuu-thong-bao"),
      //   },
      //   {
      //     label: "Lập thư tra soát",
      //     icon: "pi pi-fw pi-user-plus",
      //     permission: PERMISSION_NT_LTTS,
      //     command: () => history.push("/lap-thu-tra-soat"),
      //   },
      //   {
      //     label: "Tra cứu thư tra soát",
      //     icon: "pi pi-fw pi-user-plus",
      //     permission: PERMISSION_NT_TCTTS,
      //     command: () => history.push("/tra-cuu-thu-tra-soat"),
      //   }

      // ],
    },

  ];







  // console.log(`keycloak`, keycloak?.realmAccess?.roles.toString());

  // console.log(`keycloak`, keycloak);


  const fetchAllNameOfSystemByUsernameAPI = async (username) => {
    console.log(`username`, username)
    let result = await permissionService.getAllNameOfSystemByUsername(username);
    console.log(`fetchAllNameOfSystemByUsernameAPI`, result)
    if (result?.status === 1000) {
      // console.log(`object`, result?.list)
      setArrayPermissionOfUser(result?.list)
      return result?.list
    }
    return null
  }

  const checkUserIsNew = (username) => {
    return Axios.get(`http://localhost:8082/services/orderfood/api/permission/checknew/${username}`).then(response => {
      // console.log(`response`, response?.data?.status)
      if (response?.data?.status === 1001) {
        setUserIsNew(true)
      } else if (response?.data?.status === 1000) {
        setUserIsNew(false)
      }
    }
    ).catch(error => console.log(`error`, error))
  }

  const addMenuHeThong = async (username) => {
    showLoader()

    let result = await service.getAllMenuItemInSystemOfUser(username);
    // console.log(`addMenuHeThong`, result)
    // console.log(`addMenuHeThong`, result)
    if (result?.status === 1000) {
      // console.log(`addMenuHeThong`, result?.response)

      let arrayItems = [];
      const y = result?.response?.items.forEach(item => {
        // console.log(`items`, item)
        const objItems = {
          icon: item.icon,
          label: item.label,
          command: () => history.push(`${item.command}`)
        }
        // console.log(`objItems`, objItems)
        arrayItems.push(objItems)
      })

      const obj = {
        icon: null,
        label: "Hệ thống",
        items: arrayItems
      }

      // console.log(`obj`, obj)

      let arrayTMP = items;

      arrayTMP.push(obj)

      // let arrayTestItems = [];
      // const objTestItems = {
      //   icon: null,
      //   label: 'test',
      //   command: () => history.push(`/catalog/2`)
      // }
      // arrayTestItems.push(objTestItems)
      // const objTest = {
      //   icon: null,
      //   label: "Hệ thống Test",
      //   items: arrayTestItems
      // }

      // arrayTMP.push(objTest)


      // console.log(`arrayTMP`, arrayTMP)

      // menu.push(obj);
      setItems(arrayTMP)


    }
    hideLoader()

  }


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
        setItems(arrayTmp)
      }).catch(err => {
        console.log("Error fetchMenuBar()", { ...err });
      })
  };

  const addMenuItemMonAnAPI = async () => {
    console.log('co')
    axios.get(`http://localhost:8082/services/orderfood/api/menu/item-monan`)
      .then(res => {
        // console.log(`res`, res?.data?.response?.items)
        // setItemMonAn(res?.data?.response);
        let arrayItems = [];
        const y = res?.data?.response?.items.forEach(item => {
          // console.log(`items`, item)
          const objItems = {
            icon: item.icon,
            label: item.label,
            command: () => history.push(`${item.command}`)
          }
          // console.log(`objItems`, objItems)
          arrayItems.push(objItems)
        })
        // console.log(`arrayItems`, arrayItems)

        const obj = {
          icon: res?.data?.response?.icon,
          label: res?.data?.response?.label,
          items: arrayItems
        }

        // console.log(`obj`, arrayItems)
        console.log(`menu`, menu)

        let arrayTMP = menu
        arrayTMP.push(obj)
        console.log(`arrayTMP`, arrayTMP)
        setMenu(arrayTMP)

        // console.log(`menu`, menu)
      })
      .catch(error => console.log(`error`, error))
  }


  const fetchNumberCard = async () => {
    // console.log(`username`, keycloak?.idTokenParsed?.preferred_username)
    let result = await cardService.countNumber(keycloak?.idTokenParsed?.preferred_username);
    if (result?.status === 1000) {
      // console.log(`cardNumber`, result?.response?.totalItems)
      setCardNumber(result?.response?.totalItems)
    }

  }

  const getPermissionForUsername = () => {
    const username = keycloak?.idTokenParsed?.preferred_username;
    // console.log(`username`, username)
    return axios.get(`http://localhost:8082/services/orderfood/api/permission/get-notification?username=${username}`)
      .then(response => {
        // console.log(`response`, response?.data)
        if (response?.data?.status === 1000) {
          setPermissionNotification(true)
        }

        // setPermissionNotification(true)

      })
      .catch(error => {
        // console.log(`error`, error)
      })
      ;
  }

  const fetchNumberNotification = async () => {
    // console.log(`username`, keycloak?.idTokenParsed?.preferred_username)
    let result = await notificationService.getCurrentNumberNotification();
    // console.log(`fetchNumberNotification`, result)
    // console.log(`number`, result)
    if (result?.status === 1000) {
      setNotification(result?.object?.number)
    }

  }


  // const getCurrentNumberNotificationAPI = async () => {
  //   console.log('getCurrentNumberNotificationAPI')

  //   let result = await notificationService.getCurrentNumberNotification();
  //   console.log(`getCurrentNumberNotificationAPI`, result)
  //   if (result?.status === 1000) {
  //     console.log('ok lấy dc')


  //     // fetchFoodIntoCard();
  //     // toast.current.show({ severity: 'success', summary: 'Thành công', detail: 'Thành công', life: 3000 });
  //   }

  // }


  useEffect(() => {

    // console.log(`MENU`, localStorage.getItem(MENU) )// console.log(`menu`, menu)
    setmenuLocalStorage(localStorage.getItem(MENU))
    fetchMenuBarAPI();

    fetchNumberNotification();
    // getCurrentNumberNotificationAPI()
    // addMenuItemMonAnAPI();
  }, [])

  useEffect(() => {

    // addMenuItemMonAnAPI();

    // console.log(`menu`, menu)

    // console.log(`itemMonAn`, itemMonAn)

    // console.log(`menu`, menu)
    //gọi hàm fetchMenu khi đã đăng nhập
    // fetchMenuBar()

    if (keycloak && keycloak.authenticated) {
      // console.log(`menu`, menu)

      fetchMenuBarAPI();

      getPermissionForUsername();
      fetchNumberNotification();
      checkUserIsNew(keycloak?.idTokenParsed?.preferred_username);


      // console.log(`menu`, menu)

      // fetchAllNameOfSystemByUsernameAPI(keycloak?.idTokenParsed?.preferred_username)
      addMenuHeThong(keycloak?.idTokenParsed?.preferred_username)
    }
  }, [keycloak.authenticated]);




  // const {keycloak} = useKeycloak();


  const changePassword = () => {

  }

  const onMouseOver = () => {
    setActive(true);
  };

  const onClickLogo = () => {
    history.push('/')
  }

  const handleLogin = () => {
    keycloak.login();
    localStorage.setItem(AUTHENTICATED, true);
  }

  const clearNumberNotification = async () => {
    let result = await notificationService.clearNumberNotification();
    // console.log(`clearNumberNotification`, result)
    if (result?.status === 1000) {
      setNotification(0)
    }
  }


  const start = <img alt="logo" src={logo} height="40" className="p-mr-2" onClick={onClickLogo} />;
  const end = (
    <ul
      className={"p-menubar-root-list menubar-right"}
      role="menubar"
    >

      {/* <li >
        <Link to={`/card/${keycloak?.idTokenParsed?.preferred_username}`}>
          <Badge value={cardNumber} severity="danger" className="p-mr-2" />
        </Link>
      </li> */}

      {/* {keycloak?.authenticated &&

        <li >
          <Link to={`/card`}>
            <i className="pi pi-shopping-cart p-mr-4 p-text-secondary p-overlay-badge" style={{ fontSize: '1.5rem' }}><Badge value={`${card}`} severity="danger" ></Badge></i>
          </Link>
        </li>
      } */}

      <li >
        <Link to={`/card`}>
          <i className="pi pi-shopping-cart p-mr-4 p-text-secondary p-overlay-badge" style={{ fontSize: '1.5rem' }}><Badge value={`${card}`} severity="danger" ></Badge></i>
        </Link>
      </li>

      {permissionNotification === true &&

        <li >
          <Link to={`/notification`} onClick={() => clearNumberNotification()}>
            <i className="pi pi-bell p-mr-4 p-text-secondary p-overlay-badge" style={{ fontSize: '1.5rem' }}><Badge value={`${notification}`} severity="danger" ></Badge></i>
          </Link>
        </li>
      }


      {!keycloak?.authenticated &&
        <div className="p-d-flex">
          <li className="p-mr-2" >
            <Button label="Đăng nhập" className=" p-button-text p-button-plain" onClick={() => handleLogin()} />

            {/* <span className="p-button-text p-button-plain" onClick={() => handleLogin()}>Đăng nhập</span> */}
          </li>

          <li >
            <Button label="Đăng ký" className=" p-button-text p-button-plain" onClick={() => keycloak.register()} />

            {/* <span className="p-button-text" onClick={() => keycloak.register()} >Đăng ký</span> */}
          </li>

        </div>

      }


      {
        !!keycloak?.authenticated && (
          <li
            role="none"
            className={active ? "p-menuitem p-menuitem-active" : "p-menuitem"}
            onMouseOver={onMouseOver}
            onMouseOut={() => setActive(false)}
          >
            <span role="menuitem" className="p-menuitem-link" aria-haspopup="true">
              <span className="p-menuitem-text">
                {keycloak?.authenticated ? keycloak?.idTokenParsed?.name : ""}
              </span>
              <span className="p-submenu-icon pi pi-angle-down" />
            </span>

            <ul className="p-submenu-list menu-admin" role="menu">
              <li role="none">
                <Link
                  role="menuitem"
                  to="/list-order"
                  className="p-menuitem-link"
                  aria-haspopup="false"
                >
                  <span className="pi pi-user" style={{ marginRight: "0.5rem" }} />
                  <span className="p-menuitem-text">Đơn hàng</span>
                </Link>
              </li>

              <li role="none">
                <Link
                  role="menuitem"
                  to="/user-infor"
                  className="p-menuitem-link"
                  aria-haspopup="false"
                >
                  <span className="pi pi-user" style={{ marginRight: "0.5rem" }} />
                  <span className="p-menuitem-text">Thông tin</span>
                </Link>
              </li>


              <li role="none">
                <Link
                  to="/change-password"
                  role="menuitem"
                  className="p-menuitem-link"
                  aria-haspopup="false"
                >
                  <span className="pi pi-key" style={{ marginRight: "0.5rem" }} />
                  <span className="p-menuitem-text" >Đổi mật khẩu</span>
                </Link>
              </li>



              <li role="none">
                <span
                  // href="/login"
                  role="menuitem"
                  className="p-menuitem-link"
                  aria-haspopup="false"
                  // onClick={() =>{ keycloak.logout()}}
                  onClick={handleLogout}
                >
                  <span
                    className="pi pi-sign-out"
                    style={{ marginRight: "0.5rem" }}
                  />
                  <span className="p-menuitem-text">Đăng xuất</span>
                </span>
              </li>

            </ul>
          </li>
        )
      }



    </ul >
  );


  return (
    <div>
      <div>
        {/* {keycloak && keycloak.authenticated &&
          <Menubar model={items} start={start} end={end} />}

        {!keycloak && !keycloak.authenticated &&
         } */}

        <Menubar model={items} start={start} end={end} />
        {/* <Menubar model={menu} start={start} end={end} /> */}

        {/* <Menubar model={menuLocalStorage} start={start} end={end} /> */}


      </div>
      {loader}
    </div>
  );
};
