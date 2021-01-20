import React from 'react';
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
// import Role from "./pages/Role";
import User from "./pages/User";
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
        path: '/nguoi-dung',
        exact: true,
        main: () => <User />

    },
    {
        path: '/vai-tro',
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