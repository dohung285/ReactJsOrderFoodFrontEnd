import { Button, Checkbox } from '@material-ui/core';
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Tag } from 'primereact/tag';
import React, { useEffect, useState } from 'react';
import ChungThuSoService from '../../../service/ChungThuSoService';

function ChungThuSoTab() {
    const service = new ChungThuSoService();
    const [first, setFirst] = useState(0);
    const [products, setProducts] = useState([
    ])
    useEffect(() => {
        fetDataInfoBusinessById();
    }, [])

    const fetDataInfoBusinessById = async () => {
        const result = await service.getChungThuSoByDoanhNghiep();
        if (result && result.status === 1000) {
            setProducts(result.list)
        }
    };
    const renderRowStatus = (products) => {
        const status = products.trangThai === 0 ? "Hoạt động" : "Khóa";
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

    const renderRowIndex = (products, column) => {
        return column.rowIndex + 1 + first;
    };

    return (
        <div>
            <div className="card">
                <DataTable value={products} >
                <Column body={renderRowIndex}  header="STT" headerStyle={{ width: '4rem' }}
                            className="p-text-center" />
                    <Column field="idDoanhNghiep" header="Sở hữu"></Column>
                    <Column field="nhaCungCap" header="Nhà cung cấp"></Column>
                    <Column field="trangThai" header="Trạng Thái" className="p-text-center" body={renderRowStatus} sortable></Column>
                    <Column field="ngayBatDau" header="Ngày bắt đầu"></Column>
                    <Column field="ngayKetThuc" header="Ngày kết thúc"></Column>
                    <Column field="hieuluc" header="Hiệu lực" className="p-text-center" body={renderRowHieuLuc}></Column>
                    <Column field="hanhdong" header="Hành động" body={actionBodyTemplate} className="p-text-center"></Column>
                </DataTable>
            </div>
        </div>
    )
}

export default ChungThuSoTab