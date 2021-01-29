import { Button } from 'primereact/button';
import React, {useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext'
import InfoBusinessService from '../../../service/InfoBusinessService';
import { RadioButton } from 'primereact/radiobutton';
import { FileUpload } from 'primereact/fileupload';
const AddBusiness = (props) => {

    const {
        visible, onHideDialog, errData, setErrdata, fetDataInfoBusiness, typeAd,
        adData, setAdData
    } = props;
    const service = new InfoBusinessService();
    const toast = useRef(null);
    const updateField = (data, field) => {
        setAdData({
            ...adData,
            [field]: data,
        });

    };
    const onBasicUpload = (e) => {
const fileName =  e.files[0].name 
setAdData({
    ...adData,
    logo: fileName,
});
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
    const onBasicUploadAuto = () => {
        toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode'});
    }


    async function handleOnYesDialog() {
        debugger
        if (typeAd == 1) {
            console.log(adData)
            const result = await service.saveInfoBusiness(adData);
            if (result && result.status === 1000) {
                // console.log("result save: ", result);
                let message = result.message;
                setTimeout(fetDataInfoBusiness, 500); // đợi 0.5s sau mới gọi hàm fetData()
                onHideDialog();
            } else {
                let message = result.message;
                console.log(message)
                showError(message);
            }
        } else {
            console.log(adData)
            const result = await service.updateInfoBusiness(adData.id, adData)
            if (result && result.status === 1000) {
                // console.log("result save: ", result);
                let message = result.message;
                setTimeout(fetDataInfoBusiness, 500); // đợi 0.5s sau mới gọi hàm fetData()
                onHideDialog();
            } else {
                let message = result.message;
                showError(message);
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
                <form onSubmit={handleOnYesDialog}>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label htmlFor="mst" >Mã số thuế</label>
                            <InputText id="mst"
                                placeholder="Mã số thuế"
                                value={adData.mst || ""}
                                name="mst"
                                onChange={(e) => updateField(e.target.value, 'mst')}
                            />
                        </div>
                        <div className="p-field p-col">
                            <label htmlFor="tendoanhnghiep">Tên doanh nghiệp</label>
                            <InputText id="tendoanhnghiep"
                                placeholder="Tên doanh nghiệp"
                                value={adData.tendoanhnghiep || ""}
                                name="tendoanhnghiep"
                                onChange={(e) => updateField(e.target.value, 'tendoanhnghiep')}
                            />
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
                        <div className="p-formgroup-inline p-mr-2 p-as-center">
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
                        <FileUpload mode="basic" type="file"
                        name="logo[]"
                        accept="image/*"
                        customUpload uploadHandler={onBasicUpload}
                        onUpload={onBasicUploadAuto}
                        // onChange={(e) => updateField(e.target.value, 'logo')}
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
