import { useKeycloak } from "@react-keycloak/web";
import { Menubar } from "primereact/menubar";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../asset/images/cybertax_logo2.png";
import { PERMISSION_CTS, PERMISSION_ND, PERMISSION_NTK_DKHS, PERMISSION_NTK_DKNHS, PERMISSION_NTK_TCHS, PERMISSION_NTK_TKHS, PERMISSION_NT_LGNT, PERMISSION_NT_LGNTT, PERMISSION_NT_LTTS, PERMISSION_NT_TCGNT, PERMISSION_NT_TCTB, PERMISSION_NT_TCTTS, PERMISSION_QLDK, PERMISSION_TTDN, PERMISSION_VT } from "../constants/PermissionString";
import { useRole } from "../hooks/useRole";
import { Badge } from 'primereact/badge';
import MenuService from "../service/MenuService";


export const MenuBar = () => {

  let history = useHistory();
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
      items: [
        {
          label: "Lập giấy nộp tiền",
          icon: "pi pi-fw pi-user-plus",
          permission: PERMISSION_NT_LGNT,
          command: () => history.push('/lap-giay-nop-tien')
        },
        {
          label: "Lập giấy nộp tiền thay",
          icon: "pi pi-fw pi-user-plus",
          permission: PERMISSION_NT_LGNTT,
          command: () => history.push('/lap-giay-nop-tien-thay')
        },
        {
          label: "Tra cứu giấy nộp tiền",
          icon: "pi pi-fw pi-user-plus",
          permission: PERMISSION_NT_TCGNT,
          command: () => history.push("/tra-cuu-giay-nop-tien"),
        },
        {
          label: "Tra cứu thông báo",
          icon: "pi pi-fw pi-user-plus",
          permission: PERMISSION_NT_TCTB,
          command: () => history.push("/tra-cuu-thong-bao"),
        },
        {
          label: "Lập thư tra soát",
          icon: "pi pi-fw pi-user-plus",
          permission: PERMISSION_NT_LTTS,
          command: () => history.push("/lap-thu-tra-soat"),
        },
        {
          label: "Tra cứu thư tra soát",
          icon: "pi pi-fw pi-user-plus",
          permission: PERMISSION_NT_TCTTS,
          command: () => history.push("/tra-cuu-thu-tra-soat"),
        }

      ],
    },

  ];





  const [keycloak] = useKeycloak();

  const service = new MenuService();

  // console.log(`keycloak`, keycloak?.realmAccess?.roles.toString());

  const fetchMenuBar = async () => {

    const result = await service.getAllMenuByRoleName(keycloak?.realmAccess?.roles.toString());
    // console.log(`result Before`, result)
    if (result) {
      const resultWithLink = result.map(element => {
        const { items, label } = element;
        // console.log(`element`, element)
        if (items.length === 0 && label === 'Trang chủ') {
          history.push('/home')
        }
        const itemsWithLink = items.map(item => {

          const { command: url } = item;
          return { ...item, command: () => history.push(`${url}`) }
        })
        return { ...element, items: itemsWithLink }
      })

      setItems(resultWithLink);
      // console.log(`result After`, resultWithLink)

      // result.forEach(element => {
      //   // console.log(`element`, element?.items)
      //   let arrayItems = element?.items;
      //   arrayItems.forEach(e => {
      //     // console.log(`e.command`, e.command)
      //    let link = e.command;
      //     let strFn = ()=>history.push(`${link}`)
      //     // console.log(`strFn`, strFn)
      //     // console.log(`e => updateObject`, { ...e, command: strFn})
      //     // e = { ...e, command: strFn }
      //     e.command = strFn
      //   });




    }



  };




  useEffect(() => {
    fetchMenuBar()
  }, []);

  // const {keycloak} = useKeycloak();

  const onMouseOver = () => {
    setActive(true);
  };

  const onClickLogo = () => {
    history.push('/')
  }
  const start = <img alt="logo" src={logo} height="40" className="p-mr-2" onClick={onClickLogo} />;
  const end = (



    <ul
      className={"p-menubar-root-list menubar-right"}
      role="menubar"
    >

      <li>
        <Badge value="6" size="xlarge" severity="success"></Badge>
      </li>


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
              to="/ho-so"
              className="p-menuitem-link"
              aria-haspopup="false"
            >
              <span className="pi pi-user" style={{ marginRight: "0.5rem" }} />
              <span className="p-menuitem-text">Quản lý tài khoản</span>
            </Link>
          </li>
          <li role="none">
            <Link
              to="/doi-mat-khau"
              role="menuitem"
              className="p-menuitem-link"
              aria-haspopup="false"
            >
              <span className="pi pi-key" style={{ marginRight: "0.5rem" }} />
              <span className="p-menuitem-text">Thay đổi mật khẩu</span>
            </Link>
          </li>
          {!!keycloak?.authenticated && (
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
          )}
        </ul>
      </li>

    </ul>


  );
  return (
    <div>
      <div>
        <Menubar model={items} start={start} end={end} />
      </div>
    </div>
  );
};
