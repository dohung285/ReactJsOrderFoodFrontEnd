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
import React from "react";
import Main from "../components/Main";

const AppRouter = ({ keycloak, keycloakInitialized }) => {
  return (
    <div>
      {keycloak && !keycloak.authenticated && (
        <Button
          label="Đăng nhập"
          className="p-button-rounded p-button-success"
          onClick={() => keycloak.login()}
        />
      )}
      {keycloak && keycloak.authenticated && <Main />}
    </div>
  );
};

export default withKeycloak(AppRouter);
