import React from 'react';
import Home from "./pages/Home";
import User from "./pages/nguoidung/User";
import NotFound from "./pages/NotFound";
import Role from './pages/vaitro/Role';



const routes=[

    {
        path: '/home',
        exact: true,
        main: () => <Home />

    },
    {
        path: '/',
        exact: true,
        main: () => <Home />

    },
    {
        path: '/user',
        exact: true,
        main: () => <User />
        // main: () =>  <PrivateRoute roles={['RealmAdmin']} path="/nguoi-dung" component={User} />

    },
    {
        path: '/role',
        exact: true,
        main: () => <Role />

    },
 
    {
        path: '',
        exact: false,
        main: () => <NotFound />

    }
];

export default routes;