import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import React, { useEffect, useState, useRef } from 'react';
import ThongTinNganHangService from '../../../service/ThongTinNganHangService';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EXPRITIME_HIDER_LOADER, TIME_OUT_CLOSE_NOTIFY } from '../../../constants/ConstantString';

const banks = [
    { name: 'Agribank', code: 'AG' },
    { name: 'Techcombank', code: 'TC' },
    { name: 'Vietcombank', code: 'VC' },
    { name: 'MBBank', code: 'MB' },
    { name: 'VietTinBank', code: 'VT' }
];
function TaiKhoanNganHang() {


    const service = new ThongTinNganHangService();
    const [products, setProducts] = useState([])
    const [first, setFirst] = useState(0);
    const [position, setPosition] = useState('center');
    const [adData, setAdData] = useState({});
    const [visibleDialog, setVisibleDialog] = useState(false);
    // loại thêm mới hay sửa
    const [typeAd, setTypeAd] = useState(1);
    const [idNH, setIdNH] = useState(1);
    const [displayBasic, setDisplayBasic] = useState(false);

    const updateField = (data, field) => {
        setAdData({
            ...adData,
            [field]: data,
        });
    }

    useEffect(() => {
        getDataBank();
    }, []);

    const onCreateClick = () => {
        setTypeAd(1)
        setVisibleDialog(true);
    }
    const onEditClick = (rowData) => {
        setVisibleDialog(true);
        setTypeAd(2)
        setAdData(rowData);
    }

    const onDeleteClick = (id) => {
        setIdNH(id);
        let name = "displayBasic";
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }

    const dialogFuncMap = {
        displayBasic: setDisplayBasic,
    };
    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    };
    // export dữ liệu
    //Ẩn dialog thêm mới, cập nhật
    const onHideDialog = () => {
        setVisibleDialog(false);
    }

     // show message success
     const notifySuccess = (message) => {
        toast.success(`✔👌👌😘😘😘 ${message}`, {
            position: "top-right",
            autoClose: TIME_OUT_CLOSE_NOTIFY,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    // show message errors
    const notifyError = (message) => {
        toast.error(`😢😢😢😢😢😢 ${message}`, {
            position: "top-right",
            autoClose: TIME_OUT_CLOSE_NOTIFY,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const getDataBank = async () => {
        const result = await service.layThongTinNganHangTheoDoanhNghiep();
        if (result && result.status === 1000) {
            setProducts(result.object)
        }
    };
    
    const handleOnYesDialog = async () => {
        if (typeAd === 1) {
            const result = await service.themNganHang(adData);
            if (result && result.status === 1000) {
                setTimeout(getDataBank, EXPRITIME_HIDER_LOADER); // đợi 0.5s sau mới gọi hàm fetData()
                let message = result.message;
                notifySuccess(message)
                onHideDialog();
            } else {
                let message = result.message;
                notifyError(message)
            }
        }
        else {
            const result = await service.suaNganHang(adData.id, adData);
            if (result && result.status === 1000) {
                setTimeout(getDataBank, EXPRITIME_HIDER_LOADER); // đợi 0.5s sau mới gọi hàm fetData()
                let message = result.message;
                notifySuccess(message)
                onHideDialog();
            } else {
                let message = result.message;
                notifyError(message)
            }
        }
    }

    const onHandleDeleteModel = async (name) => {
        const result = await service.xoaNganHang(idNH);
        if (result && result.status === 1000) {
            setTimeout(getDataBank, EXPRITIME_HIDER_LOADER); // đợi 0.5s sau mới gọi hàm fetData()
            let message = result.message;
            notifySuccess(message)
            onHide(name)
        } else {
            let message = result.message;
            notifyError(message)
        }
    }



    const rightContents = (
        <React.Fragment>
            <Button icon="pi pi-plus" className="p-mr-2 p-button-success" onClick={() => onCreateClick()} />
        </React.Fragment>
    );
    
    const renderRowStatus = (products) => {
        const status = products.trangThai === 0 ? "Hoạt động" : "Khóa";
        return <Tag severity="info" value={status} />;
    };

    const renderRowIndex = (products, column) => {
        return column.rowIndex + 1 + first;
    };

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={onHideDialog} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={handleOnYesDialog} />
            </div>
        );
    }

    const renderFooterDelete = (name) => {
        return (
            <div>
                <Button
                    label="No"
                    icon="pi pi-times"
                    onClick={() => onHide(name)}
                    className="p-button-text"
                />
                <Button
                    label="Yes"
                    icon="pi pi-check"
                    onClick={() => onHandleDeleteModel(name)}
                    autoFocus
                />
            </div>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div>
                <i
                    className="pi pi-pencil p-mr-2 icon-medium"
                    title={"Sửa"}
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => onEditClick(rowData)}
                />
                <i
                    className="pi pi-trash icon-medium"
                    style={{ color: "red", cursor: "pointer" }}
                    title={"Xóa"}
                    onClick={() => onDeleteClick(rowData.id)}
                />
            </div>
        );
    };


    return (
        <div className="TaiKhoanNganHang" >
            <Dialog
                header="Thông báo xác nhận"
                visible={displayBasic}
                style={{ width: "25vw" }}
                footer={renderFooterDelete("displayBasic")}
                onHide={() => onHide("displayBasic")}
            >
                <p>Bạn có chắc chắn muốn xóa không?</p>
            </Dialog>

            <ToastContainer
                position="top-right"
                autoClose={TIME_OUT_CLOSE_NOTIFY}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <Toolbar right={rightContents} className="p-mb-5" />
            <div className="card-body">
                <DataTable value={products} >
                    <Column body={renderRowIndex} header="STT" headerStyle={{ width: '4rem' }}
                        className="p-text-center" />
                    <Column field="tenNganHang" header="Tên tài khoản"></Column>
                    <Column field="tenChuTaiKhoan" header="Tên chủ tài khoản"></Column>
                    <Column field="soTaiKhoan" header="Số tài khoản"></Column>
                    <Column field="trangThai" header="Trang thái đăng ký" className="p-text-center" body={renderRowStatus} ></Column>
                    <Column header="Tác vụ" body={actionBodyTemplate} className="p-text-center" headerStyle={{ width: '6rem' }} />
                </DataTable>
            </div>
            <Dialog header="Thêm thông tin ngân hàng"
                visible={visibleDialog}
                style={{ width: '50vw' }}
                footer={renderFooter('displayBasic')}
                onHide={onHideDialog}
            >
                <form >
                    <div className="p-fluid p-formgrid p-grid">
                        <label htmlFor="tenNganHang" >Tên ngân hàng</label>
                        <Dropdown
                            value={adData.tenNganHang}
                            optionValue={"name"}
                            options={banks}
                            optionLabel="name"
                            onChange={(e) => updateField(e.target.value, 'tenNganHang')}
                            className="dropdowCusNH"
                            placeholder="---Chọn ngân hàng---" />
                    </div>

                    <div className="p-fluid p-formgrid p-grid">
                        <label htmlFor="soTaiKhoan" >Số tài khoản</label>
                        <InputText id="soTaiKhoan"
                            // className
                            placeholder="Số tài khoản"
                            value={adData.soTaiKhoan || ""}
                            name="mst"
                            onChange={(e) => updateField(e.target.value, 'soTaiKhoan')}
                        />
                    </div>

                    <div className="p-fluid p-formgrid p-grid">
                        <label htmlFor="tenChuTaiKhoan" >Tên chủ tài khoản</label>
                        <InputText id="tenChuTaiKhoan"
                            // className
                            placeholder="Tên chủ tài khoản"
                            value={adData.tenChuTaiKhoan || ""}
                            name="mst"
                            onChange={(e) => updateField(e.target.value, 'tenChuTaiKhoan')}
                        />
                    </div>
                </form>
            </Dialog>
        </div>
    )
}

export default TaiKhoanNganHang