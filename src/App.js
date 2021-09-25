
import { getToken, onMessageListener } from './firebase';
import { KeycloakProvider } from "@react-keycloak/web";
import React, { useEffect, useState } from "react";

import keycloak from "./keycloak";
import AppRouter from "./routes/AppRouter";
// import PermissionService from './service/PermissionService';

function App() {

 

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: '', body: '' });
  // const [isTokenFound, setTokenFound] = useState(false);

  getToken();

  // onMessageListener().then(payload => {
  //   setShow(true);
  //   console.log(`payload`, payload)
  //   setNotification({ title: payload.notification.title, body: payload.notification.body })
  //   console.log(payload);
  // }).catch(err => console.log('failed: ', err));


 

  return (
    <KeycloakProvider keycloak={keycloak}>
      <div>
        <section>
          <AppRouter />
        </section>
      </div>
    </KeycloakProvider>
  );
}
export default App;
