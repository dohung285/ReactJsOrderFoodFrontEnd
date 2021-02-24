import { Button, Checkbox } from '@material-ui/core';
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Tag } from 'primereact/tag';
import React, { useEffect, useState } from 'react';

function ChungThuSoTab() {
    const [products, setProducts] = useState([
        { stt: "1", sohuu: "54010109070D0CF3E1D2982F3E027EA5",hinhthuc:0,ncc:"CÔNG TY CỔ PHẦN CYBERLOTUS",ngaybatdau:"24/02/2021",ngayketthuc:"24/02/2021", hieuluc: 1 },
        { stt: "2", sohuu: "Cyber Tax",hinhthuc:0,ncc:"CybertLoutus",ngaybatdau:"24/02/2021",ngayketthuc:"24/02/2021", hieuluc: 1 },
        { stt: "3", sohuu: "Cyber Tax",hinhthuc:0,ncc:"CybertLoutus",ngaybatdau:"24/02/2021",ngayketthuc:"24/02/2021", hieuluc: 1 },
        { stt: "4", sohuu: "Cyber Tax",hinhthuc:0,ncc:"CybertLoutus",ngaybatdau:"24/02/2021",ngayketthuc:"24/02/2021", hieuluc: 1 },
        { stt: "5", sohuu: "Cyber Tax",hinhthuc:0,ncc:"CybertLoutus",ngaybatdau:"24/02/2021",ngayketthuc:"24/02/2021", hieuluc: 1 },
        { stt: "6", sohuu: "Cyber Tax",hinhthuc:0,ncc:"CybertLoutus",ngaybatdau:"24/02/2021",ngayketthuc:"24/02/2021", hieuluc: 1 },
        { stt: "7", sohuu: "Cyber Tax",hinhthuc:0,ncc:"CybertLoutus",ngaybatdau:"24/02/2021",ngayketthuc:"24/02/2021", hieuluc: 1 },
        { stt: "8", sohuu: "Cyber Tax",hinhthuc:0,ncc:"CybertLoutus",ngaybatdau:"24/02/2021",ngayketthuc:"24/02/2021", hieuluc: 1 }
    ])
    const renderRowStatus = (products) => {
        const status = products.hinhthuc === 0 ? "Hoạt động" : "Khóa";
        return <Tag severity="info" value={status} />;
    };

    const renderRowHieuLuc = (products) => {
        const status = products.hieuluc === 0 ? "Hoạt động" : "Khóa";
        return <Checkbox severity="info" value={status} />;
    };
    const onEditClick = (products) => {
        setProducts(products);
    }
    const actionBodyTemplate = (products) => {
        return (
            <React.Fragment>
                <i className="pi pi-pencil p-mr-2 icon-medium"
                    title={"Sửa"} style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => onEditClick(products)} />
            </React.Fragment>
        );
    };
    return (
        <div>
            <div className="card">
                <DataTable value={products} >
                    <Column field="stt" header="STT"></Column>
                    <Column field="sohuu" header="Sở hữu"></Column>
                    <Column field="ncc" header="Nhà cung cấp"></Column>
                    <Column field="hinhthuc" header="Hình thức" className="p-text-center" body={renderRowStatus} sortable></Column>
                    <Column field="ngaybatdau" header="Ngày bắt đầu"></Column>
                    <Column field="ngayketthuc" header="Ngày kết thúc"></Column>
                    <Column field="hieuluc" header="Hiệu lực" className="p-text-center" body={renderRowHieuLuc}></Column>
                    <Column field="hanhdong" header="Hành động" body={actionBodyTemplate} className="p-text-center"></Column>
                </DataTable>
            </div>
        </div>
    )
}

export default ChungThuSoTab