import React from 'react';
import ChungThuSo from './pages/chungthuso/ChungThuSo';
import RegisterTVAN from './pages/dang-ky-su-dung-tvan/RegisterTVAN';
import Home from "./pages/Home";
import InfoBusiness from './pages/InfoBusines/InfoBusiness';
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
        path: '/qldk',
        exact: true,
        main: () => <RegisterTVAN />

    },
    {
        path: '/thong-tin-doanh-nghiep',
        exact: true,
        main: () => <InfoBusiness />

    },
    {
        path: '',
        exact: false,
        main: () => <NotFound />

    }
];

export default routes;