import React, { useState } from "react";
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
  const items = [
    {
      label: "Hệ thống",
      icon: "pi pi-fw pi-desktop",
      items: [
        {
          label: "Người dùng",
          icon: "pi pi-fw pi-user-plus",
         
          permission: "",
          command:()=> history.push('/nguoi-dung')
        },
        {
          label: "Vai trò",
          icon: "pi pi-fw pi-user-plus",
          
          permission: "",
          command:()=> history.push('/vai-tro')
        },
      ],
    },
  ];
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
