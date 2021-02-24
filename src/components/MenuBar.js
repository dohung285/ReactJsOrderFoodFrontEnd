import React, { useEffect, useState } from "react";
import { Menubar } from "primereact/menubar";
import { useKeycloak } from "@react-keycloak/web";
import logo from "../asset/images/cybertax_logo2.png";
import { Link, useHistory } from "react-router-dom";
export const MenuBar = () => {
  let history = useHistory();
  function handleLogout() {
    history.push("/");
    return keycloak.logout();
  }

  const [active, setActive] = useState(false);

  const roleOfUser = ["a", "c", "d", "e", "f", "g", "h", "i"]; // fake "f", "g", "h", "i"

  const items = [
    {
      label: "Hệ thống",
      icon: "pi pi-fw pi-desktop",
      items: [
        {
          label: "Người dùng",
          icon: "pi pi-fw pi-user-plus",
          permission: "a",
          command: () => history.push("/nguoi-dung"),
        },
        {
          label: "Vai trò",
          icon: "pi pi-fw pi-user-plus",
          permission: "b",
          command: () => history.push("/vai-tro"),
        },
        {
          label: "Chứng thư số",
          icon: "pi pi-fw pi-user-plus",

          permission: "c",
          command: () => history.push("/chung-thu-so"),
        },
        {
          label: "Quản lý đăng ký",
          icon: "pi pi-fw pi-user-plus",

          permission: "d",
          command: () => history.push("/qldk"),
        },
        {
          label: "Thông tin doanh nghiệp",
          icon: "pi pi-fw pi-user-plus",

          permission: "e",
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
          permission: "f",
          command: () => history.push("/nguoi-dung"),
        },
        {
          label: "Trình ký hồ sơ",
          icon: "pi pi-fw pi-user-plus",
          permission: "g",
          command: () => history.push("/vai-tro"),
        },
        {
          label: "Đăng ký ngừng hô sơ",
          icon: "pi pi-fw pi-user-plus",
          permission: "h",
          command: () => history.push("/chung-thu-so"),
        },
        {
          label: "Tra cứu hồ sơ",
          icon: "pi pi-fw pi-user-plus",
          permission: "i",
          command: () => history.push("/chung-thu-so"),
        },
      ],
    },
  ];

  function removeRoleDontHas(items, roleOfUser) {
    // debugger
    let arrayTempl = [];
    const arrayIndex = [];

    // console.log('items', [...items])
    const iterator = items.values();
    for (const x of iterator) {



      console.log("x", x);


      arrayTempl = arrayTempl.concat(x.items);
      // for (let index = 0; index < Object.values(x)[2].length; index++) {
      //   // console.log(Object.values(x)[2][index]);
      //   if (!roleOfUser.includes(Object.values(x)[2][index].permission)) {
      //     console.log("=Remove=: ", index, Object.values(x)[2][index]);
      //     arrayIndex.push(index);
      //     // Object.values(x)[2].splice(index, 1);
      //   }
      // }

      //=========================
      // for (let index = arrayIndex - 1; index >= 0; index--) {

      //   // console.log('arrayIndex[index]', arrayIndex[index])
      //   console.log('index', index , arrayIndex[index])
      //   Object.values(x)[2].splice(arrayIndex[index], 1);
      // }
    }

 

    for (let index = 0; index < arrayTempl.length; index++) {
      console.log('arrayTempl', arrayTempl[index].permission)
      
    }

    // for (const x of iterator) {
    //   console.log('x', x)
    // }
  }

  useEffect(() => {
    removeRoleDontHas(items, roleOfUser);
  }, []);

  // const {keycloak} = useKeycloak();
  const [keycloak] = useKeycloak();
  const onMouseOver = () => {
    setActive(true);
  };
  const start = <img alt="logo" src={logo} height="40" className="p-mr-2" />;
  const end = (
    <ul
      className={"p-menubar-root-list menubar-right"}
      role="menubar"
      onMouseOver={onMouseOver}
      onMouseOut={() => setActive(false)}
    >
      <li
        role="none"
        className={active ? "p-menuitem p-menuitem-active" : "p-menuitem"}
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
