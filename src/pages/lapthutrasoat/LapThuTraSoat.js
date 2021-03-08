import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown'
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import React, { useState } from 'react'
import "./LapThuTraSoat.css"

const LapThuTraSoat = () => {


    // const [selectedCity, setSelectedCity] = useState(null);

    //Cơ quan tiếp nhận tra soát

    const [tinhThanhCQTNTS, setTinhThanhCQTNTS] = useState(null)
    const [coquanthueCQTNTS, setCoquanthueCQTNTS] = useState(null)
    const [noidungSaiSot, setNoidungSaiSot] = useState(null)
    const [noidungDieuChinh, setNoidungDieuChinh] = useState(null)
    const [radioThongTinKBNN, setRadioThongTinKBNN] = useState(null)
    const [radioNopNSNNBangHT, setRadioNopNSNNBangHT] = useState(null)
    const [denghiNganHang, setDenghiNganHang] = useState(null)
    const [trichTKso, setTrichTKso] = useState(null)
    const [nopChoKBNN, setNopChoKBNN] = useState(null)
    const [nganHangUNT, setNganHangUNT] = useState(null)


    const [city, setCity] = useState(null);




    const [dateNNT, setDateNNT] = useState(null);



    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    const cqt = [
        { name: 'Cơ quan thuế tỉnh Mã Pì Lèng', code: 'NY' },
        { name: 'Cơ quan thuế tỉnh Cao Bằng', code: 'RM' },
        { name: 'Cơ quan thuế tỉnh Bắc Kan', code: 'LDN' },
    ];

    const denghinganhangs = [
        { name: 'Đề nghị ngân hàng A', code: 'NY' },
        { name: 'Đề nghị ngân hàng B', code: 'RM' },
        { name: 'Đề nghị ngân hàng C', code: 'LDN' },
    ];

    const trichTKsos = [
        { name: 'Trích TK số X', code: 'NY' },
        { name: 'Trích TK số Y', code: 'RM' },
        { name: 'Trích TK số Z', code: 'LDN' },
    ];

    const nopChoKBNNs = [
        { name: 'Kho bạc nhà nước X', code: 'NY' },
        { name: 'Kho bạc nhà nước Y', code: 'RM' },
        { name: 'Kho bạc nhà nước Z', code: 'LDN' },
    ];

    const nganhangUNTs = [
        { name: 'Ngân hàng UNT X', code: 'NY' },
        { name: 'Ngân hàng UNT Y', code: 'RM' },
        { name: 'Ngân hàng UNT Z', code: 'LDN' },
    ];





    return (
        <div className="card">
            <div className="card-body">
                <h1>Lập thư tra soát</h1>


                <fieldset>
                    <legend>Thông tin người lập tra soát </legend>
                    <div>MST</div>
                    <div>Tên người nộp thuế</div>
                    <div>Địa chỉ</div>
                </fieldset>



                <fieldset >
                    <legend>Cơ quan tiếp nhận tra soát </legend>
                    <div className="p-grid">
                        <div className="p-col-6">
                            <div className="p-field p-grid">
                                <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Tỉnh/TP</label>
                                <div className="p-col">
                                    <Dropdown value={tinhThanhCQTNTS} options={cities} onChange={e => setTinhThanhCQTNTS(e.value)} optionLabel="name" placeholder="Chọn tỉnh thành phố" style={{ width: '219px' }} />
                                </div>
                            </div>
                        </div>
                        <div className="p-col-6">
                            <div className="p-field p-grid">
                                <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Cơ quan thuế</label>
                                <div className="p-col">
                                    <Dropdown value={coquanthueCQTNTS} options={cqt} onChange={e => setCoquanthueCQTNTS(e.value)} optionLabel="name" placeholder="Chọn cơ quan thuế" style={{ width: '219px' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </fieldset>


                <fieldset>
                    <legend>Nộp NSNN bằng hình thức </legend>
                    <div className="p-grid nested-grid">

                        <div className="p-col-3">
                            Loại tiền
                        </div>

                        <div className="p-col-9">

                            <div className="p-grid">
                                <div className="p-col-3">
                                    <div className="p-field-radiobutton">
                                        <RadioButton inputId="tienmat" name="radioNopNSNNBangHT" value="tienmat" onChange={(e) => setRadioNopNSNNBangHT(e.value)} checked={radioNopNSNNBangHT === 'tienmat'} />
                                        <label htmlFor="tienmat">Tiền mặt</label>
                                    </div>
                                </div>

                                <div className="p-col-3">
                                    <div className="p-field-radiobutton">
                                        <RadioButton inputId="chuyenkhoan" name="radioNopNSNNBangHT" value="chuyenkhoan" onChange={(e) => setRadioNopNSNNBangHT(e.value)} checked={radioNopNSNNBangHT === 'chuyenkhoan'} />
                                        <label htmlFor="chuyenkhoan">Chuyển khoản</label>
                                    </div>
                                </div>

                                <div className="p-col-3">
                                    <div className="p-field-radiobutton">
                                        <RadioButton inputId="nopthuedientu" name="radioNopNSNNBangHT" value="nopthuedientu" onChange={(e) => setRadioNopNSNNBangHT(e.value)} checked={radioNopNSNNBangHT === 'nopthuedientu'} />
                                        <label htmlFor="nopthuedientu">Nộp thuế điện tử</label>
                                    </div>
                                </div>
                            </div>


                            <div className="p-grid">
                                <div className="p-col-3">
                                    <div className="p-field-radiobutton">
                                        <RadioButton inputId="VND" name="city" value="VND" onChange={(e) => setCity(e.value)} checked={city === 'VND'} />
                                        <label htmlFor="VND">VND</label>
                                    </div>
                                </div>
                                <div className="p-col-3">
                                    <div className="p-field-radiobutton">
                                        <RadioButton inputId="USD" name="city" value="USD" onChange={(e) => setCity(e.value)} checked={city === 'USD'} />
                                        <label htmlFor="USD">USD</label>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </fieldset>



                <fieldset>
                    <legend>Thông tin giấy nộp tiền </legend>
                    <div className="p-grid ">
                        <div className="p-col-6">
                            <div className="p-field p-grid">
                                <label htmlFor="sogiaynoptien" className="p-col-fixed" style={{ width: '200px' }}>Số giấy nộp tiền</label>
                                <div className="p-col">
                                    <InputText id="sogiaynoptien" type="text" />
                                </div>
                            </div>
                        </div>


                        <div className="p-col-6">
                            <div className="p-field p-grid">
                                <label htmlFor="magiaodich" className="p-col-fixed" style={{ width: '200px' }}>Mã giao dịch</label>
                                <div className="p-col">
                                    <InputText id="magiaodich" type="text" />
                                </div>
                            </div>
                        </div>


                        <div className="p-col-6">
                            <div className="p-field p-grid">
                                <Button label="Tìm giấy nộp tiền" />
                            </div>
                        </div>

                    </div>
                </fieldset>


                <fieldset>
                    <legend>Thông tin khoản nộp </legend>
                    <div className="p-grid ">
                        <div className="p-col-6">
                            <div className="p-field p-grid">
                                <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Đề nghị ngân hàng</label>
                                <div className="p-col">
                                    <Dropdown value={denghiNganHang} options={denghinganhangs} onChange={e => setDenghiNganHang(e.value)} optionLabel="name" placeholder="Chọn ngân hàng" style={{ width: '219px' }} />
                                </div>
                            </div>
                        </div>


                        <div className="p-col-6">
                            <div className="p-field p-grid">
                                <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Trích TK số</label>
                                <div className="p-col">
                                    <Dropdown value={trichTKso} options={trichTKsos} onChange={e => setTrichTKso(e.value)} optionLabel="name" placeholder="Trích TK số" style={{ width: '219px' }} />
                                </div>
                            </div>
                        </div>


                        <div className="p-col-6">
                            <div className="p-field p-grid">
                                <label htmlFor="sotien" className="p-col-fixed" style={{ width: '200px' }}>Số tiền</label>
                                <div className="p-col">
                                    <InputText id="sotien" type="text" />
                                </div>
                            </div>
                        </div>

                    </div>
                </fieldset>


                <fieldset>
                    <legend>Thông tin KBNN </legend>
                    <div className="p-grid ">

                        <div className="p-col-4">
                            <div className="p-field p-grid">
                                <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Nộp cho KBNN</label>
                                <div className="p-col">
                                    <Dropdown value={nopChoKBNN} options={nopChoKBNNs} onChange={e => setNopChoKBNN(e.value)} optionLabel="name" placeholder="Nộp cho KBNN" style={{ width: '219px' }} />
                                </div>
                            </div>
                        </div>


                        <div className="p-col-4">
                            <div className="p-field-radiobutton">
                                <RadioButton inputId="VND" name="radioThongTinKBNN" value="VND" onChange={(e) => setRadioThongTinKBNN(e.value)} checked={radioThongTinKBNN === 'VND'} />
                                <label htmlFor="VND">VND</label>
                            </div>
                        </div>

                        <div className="p-col-4">
                            <div className="p-field-radiobutton">
                                <RadioButton inputId="USD" name="citradioThongTinKBNNy" value="USD" onChange={(e) => setRadioThongTinKBNN(e.value)} checked={radioThongTinKBNN === 'USD'} />
                                <label htmlFor="USD">USD</label>
                            </div>
                        </div>

                        <div className="p-col-4">
                            <div className="p-field p-grid">
                                <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Ngân hàng UNT</label>
                                <div className="p-col">
                                    <Dropdown value={nganHangUNT} options={nganhangUNTs} onChange={e => setNganHangUNT(e.value)} optionLabel="name" placeholder="Ngân hàng UNT" style={{ width: '219px' }} />
                                </div>
                            </div>
                        </div>

                    </div>
                </fieldset>


                <fieldset>
                    <legend>Nội dung tra soát</legend>
                    <div className="p-grid ">


                        <div className="p-col-12">
                            <div className="p-field p-grid">
                                <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Ngày nộp thuế</label>
                                <div className="p-col">
                                    <Calendar id="time24" value={dateNNT} onChange={(e) => setDateNNT(e.value)} showTime showSeconds showIcon />
                                </div>
                            </div>
                        </div>

                        <div className="p-col-12">
                            <div className="p-field p-grid">
                                <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Nội dung sai sót</label>
                                <div className="p-col">
                                    <InputTextarea rows={2} cols={100} value={noidungSaiSot === null ? "":noidungSaiSot} onChange={(event) => setNoidungSaiSot(event.target.value)} autoResize />
                                </div>
                            </div>
                        </div>

                        <div className="p-col-12">
                            <div className="p-field p-grid">
                                <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Nội dung điều chỉnh</label>
                                <div className="p-col">
                                    <InputTextarea rows={2} cols={100} value={noidungDieuChinh === null ? "":noidungDieuChinh} onChange={(event) => setNoidungDieuChinh(event.target.value)} autoResize />
                                </div>
                            </div>
                        </div>

                    </div>
                </fieldset>



                <fieldset>
                    <legend>Thông tin chứng từ đính kèm</legend>
                    <div className="p-grid ">


                        <div className="p-col-4">
                            <div className="p-field p-grid">
                                <label htmlFor="sogiaynoptien" className="p-col-fixed" style={{ width: '200px' }}>Số giấy nộp tiền</label>
                                <div className="p-col">
                                    <InputText id="sogiaynoptien" type="text" />
                                </div>
                            </div>
                        </div>

                        <div className="p-col-4">
                            <FileUpload mode="basic" name="demo[]" url="./upload.php" accept="image/*" maxFileSize={1000000}
                                chooseLabel="Chọn chứng từ"
                            // onUpload={onBasicUpload} 
                            />
                        </div>

                        <div className="p-col-4">
                            <div className="p-field p-grid">
                                <label htmlFor="sochungtu" className="p-col-fixed" style={{ width: '200px' }}>Số chứng từ</label>
                                <div className="p-col">
                                    <InputText id="sochungtu" type="text" />
                                </div>
                            </div>
                        </div>

                    </div>
                </fieldset>

                <fieldset>
                    <legend>Hành động</legend>
                    <div className="p-grid">


                        <div className="p-col-6">
                            <Button label="Lập mới" />
                        </div>

                        <div className="p-col-6">
                            <Button label="Hoàn thành" />
                        </div>
                    </div>
                </fieldset>

















            </div>
        </div>
    )
}

export default LapThuTraSoat
