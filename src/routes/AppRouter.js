// import * as React from 'react'
// import { BrowserRouter as Router } from 'react-router-dom'

// import { useKeycloak } from '@react-keycloak/web'

// import HomePage from '../pages/Home'
// import User from '../pages/User';
// import Role from '../pages/Role';
// import { PrivateRoute } from './utils'
// export const AppRouter = ({ keycloak, keycloakInitialized }) => {
//   const { initialized } = useKeycloak();

//   if (!initialized) {
//     return <div>Loading...</div>
//   }

//   return (
//     <Router>
//       <PrivateRoute path="/nguoi-dung" component={User} />
//       <PrivateRoute path="/vai-tro" component={Role} />
//       <PrivateRoute path="/home" component={HomePage} />
//     </Router>
//   )
// };

import { withKeycloak } from "@react-keycloak/web";
import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import Main from "../components/Main";

const AppRouter = ({ keycloak, keycloakInitialized }) => {


  return (
    <div>
      {/* {keycloak && !keycloak.authenticated && (

        <Button
          label="Đăng nhập"
          className="p-button-rounded p-button-success"
          onClick={() => keycloak.login()}
        />
      )}
      {keycloak && keycloak.authenticated && <Main />} */}
      <Main />

    </div>
  );

  // const [keycloak, setKeycloak] = useState(null);
  // const [isAuthenciated, setAuthenciation] = useState(false);
  // useEffect(() => {
  //   // const keycloak = Keycloak("/keycloak.json");
  //   keycloak.init({ onLoad: "login-required" }).then(authenticated => {
  //     keycloak.keycloak= authenticated.keycloak
  //       setAuthenciation(authenticated);
  //   });
  // },[]);

  // if (keycloak) {
  //   if (isAuthenciated)
  //     return (
  //       <div>
  //         <p>
  //           This is a Keycloak-secured component of your application. You
  //           shouldn't be able to see this unless you've authenticated with
  //           Keycloak.
  //         </p>
  //         {/* <UserInfo keycloak={this.state.keycloak} />
  //         <Logout keycloak={this.state.keycloak} /> */}
  //       </div>
  //     );
  //   else return <div>Unable to authenticate!</div>;
  // }
  // return <div>Initializing Keycloak...</div>;





};

export default withKeycloak(AppRouter);
