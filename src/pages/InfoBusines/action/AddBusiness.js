import { Button } from 'primereact/button';
import React, { useRef, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext'
import InfoBusinessService from '../../../service/InfoBusinessService';
import { RadioButton } from 'primereact/radiobutton';
import { FileUpload } from 'primereact/fileupload';
import { useForm } from "react-hook-form";
const AddBusiness = (props) => {
    const { register, handleSubmit, errors } = useForm();
    const {
        visible, onHideDialog, errData, setErrdata, dataInfoBusiness, typeAd,
        adData, setAdData
    } = props;
    const [file,setFile] = useState(null)
    const [mstErrors, setMstErrors] = useState({})
    const [thudientuErrors, setThudientuErrors] = useState({})
    const [tendoanhnghiepErrors, setTendoanhnghiepErrors] = useState({})
    const [logoErrors, setLogoErrors] = useState({})
    const service = new InfoBusinessService();
    const toast = useRef(null);


    const formValidation = () => {
        // debugger
        const mstErrors = {}
        const thudientuErrors = {}
        const tendoanhnghiepErrors = {}
        const logoErrors = {}

        let isValid = true;

        if (adData.mst === '') {
            mstErrors.hotenRequired = "Không được bỏ trống";
            isValid = false;
        }

        if (adData.thudientu === '') {
            thudientuErrors.hotenRequired = "Không được bỏ trống";
            isValid = false;
        }
        //=====================

        if (adData.tendoanhnghiep === '') {
            tendoanhnghiepErrors.hotenRequired = "Không được bỏ trống";
            isValid = false;
        }

        if (adData.logo === '') {
            logoErrors.hotenRequired = "Không được bỏ trống";
            isValid = false;
        }

        return isValid;
    }


    const updateField = (data, field) => {
        setAdData({
            ...adData,
            [field]: data,
        });

    };

    const onBasicUpload = (e) => {
        let fileName =
            e.target.files[0] === null || e.target.files[0] === undefined
                ? null
                : e.target.files[0];
                setFile(fileName);
    }


    const showSuccess = (message) => {
        toast.current.show({
            severity: "success",
            summary: "Success Message",
            detail: message,
            life: 3000,
        });
    };

    const showError = (message) => {
        toast.current.show({
            severity: "error",
            summary: "Error Message",
            detail: message,
            life: 3000,
        });
    };


    onchange = (e) => {
        let field = e.target.name;
        let data = e.target.value;
        console.log(data)
        setAdData({
            ...adData,
            [field]: data
        })
    }

    async function handleOnYesDialog() {
        debugger
        let jsonObj = JSON.stringify(adData);
        let data = new FormData();
        data.append("file", file);
        data.append("ttdn", jsonObj);
        let isValid = formValidation();
        if (isValid) {
            if (typeAd == 1) {
                console.log(data.ttdn)
                const result = await service.saveInfoBusiness(data);
                if (result && result.status === 1000) {
                    let message = result.message;
                    setTimeout(dataInfoBusiness, 500); // đợi 0.5s sau mới gọi hàm fetData()
                    onHideDialog();
                } else {
                    let message = result.message;
                    console.log(message)
                    showError(message);
                }
            } else {
                const result = await service.updateInfoBusiness(adData.id, data)
                if (result && result.status === 1000) {
                    let message = result.message;
                    setTimeout(dataInfoBusiness, 500); // đợi 0.5s sau mới gọi hàm fetData()
                    onHideDialog();
                } else {
                    let message = result.message;
                    showError(message);
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
                    // onClick={onHideDialog}
                    onClick={onHideDialog}
                    className="p-button-text"
                />
                <Button
                    label="Yes"
                    icon="pi pi-check"
                    // onClick={() => onHide(name)}
                    onClick={handleOnYesDialog}
                    autoFocus
                />
            </div>
        );
    };

    return (
        <div>
            <Dialog
                header="Khởi tạo doanh nghiệp"
                visible={visible}
                onHide={onHideDialog}
                footer={renderFooter} >
                <form onSubmit={handleSubmit(handleOnYesDialog)}>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label htmlFor="mst" >Mã số thuế</label>
                            <InputText id="mst"
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
                        </div>
                    </div>
                </form>
            </Dialog>
        </div>
    )
}
export default AddBusiness;
