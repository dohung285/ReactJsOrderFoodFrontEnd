import React from 'react';
import RegisterTVAN from './pages/dang-ky-su-dung-tvan/RegisterTVAN';
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
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
        path: '/qldk',
        exact: true,
        main: () => <RegisterTVAN />

    },
    {
        path: '',
        exact: false,
        main: () => <NotFound />

    }
];

export default routes;