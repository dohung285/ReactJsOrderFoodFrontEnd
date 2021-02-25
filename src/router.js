import React from 'react';
import ChungThuSo from './pages/chungthuso/ChungThuSo';
import RegisterTVAN from './pages/dang-ky-su-dung-tvan/RegisterTVAN';
import Home from "./pages/Home";
import InfoBusiness from './pages/InfoBusines/InfoBusiness';
import NotFound from "./pages/NotFound";
import User from "./pages/nguoidung/User";
import Role from './pages/vaitro/Role';
import Dangkyhoso from './pages/dangkynophoso/Dangkyhoso';
import TrinhKyHoSo from './pages/trinhkyhoso/TrinhKyHoSo';
import DoanhNghiep from './pages/doanh-nghiep/DoanhNghiep';
import LapGiayNopTien from './pages/lapgiaynoptien/LapGiayNopTien';
import LapGiayNopTienThay from './pages/lapgiaynoptienthay/LapGiayNopTienThay';
import TraCuuGiayNopTien from './pages/tracuugiaynoptien/TraCuuGiayNopTien';
import TraCuuThongBao from './pages/tracuuthongbao/TraCuuThongBao';
import LapThuTraSoat from './pages/lapthutrasoat/LapThuTraSoat';
import TraCuuThuTraSoat from './pages/tracuuthutrasoat/TraCuuThuTraSoat';



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
        path: '/dang-ky-nhop-ho-so',
        exact: true,
        main: () => <Dangkyhoso />

    },
    {
        path: '/trinh-ky-ho-so',
        exact: true,
        main: () => <TrinhKyHoSo />

    },
    {
        path: '/ho-so',
        exact: true,
        main: () => <DoanhNghiep />

    },

    {
        path: '/lap-giay-nop-tien',
        exact: true,
        main: () => <LapGiayNopTien />

    },

    {
        path: '/lap-giay-nop-tien-thay',
        exact: true,
        main: () => <LapGiayNopTienThay />

    },

    {
        path: '/tra-cuu-giay-nop-tien',
        exact: true,
        main: () => <TraCuuGiayNopTien />

    },
    {
        path: '/tra-cuu-thong-bao',
        exact: true,
        main: () => <TraCuuThongBao />

    },
    {
        path: '/lap-thu-tra-soat',
        exact: true,
        main: () => <LapThuTraSoat/>

    },
    {
        path: '/tra-cuu-thu-tra-soat',
        exact: true,
        main: () => <TraCuuThuTraSoat />

    },


    {
        path: '',
        exact: false,
        main: () => <NotFound />

    }
];

export default routes;