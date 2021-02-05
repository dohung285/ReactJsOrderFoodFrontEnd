import { Button } from 'primereact/button';
import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext'
import InfoBusinessService from '../../../service/InfoBusinessService';
import { RadioButton } from 'primereact/radiobutton';
import './errors.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBusiness = (props) => {
    const {
        visible, onHideDialog,
        fetDataInfoBusiness, typeAd,
        adData, setAdData
    } = props;

    const [file, setFile] = useState("")
    // state check errors
    const [mstErrors, setMstErrors] = useState({})
    const [thudientuErrors, setThudientuErrors] = useState({})
    const [tendoanhnghiepErrors, setTendoanhnghiepErrors] = useState({})
    const [tencoquanthueErrors, setTencoquanthueErrors] = useState({})
    const [sodienthoaiErrors, setSodienthoaiErrors] = useState({})
    const service = new InfoBusinessService();
    // show message success
    const notifySuccess = (message) => {
        toast.success(`✔👌👌😘😘😘 ${message}`, {
            position: "top-right",
            autoClose: 2000,
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
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };



    // check form after submit form
    const formValidation = () => {
        const mstErrors = {}
        const thudientuErrors = {}
        const tendoanhnghiepErrors = {}
        const tencoquanthueErrors = {}
        let isValid = true;

        if (
            adData.mst === ''
            || adData.mst === null
            || adData.mst === undefined
        ) {

            mstErrors.mstRequired = "Không được bỏ trống";
            isValid = false;
        }

        if (adData.thudientu === ''
            || adData.thudientu == null
            || adData.thudientu == undefined
        ) {
            thudientuErrors.thudientuRequired = "Không được bỏ trống";
            isValid = false;
        }
        //=====================

        if (
            adData.tendoanhnghiep === ''
            || adData.tendoanhnghiep == null
            || adData.tendoanhnghiep == undefined
        ) {
            tendoanhnghiepErrors.tendoanhnghiepRequired = "Không được bỏ trống";
            isValid = false;
        }

        if (
            adData.tencoquanthue === ''
            || adData.tencoquanthue == null
            || adData.tencoquanthue == undefined
        ) {
            tencoquanthueErrors.tencoquanthueRequired = "Không được bỏ trống";
            isValid = false;
        }

        if (
            adData.sodienthoai === ''
            || adData.sodienthoai == null
            || adData.sodienthoai == undefined
        ) {
            sodienthoaiErrors.sodienthoaiRequired = "Không được bỏ trống";
            isValid = false;
        }
        setMstErrors(mstErrors);
        setTendoanhnghiepErrors(tendoanhnghiepErrors);
        setThudientuErrors(thudientuErrors);
        setTencoquanthueErrors(tencoquanthueErrors)
        setSodienthoaiErrors(sodienthoaiErrors)
        return isValid;
    }


    const updateField = (data, field) => {
        // check phone number
        function is_phonenumber(phonenumber) {
            var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
            if (phonenumber.match(phoneno)) {
                return true;
            }
            else {
                return false;
            }
        }
        // check email
        function validateEmail(email) {
            var reg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (email.match(reg)) {
                return true;
            } else {
                return false;
            }
        }

        switch (field) {
            case "mst":
                if (data.trim().length > 0 && data !== null) {
                    setMstErrors("");
                } else {
                    setMstErrors("Không được bỏ trống");
                }
                break;

            case "thudientu":
                if (validateEmail(data) && data !== null) {

                    setThudientuErrors("");
                } else {
                    setThudientuErrors("Vui lòng nhập đúng định dạng Email !");
                }
                break;

            case "tendoanhnghiep":
                if (data.trim().length > 0 && data !== null) {
                    setTendoanhnghiepErrors("");
                } else {
                    setTendoanhnghiepErrors("Không được bỏ trống");
                }
                break;

            case "sodienthoai":
                if (is_phonenumber(data) && data !== null) {
                    setSodienthoaiErrors("");
                } else {
                    setSodienthoaiErrors("không đúng định dạng");
                }
                break;

            case "tencoquanthue":
                if (data.trim().length > 0 && data !== null) {
                    setTencoquanthueErrors("");
                } else {
                    setTencoquanthueErrors("Không được bỏ trống");
                }
                break;

        }
        setAdData({
            ...adData,
            [field]: data,
        });
    };

    // get name upload file
    const onBasicUpload = (e) => {
        let fileName =
            e.target.files[0] === null || e.target.files[0] === undefined
                ? null
                : e.target.files[0];
        setFile(fileName);
    }

    async function handleOnYesDialog() {
        //convert object to json
        let jsonObj = JSON.stringify(adData);
        let data = new FormData();
        data.append("file", file);
        data.append("ttdn", jsonObj);
        let isValid = formValidation();
        if (isValid) {
            if (typeAd == 1) {
                // function save
                const result = await service.saveInfoBusiness(data);
                if (result && result.status === 1000) {
                    setTimeout(fetDataInfoBusiness, 1000); // đợi 0.5s sau mới gọi hàm fetData()
                    onHideDialog();
                    let message = result.message;
                    notifySuccess(message)
                } else {
                    let message = result.message;
                    notifyError(message)
                }
            } else {
                // function update
                const result = await service.updateInfoBusiness(adData.id, data)
                if (result && result.status === 1000) {
                    setTimeout(fetDataInfoBusiness, 500); // đợi 0.5s sau mới gọi hàm fetData()
                    onHideDialog();
                    let message = result.message;
                    notifySuccess(message)
                } else {
                    let message = result.message;
                    notifyError(message);
                }
            }
        }
    }


    const renderFooter = () => {
        return (
            <div>
                <Button
                    label="No"
                    icon="pi pi-times"
                    onClick={onHideDialog}
                    className="p-button-text"
                />
                <Button
                    label="Yes"
                    icon="pi pi-check"
                    onClick={handleOnYesDialog}
                    autoFocus
                />
            </div>
        );
    };

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <Dialog
                header="Khởi tạo doanh nghiệp"
                visible={visible}
                onHide={onHideDialog}
                footer={renderFooter} >
                <form onSubmit={handleOnYesDialog}>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label htmlFor="mst" >Mã số thuế</label>
                            <InputText id="mst"
                                // className
                                placeholder="Mã số thuế"
                                value={adData.mst || ""}
                                name="mst"
                                onChange={(e) => updateField(e.target.value, 'mst')}
                            />
                            {Object.keys(mstErrors).map((keyIndex, key) => {
                                return <span className="errorMessage" key={key} >{mstErrors[keyIndex]}</span>
                            })}
                        </div>
                        <div className="p-field p-col">
                            <label htmlFor="tendoanhnghiep">Tên doanh nghiệp</label>
                            <InputText id="tendoanhnghiep"
                                placeholder="Tên doanh nghiệp"
                                value={adData.tendoanhnghiep || ""}
                                name="tendoanhnghiep"
                                onChange={(e) => updateField(e.target.value, 'tendoanhnghiep')}
                            />
                            {Object.keys(tendoanhnghiepErrors).map((keyIndex, key) => {
                                return <span className="errorMessage" key={key} >{tendoanhnghiepErrors[keyIndex]}</span>
                            })}
                        </div>
                    </div>

                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label htmlFor="thudientu" >Thư điện tử</label>
                            <InputText id="thudientu"
                                placeholder="Thư điện tử"
                                value={adData.thudientu || ""}
                                onChange={(e) => updateField(e.target.value, 'thudientu')}
                                name="thudientu"
                            />
                            {Object.keys(thudientuErrors).map((keyIndex, key) => {
                                return <span className="errorMessage" key={key} >{thudientuErrors[keyIndex]}</span>
                            })}
                        </div>
                        <div className="p-field p-col">
                            <label htmlFor="tenthuongmai">Tên thương mại</label>
                            <InputText id="tenthuongmai"
                                placeholder="Tên thương mại"
                                name="tenthuongmai"
                                value={adData.tenthuongmai || ""}
                                onChange={(e) => updateField(e.target.value, 'tenthuongmai')} />
                        </div>
                    </div>

                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label htmlFor="fax" >Số Fax</label>
                            <InputText id="fax"
                                placeholder="Số Fax"
                                name="fax"
                                value={adData.fax || ""}
                                onChange={(e) => updateField(e.target.value, 'fax')}
                            />
                        </div>
                        <div className="p-field p-col">
                            <label htmlFor="diachi">Địa chỉ</label>
                            <InputText id="diachi"
                                placeholder="Địa chỉ"
                                name="diachi"
                                value={adData.diachi || ""}
                                onChange={(e) => updateField(e.target.value, 'diachi')}
                            />
                        </div>
                    </div>

                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label htmlFor="matinh" >Tỉnh/TP</label>
                            <InputText
                                id="matinh"
                                placeholder="Mã công ty"
                                name="matinh"
                                value={adData.matinh || ""}
                                onChange={(e) => updateField(e.target.value, 'matinh')}
                            />
                        </div>

                        <div className="p-field p-col">
                            <label htmlFor="lachinhanh" >Là chi nhánh</label>
                            <div className="p-formgroup-inline p-mr-2 p-as-center" style={{ marginTop: '10px' }}>
                                <div className="p-field-radiobutton">
                                    <RadioButton inputId="lachinhanh1" value={true}
                                        onChange={(e) => updateField(e.target.value, 'lachinhanh')} checked={adData.lachinhanh === true} />
                                    <label htmlFor="lachinhanh1" >Có</label>
                                </div>
                                <div className="p-field-radiobutton">
                                    <RadioButton inputId="lachinhanh2" value={false}
                                        onChange={(e) => updateField(e.target.value, 'lachinhanh')} checked={adData.lachinhanh === false} />
                                    <label htmlFor="lachinhanh2">Không</label>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col p-mb-2">
                            <label htmlFor="tennguoidaidien" >Tên cơ quan thuế</label>
                            <InputText id="tencoquanthue"
                                placeholder="Tên cơ quan thuế"
                                name="tencoquanthue"
                                value={adData.tencoquanthue || ""}
                                onChange={(e) => updateField(e.target.value, 'tencoquanthue')}
                            />
                            {Object.keys(tencoquanthueErrors).map((keyIndex, key) => {
                                return <span className="errorMessage" key={key} >{tencoquanthueErrors[keyIndex]}</span>
                            })}
                        </div>
                        <div className="p-field p-col">
                            <label htmlFor="logo" >Logo</label>
                            <InputText
                                id="logo"
                                type="file"
                                onChange={(e) => onBasicUpload(e)}
                                name="logo"
                            />
                        </div>
                    </div>

                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label htmlFor="tennguoidaidien" >Tên người đại diện</label>
                            <InputText id="tennguoidaidien"
                                placeholder="Tên người đại diện"
                                name="tennguoidaidien"
                                value={adData.tennguoidaidien || ""}
                                onChange={(e) => updateField(e.target.value, 'tennguoidaidien')}
                            />
                        </div>
                        <div className="p-field p-col">
                            <label htmlFor="linhvuckinhdoanh">Lĩnh vực kinh doanh </label>
                            <InputText id="linhvuckinhdoanh"
                                placeholder="Lĩnh vực kinh doanh"
                                name="linhvuckinhdoanh"
                                value={adData.linhvuckinhdoanh || ""}
                                onChange={(e) => updateField(e.target.value, 'linhvuckinhdoanh')}
                            />
                        </div>
                    </div>

                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label htmlFor="tennguoinopthue" >Tên người nộp thuế</label>
                            <InputText id="tennguoinopthue"
                                placeholder="Tên người nộp thuế"
                                name="tennguoinopthue"
                                value={adData.tennguoinopthue || ""}
                                onChange={(e) => updateField(e.target.value, 'tennguoinopthue')}
                            />
                        </div>
                        <div className="p-field p-col">
                            <label htmlFor="sodienthoai">Số điện thoại</label>
                            <InputText id="sodienthoai"
                                placeholder="Số điện thoại"
                                name="sodienthoai"
                                onChange={(e) => updateField(e.target.value, 'sodienthoai')}
                                value={adData.sodienthoai || ""} />
                            {Object.keys(sodienthoaiErrors).map((keyIndex, key) => {
                                return <span className="errorMessage" key={key} >{sodienthoaiErrors[keyIndex]}</span>
                            })}
                        </div>
                    </div>
                </form>
            </Dialog>
        </div>
    )
}
export default AddBusiness;
