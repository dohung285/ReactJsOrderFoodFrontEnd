import { TabView, TabPanel } from 'primereact/tabview';
import React from 'react'
import { withRouter } from 'react-router-dom';
import ChungThuSoTab from './tab/ChungThuSoTab';
import ChungThuSo from './tab/ChungThuSoTab';
import TaiKhoanNganHang from './tab/TaiKhoanNganHang';
import ThongTinNguoiNopThue from './tab/ThongTinNguoiNopThue';
import './tab-view.scss';
import { Button, Toolbar } from '@material-ui/core';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

function DoanhNghiep() {
    return (
        <div className={"card"}>
        <div className={"card-header"}>
            <h1>Thông tin doanh nghiệp</h1>
        </div>
        <div className={"card-body"}>
        <div className="DoanhNghiep">

                <TabView className="tabview-custom-flex">

                    <TabPanel header="Thông tin người nộp thuế" leftIcon="pi pi-user" className="space">
                        <ThongTinNguoiNopThue></ThongTinNguoiNopThue>
                    </TabPanel>

                    <TabPanel header="Chứng thư số" leftIcon="pi pi-calendar" className="space" >
                        <ChungThuSoTab></ChungThuSoTab>
                    </TabPanel>


                    <TabPanel header="Tài khoản ngân hàng" leftIcon="pi pi-home" className="space" >
                        <TaiKhoanNganHang></TaiKhoanNganHang>
                    </TabPanel>

                </TabView>
            </div>
        </div>
        </div>
    )
}

export default DoanhNghiep