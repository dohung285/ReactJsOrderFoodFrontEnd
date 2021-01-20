// import React from "react";
// import "./index.css";
// import keycloak  from "./keycloak";
// import {AppRouter} from "./routes";
// import {ReactKeycloakProvider} from "@react-keycloak/web";
// import {MenuBar} from "./components/MenuBar";
// import {Footer} from "./components/Footer";
// import { Route, Switch } from 'react-router-dom';
// import LoginPage from './pages/Login';
// const App: React.FC = () => {
//     const LoginContainer = () => (
//         <Route path="/login" component={(props : any) => <LoginPage {...props} />} />
//     );
//     const DefaultContainer = () => (
//         <div className="layout-content">
//             <MenuBar/>
//                 <section>
//                     <div className={"main-container"}>
//                         <AppRouter />
//                     </div>
//                 </section>
//             <Footer/>
//         </div>
//     );
//     return (
//         <React.Fragment>
//             <Switch>
//                 <ReactKeycloakProvider
//                     authClient={keycloak}
//                 >
//                     <Route exact path="/login" component={LoginContainer} />
//                     <Route component={DefaultContainer} />
//                 </ReactKeycloakProvider>
//             </Switch>
//         </React.Fragment>
//     );
// };
// export default App;

import { KeycloakProvider } from "@react-keycloak/web";
import React from "react";

import keycloak from "./keycloak";
import AppRouter from "./routes/AppRouter";

function App() {
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
