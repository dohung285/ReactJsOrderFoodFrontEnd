import React from 'react';
import ChungThuSo from './pages/chungthuso/ChungThuSo';
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
        path: '/chung-thu-so',
        exact: true,
        main: () => <ChungThuSo />

    },
    {
        path: '',
        exact: false,
        main: () => <NotFound />

    }
];

export default routes;