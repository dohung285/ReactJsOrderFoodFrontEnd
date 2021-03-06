import { useKeycloak } from '@react-keycloak/web';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';


export function PrivateRoute({ component: Component, roles, ...rest }) {
    const [keycloak] = useKeycloak();
    // console.log(`roles`, roles)
    // console.log(`Component`, component)
    // console.log(`...rest`, ...rest)
    const isAutherized = (roles) => {

        if (keycloak && roles) {
            // console.log(`xin chào thế giới`);
            // debugger
            return roles.some(r => {
                // In keycloak there are two ways of assiging roles to the user 
                // You can assign roles to realm & client 
                // In that case you have to use both scinarios with hasRealmRole & hasResourceRole
                const realm = keycloak.hasRealmRole(r);
                const resource = keycloak.hasResourceRole(r);
                // console.log(`realm`, realm)
                // console.log(`resource`, resource)
                return realm || resource;
            });
        }
        return false;
        // return alert("fail")
    }

    return (
      
        <Route
            {...rest}
            render={
                props => {
                    return isAutherized(roles) ? <Component {...props} /> : <Redirect to={{ pathname: '/', }} />
                }}
        />
    )
}