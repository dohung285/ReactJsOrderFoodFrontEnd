import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { FileUpload } from 'primereact/fileupload';
import React, { Component, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

const TrinhKyHoSo = (props) => {
    const [datatablehs, setDatatablehs] = useState(null);
    const datahs = [
        {"id": "1000","code": "f230fh0g3","name": "Bamboo Watch","description": "Product Description","image": "bamboo-watch.jpg","price": 65,"category": "Accessories","quantity": 24,"inventoryStatus": "INSTOCK","rating": 5},
        {"id": "1001","code": "nvklal433","name": "Black Watch","description": "Product Description","image": "black-watch.jpg","price": 72,"category": "Accessories","quantity": 61,"inventoryStatus": "INSTOCK","rating": 4},
        {"id": "1002","code": "zz21cz3c1","name": "Blue Band","description": "Product Description","image": "blue-band.jpg","price": 79,"category": "Fitness","quantity": 2,"inventoryStatus": "LOWSTOCK","rating": 3},
        
    ];
useEffect(() => {
    
    setDatatablehs(datahs);
}, []); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <React.Fragment>
            <div className={"card"}>
                <div className={"card-header"}>
                    <h1>Trình ký hồ sơ</h1>

                </div>
                <div className={"card-body"}>
                <FileUpload accept=".xml" chooseLabel="Chọn File" uploadLabel="Trình hồ sơ" cancelLabel="Hủy bỏ"  name="demo[]" url="./upload" multiple />
                
                
                        <DataTable style={{paddingTop: 20}} value={datatablehs} className="p-datatable-gridlines">
                            <Column field="code" header="Tên hồ sơ cần nộp1"></Column>
                            <Column field="name" header="Dung lượng"></Column>
                            <Column field="category" header="Trạng thái nộp"></Column>
                            <Column field="category" header="Hủy chọn"></Column>
                           
                        </DataTable>
                   
            </div>
            </div>
        </React.Fragment>
    );

}


export default withRouter(TrinhKyHoSo);