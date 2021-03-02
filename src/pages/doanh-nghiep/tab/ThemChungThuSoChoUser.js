import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea';
import { Checkbox } from 'primereact/checkbox';
import React, { useState } from 'react';
import { Button } from 'primereact/button';
import '../tab-view.scss';
import ChungThuSoService from '../../../service/ChungThuSoService';
import { EXPRITIME_HIDER_LOADER, TIME_OUT_CLOSE_NOTIFY } from '../../../constants/ConstantString';
import { ToastContainer, toast } from "react-toastify";

function ThemChungThuSoChoUser() {
    const service = new ChungThuSoService();
    const [adData, setAdData] = useState({});
    const [checked, setChecked] = useState(false);
    const updateField = (data, field) => {
        setAdData({
            ...adData,
            [field]: data,
        });
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

    const save = async () => {
        const result = await service.addChungThuSo(adData);
        if (result && result.status === 1000) {
            setTimeout(null, EXPRITIME_HIDER_LOADER); // đợi 0.5s sau mới gọi hàm fetData()
            setAdData("")
            let message = result.message;
            notifySuccess(message)
        } else {
            let message = result.message;
            notifyError(message)
        }
    }

    return (
        <div className="ThemChungThuSoChoUser">
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
            <div className="centers" >
                <form>

                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label htmlFor="servicehost" >Service Host</label>
                            <InputText id="hostHsm"
                                placeholder="Service Host"
                                value={adData.hostHsm || ""}
                                name="hostHsm"

                                onChange={(e) => updateField(e.target.value, 'hostHsm')}
                            />
                        </div>
                    </div>

                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label htmlFor="apiKey">Tài khoản</label>
                            <InputText id="apiKey"
                                placeholder="Tài Khoản"
                                value={adData.apiKey || ""}
                                name="apiKey"
                                onChange={(e) => updateField(e.target.value, 'apiKey')}
                            />
                        </div>

                        <div className="p-field p-col">
                            <label htmlFor="passHsm" >Mật khẩu</label>
                            <InputText id="passHsm"
                                placeholder="Mật khẩu"
                                className="pi pi-search"
                                name="passHsm"
                                value={adData.passHsm || ""}
                                onChange={(e) => updateField(e.target.value, 'passHsm')} />
                        </div>
                    </div>

                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label htmlFor="chungThuSo" >Serial</label>
                            <InputText id="chungThuSo"
                                placeholder="Chứng thư số"

                                value={adData.chungThuSo || ""}
                                name="chungThuSo"

                                onChange={(e) => updateField(e.target.value, 'chungThuSo')}
                            />
                        </div>
                    </div>

                    <div className="p-fluid p-formgrid p-grid">

                        <div className="p-field p-col">
                            <label htmlFor="dnChungThuSo">Sở hữu</label>
                            <InputText id="dnChungThuSo"
                                placeholder="Doanh nghiệp chứng thư sô"

                                value={adData.dnChungThuSo || ""}
                                name="dnChungThuSo"

                                onChange={(e) => updateField(e.target.value, 'dnChungThuSo')}
                            />
                        </div>


                        <div className="p-field p-col">
                            <label htmlFor="nhaCungCap" >Nhà cung cấp</label>
                            <InputText id="nhaCungCap"

                                placeholder="Nhà cung cấp"
                                name="nhaCungCap"

                                value={adData.nhaCungCap || ""}
                                onChange={(e) => updateField(e.target.value, 'nhaCungCap')} />

                        </div>
                    </div>


                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label htmlFor="pkcs10">Dạng Base64</label>
                            <InputTextarea type="text" rows="4" id="pkcs10"

                                placeholder="Địa chỉ"
                                name="pkcs10"

                                value={adData.pkcs10 || ""}
                                onChange={(e) => updateField(e.target.value, 'pkcs10')}
                            />
                        </div>
                    </div>


                    <div className="p-fluid p-formgrid p-grid">

                        <div className="p-field p-col">
                            <label htmlFor="ngayBatDau">Ngày bắt đầu</label>
                            <InputText id="ngayBatDau"
                                placeholder="Ngày bắt đầu"

                                value={adData.ngayBatDau || ""}
                                name="tendoanhnghiep"

                                onChange={(e) => updateField(e.target.value, 'ngayBatDau')}
                            />
                        </div>

                        <div className="p-field p-col">
                            <label htmlFor="ngayKetThuc" >Ngày kết thúc</label>
                            <InputText id="ngayKetThuc"
                                placeholder="Ngày kết thúc"
                                name="ngayKetThuc"
                                value={adData.ngayKetThuc || ""}
                                onChange={(e) => updateField(e.target.value, 'ngayKetThuc')} />

                        </div>
                    </div>
                    <div className="p-field-checkbox">
                        <label htmlFor="trangThai">Hiệu lực:   </label>
                        <Checkbox inputId="trangThai" checked={checked} onChange={e => setChecked(e.checked)} />
                    </div>
                </form>
                <div className="p-mt-5 p-mb-5 buttonCenter">
                    <Button label="Hủy" className="p-mr-2 p-button-danger" />
                    <Button label="Lưu thông tin" className="p-mr-2" icon="pi pi-user" onClick={save}  />
                </div>
            </div>
        </div>
    )
}

export default ThemChungThuSoChoUser
