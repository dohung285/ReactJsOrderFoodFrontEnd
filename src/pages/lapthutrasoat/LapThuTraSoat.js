import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown'
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import React, { useState } from 'react'
import { MESSAGE_REQUIRE } from '../../constants/ConstantString';
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
    const [sotienTTKN, setSotienTTKN] = useState(null)


    const [tinhTPCQTNTSError, setTinhTPCQTNTSError] = useState({});
    const [coquanThueCQTNTSError, setCoquanThueCQTNTSError] = useState({})
    const [loaiTienError, setLoaiTienError] = useState({})
    const [soTienError, setSoTienError] = useState({})
    const [nopchoKBNNError, setNopchoKBNNError] = useState({})
    const [ngayNopThueError, setNgayNopThueError] = useState({})
    const [noidungSaiSotError, setNoidungSaiSotError] = useState({})
    const [noidungDieuChinhError, setNoidungDieuChinhError] = useState({})




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

    const validation = () => {
        // const [tinhTPCQTNTSError, setTinhTPCQTNTSError] = useState({});
        // const [coquanThueCQTNTSError, setCoquanThueCQTNTSError] = useState({})
        // const [loaiTienError, setLoaiTienError] = useState({})
        // const [soTienError, setSoTienError] = useState({})
        // const [nopchoKBNNError, setNopchoKBNNError] = useState({})
        // const [ngayNopThueError, setNgayNopThueError] = useState({})
        // const [noidungSaiSotError, setNoidungSaiSotError] = useState({})
        // const [noidungDieuChinhError, setNoidungDieuChinhError] = useState({})


        const tinhTPObjectError = {}
        const coquanThueObjectError = {}
        const nopchoKBNNObjectError = {}
        const ngaynopThueObjectError = {}
        const noidungSaiSotObjectError = {}
        const noidungDieuChinhObjectError = {}
        const sotienObjectError = {}




        let isValid = true;

        if (tinhThanhCQTNTS === '' || tinhThanhCQTNTS === null) {
            tinhTPObjectError.required = MESSAGE_REQUIRE;
            isValid = false;
        }

        if (coquanthueCQTNTS === '' || coquanthueCQTNTS === null) {
            coquanThueObjectError.required = MESSAGE_REQUIRE;
            isValid = false;
        }
        if (nopChoKBNN === '' || nopChoKBNN === null) {
            nopchoKBNNObjectError.required = MESSAGE_REQUIRE;
            isValid = false;
        }
        if (dateNNT === '' || dateNNT === null) {
            ngaynopThueObjectError.required = MESSAGE_REQUIRE;
            isValid = false;
        }
        if (noidungSaiSot === '' || noidungSaiSot === null) {
            noidungSaiSotObjectError.required = MESSAGE_REQUIRE;
            isValid = false;
        }
        if (noidungDieuChinh === '' || noidungDieuChinh === null) {
            noidungDieuChinhObjectError.required = MESSAGE_REQUIRE;
            isValid = false;
        }

        if (sotienTTKN === '' || sotienTTKN === null) {
            sotienObjectError.required = MESSAGE_REQUIRE;
            isValid = false;
        }


        // setTinhTpError();
        setTinhTPCQTNTSError(tinhTPObjectError);
        setCoquanThueCQTNTSError(coquanThueObjectError)
        setNopchoKBNNError(nopchoKBNNObjectError)
        setNgayNopThueError(ngaynopThueObjectError)
        setNoidungSaiSotError(noidungSaiSotObjectError)
        setNoidungDieuChinhError(noidungDieuChinhObjectError)
        setSoTienError(sotienObjectError)





        return isValid;
    }

    const processHoanThanh = () => {
        alert('ok')
        console.log('result:', validation())
    }

    const handleOnChange = (e) => {
        // console.log('e', e)
        const { name, value } = e.target;
        // console.log('name', name)
        // console.log('value', value)
        let valueName = value.name;

        switch (name) {
            case "tinhThanhCQTNTS":
                // debugger
                setTinhThanhCQTNTS(value)
                if (value.name.length > 0) {
                    setTinhTPCQTNTSError("")
                } else {
                    setTinhTPCQTNTSError(MESSAGE_REQUIRE)
                }
                break;
            case "coquanthueCQTNTS":
                setCoquanthueCQTNTS(value)
                if (value.name.length > 0) {
                    setCoquanThueCQTNTSError("")
                } else {
                    setCoquanThueCQTNTSError(MESSAGE_REQUIRE)
                }
                break;
            case "denghiNganHang":
                setDenghiNganHang(value)
                break;
            case "trichTKso":
                setTrichTKso(value)
                break;

            case "nopChoKBNN":
                // console.log('ok')
                setNopChoKBNN(value)
                if (value.name.length > 0) {
                    setNopchoKBNNError("")
                } else {
                    setNopchoKBNNError(MESSAGE_REQUIRE)
                }
                break;

            case "nganHangUNT":
                setNganHangUNT(value)
                break;

            case "ngayNopThue":
                // debugger
                setDateNNT(value)
                if (value.length > 0) {
                    setNgayNopThueError("")
                } else {
                    setNgayNopThueError(MESSAGE_REQUIRE)
                }
                break;

            case "noidungSaiSot":
                // console.log('ok')
                setNoidungSaiSot(value)
                if (value.length > 0) {
                    setNoidungSaiSotError("")
                } else {
                    setNoidungSaiSotError(MESSAGE_REQUIRE)
                }
                break;
            case "noiDungDieuChinh":
                setNoidungDieuChinh(value)
                if (value.length > 0) {
                    setNoidungDieuChinhError("")
                } else {
                    setNoidungDieuChinhError(MESSAGE_REQUIRE)
                }
                break;

            case "sotien":
                setSotienTTKN(value)
                if (value.length > 0) {
                    setSoTienError("")
                } else {
                    setSoTienError(MESSAGE_REQUIRE)
                }
                break;



            default:
                break;
        }



    }






    return (
        <div className="card">
            <div className="card-body">
                <h1>Lập thư tra soát</h1>


                <fieldset>
                    <legend>Thông tin người lập tra soát </legend>
                    <div>MST<span className="item-required">*</span></div>
                    <div>Tên người nộp thuế<span className="item-required">*</span></div>
                    <div>Địa chỉ</div>
                </fieldset>



                <fieldset >
                    <legend>Cơ quan tiếp nhận tra soát </legend>
                    <div className="p-grid">
                        <div className="p-col-6">
                            <div className="p-field p-grid">
                                <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Tỉnh/TP <span className="item-required">*</span> </label>
                                <div className="p-col">
                                    <Dropdown
                                        className={Object.keys(tinhTPCQTNTSError).length > 0 ? "error" : null}
                                        value={tinhThanhCQTNTS}
                                        options={cities}
                                        name="tinhThanhCQTNTS"
                                        // onChange={e => setTinhThanhCQTNTS(e.value)}
                                        onChange={handleOnChange}
                                        optionLabel="name"
                                        placeholder="Chọn tỉnh thành phố"
                                        style={{ width: '219px' }}
                                    />
                                </div>
                            </div>
                            {Object.keys(tinhTPCQTNTSError).map((keyIndex, key) => {
                                return <span className="errorMessage" key={key} >{tinhTPCQTNTSError[keyIndex]}</span>
                            })}
                        </div>
                        <div className="p-col-6">
                            <div className="p-field p-grid">
                                <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Cơ quan thuế <span className="item-required">*</span> </label>
                                <div className="p-col">
                                    <Dropdown
                                        className={Object.keys(coquanThueCQTNTSError).length > 0 ? "error" : null}
                                        value={coquanthueCQTNTS}
                                        name="coquanthueCQTNTS"
                                        options={cqt}
                                        onChange={handleOnChange}
                                        // onChange={e => setCoquanthueCQTNTS(e.value)}
                                        optionLabel="name"
                                        placeholder="Chọn cơ quan thuế"
                                        style={{ width: '219px' }} />
                                </div>
                            </div>
                            {Object.keys(coquanThueCQTNTSError).map((keyIndex, key) => {
                                return <span className="errorMessage" key={key} >{coquanThueCQTNTSError[keyIndex]}</span>
                            })}
                        </div>
                    </div>
                </fieldset>


                <fieldset>
                    <legend>Nộp NSNN bằng hình thức </legend>
                    <div className="p-grid nested-grid">

                        <div className="p-col-3">
                            Loại tiền<span className="item-required">*</span>
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
                                    <InputText id="sogiaynoptien" name="sogiaynoptien" type="text" onChange={handleOnChange} />
                                </div>
                            </div>
                        </div>


                        <div className="p-col-6">
                            <div className="p-field p-grid">
                                <label htmlFor="magiaodich" className="p-col-fixed" style={{ width: '200px' }}>Mã giao dịch</label>
                                <div className="p-col">
                                    <InputText id="magiaodich" type="text" name="magiaodich" onChange={handleOnChange} />
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
                                    <Dropdown
                                        value={denghiNganHang}
                                        name="denghiNganHang"
                                        options={denghinganhangs}
                                        // onChange={e => setDenghiNganHang(e.value)} 
                                        onChange={handleOnChange}
                                        optionLabel="name"
                                        placeholder="Chọn ngân hàng"
                                        style={{ width: '219px' }}
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="p-col-6">
                            <div className="p-field p-grid">
                                <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Trích TK số</label>
                                <div className="p-col">
                                    <Dropdown
                                        value={trichTKso}
                                        name="trichTKso"
                                        options={trichTKsos}
                                        onChange={e => setTrichTKso(e.value)}
                                        optionLabel="name"
                                        placeholder="Trích TK số"
                                        style={{ width: '219px' }}
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="p-col-6">
                            <div className="p-field p-grid">
                                <label htmlFor="sotien" className="p-col-fixed" style={{ width: '200px' }}>Số tiền <span className="item-required">*</span> </label>
                                <div className="p-col">
                                    <InputText
                                        className={Object.keys(soTienError).length > 0 ? "error" : null}
                                        id="sotien"
                                        type="text"
                                        name="sotien"
                                        value={sotienTTKN === null ? '' : sotienTTKN}
                                        onChange={handleOnChange}
                                    />
                                </div>
                            </div>
                            {Object.keys(soTienError).map((keyIndex, key) => {
                                return <span className="errorMessage" key={key} >{soTienError[keyIndex]}</span>
                            })}
                        </div>

                    </div>
                </fieldset>


                <fieldset>
                    <legend>Thông tin KBNN </legend>
                    <div className="p-grid ">

                        <div className="p-col-4">
                            <div className="p-field p-grid">
                                <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Nộp cho KBNN <span className="item-required">*</span> </label>
                                <div className="p-col">
                                    <Dropdown
                                        className={Object.keys(nopchoKBNNError).length > 0 ? "error" : null}
                                        value={nopChoKBNN}
                                        name="nopChoKBNN"
                                        options={nopChoKBNNs}
                                        // onChange={e => setNopChoKBNN(e.value)}
                                        onChange={handleOnChange}
                                        optionLabel="name"
                                        placeholder="Nộp cho KBNN"
                                        style={{ width: '219px' }}
                                    />
                                </div>
                            </div>
                            {Object.keys(nopchoKBNNError).map((keyIndex, key) => {
                                return <span className="errorMessage" key={key} >{nopchoKBNNError[keyIndex]}</span>
                            })}
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
                                    <Dropdown
                                        value={nganHangUNT}
                                        name="nganHangUNT"
                                        options={nganhangUNTs}
                                        // onChange={e => setNganHangUNT(e.value)}
                                        onChange={handleOnChange}
                                        optionLabel="name"
                                        placeholder="Ngân hàng UNT"
                                        style={{ width: '219px' }}
                                    />
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
                                <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Ngày nộp thuế <span className="item-required">*</span> </label>
                                <div className="p-col">
                                    <Calendar
                                        className={Object.keys(ngayNopThueError).length > 0 ? "error" : null}
                                        id="time24"
                                        name="ngayNopThue"
                                        value={dateNNT}
                                        // onChange={(e) => setDateNNT(e.value)}
                                        onChange={handleOnChange}
                                        showTime showSeconds showIcon
                                    />
                                </div>
                            </div>
                            {Object.keys(ngayNopThueError).map((keyIndex, key) => {
                                return <span className="errorMessage" key={key} >{ngayNopThueError[keyIndex]}</span>
                            })}
                        </div>

                        <div className="p-col-12">
                            <div className="p-field p-grid">
                                <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Nội dung sai sót <span className="item-required">*</span> </label>
                                <div className="p-col">
                                    <InputTextarea
                                        className={Object.keys(noidungSaiSotError).length > 0 ? "error" : null}
                                        rows={2} cols={100} value={noidungSaiSot === null ? "" : noidungSaiSot}
                                        // onChange={(event) => setNoidungSaiSot(event.target.value)}
                                        onChange={handleOnChange}
                                        autoResize
                                        name="noidungSaiSot"
                                    />
                                </div>
                            </div>
                            {Object.keys(noidungSaiSotError).map((keyIndex, key) => {
                                return <span className="errorMessage" key={key} >{noidungSaiSotError[keyIndex]}</span>
                            })}
                        </div>

                        <div className="p-col-12">
                            <div className="p-field p-grid">
                                <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Nội dung điều chỉnh <span className="item-required">*</span> </label>
                                <div className="p-col">
                                    <InputTextarea
                                        className={Object.keys(noidungDieuChinhError).length > 0 ? "error" : null}
                                        rows={2} cols={100} value={noidungDieuChinh === null ? "" : noidungDieuChinh}
                                        // onChange={(event) => setNoidungDieuChinh(event.target.value)}
                                        name="noiDungDieuChinh"
                                        onChange={handleOnChange}
                                        autoResize

                                    />
                                </div>
                            </div>
                            {Object.keys(noidungDieuChinhError).map((keyIndex, key) => {
                                return <span className="errorMessage" key={key} >{noidungDieuChinhError[keyIndex]}</span>
                            })}
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
                                    <InputText id="sogiaynoptien" type="text" name="sogiaynoptien" onChange={handleOnChange} />
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
                            <Button label="Hoàn thành" onClick={processHoanThanh} />
                        </div>
                    </div>
                </fieldset>

















            </div>
        </div>
    )
}

export default LapThuTraSoat
