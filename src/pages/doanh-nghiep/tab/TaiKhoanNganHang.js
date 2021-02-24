import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useState } from 'react';

function TaiKhoanNganHang() {
    const [products, setProducts] = useState([
        { stt: "1", tentaikhoan: "Cyber Tax",chutaikhoan:"CybertLoutus",sotaikhoan:"24/02/2021",trangthai:"24/02/2021"}
    ])
    return (

        <div className="card-body">
                <DataTable value={products} >
                    <Column field="stt" header="STT"></Column>
                    <Column field="tentaikhoan" header="Tên tài khoản"></Column>
                    <Column field="chutaikhoan" header="Tên chủ tài khoản"></Column>
                    <Column field="sotaikhoan" header="Số tài khoản"></Column>
                    <Column field="trangthai" header="Trang thái đăng ký"></Column>
                </DataTable>
            </div>
    )
}

export default TaiKhoanNganHang