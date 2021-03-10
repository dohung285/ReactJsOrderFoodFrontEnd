import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Row } from 'primereact/row';
import React, { useRef, useState } from 'react'
import { Toast } from 'primereact/toast';
import { v4 } from 'uuid';
import { MESSAGE_REQUIRE } from '../../constants/ConstantString';
import Moment from 'react-moment';

const LapGiayNopTienThay = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const toast = useRef(null);
    const [selectedStep, setSelectedStep] = useState(null);
    const [selectedBank, setSelectedBank] = useState(null);


    const [disableSelectBank, setDisableSelectBank] = useState(false);


    const [ttnpst, setTtnpst] = useState(null); //Thông tin nơi phát sinh khoản thu
    const [radioTTKB, setRadioTTKB] = useState(null); // Thông tin kho bạc
    const [radioNTVBCQCTQ, setRadioNTVBCQCTQ] = useState(null); //Nộp theo văn bản cơ quan có thẩm quyền
    const [radioLoaiTien, setRadioLoaiTien] = useState(null)



    const [trichTKso, setTrichTKso] = useState(null)
    const [tinhTp, setTinhTp] = useState(null)
    const [coquanQLthu, setCoquanQLthu] = useState(null)
    const [quanHuyen, setQuanHuyen] = useState(null)
    const [xaPhuong, setXaPhuong] = useState(null)
    const [chuyenChoKBNN, setChuyenChoKBNN] = useState(null)
    const [nganHangUNT, setNganHangUNT] = useState(null)
    const [loaiThue, setLoaiThue] = useState(null)

    const [disableQuanHuyenXaPhuong, setDisableQuanHuyenXaPhuong] = useState(false)
    const [disableXaPhuong, setDisableXaPhuong] = useState(false)


    const [trichTKSoErro, setTrichTKSoErro] = useState({});
    const [tinhTpCQQLTError, setTinhTpCQQLTError] = useState({});
    const [coquanQLTError, setCoquanQLTError] = useState({});

    const [quanHuyenTTNPSKTError, setQuanHuyenTTNPSKTError] = useState({})
    const [xaPhuongTTNPSKTError, setXaPhuongTTNPSKTError] = useState({})

    const [chuyenChoKBNNError, setChuyenChoKBNNError] = useState({})
    const [loaiThueError, setLoaiThueError] = useState({})
    const [loaiTienError, setLoaiTienError] = useState({})


    let currentDate = new Date();







    const items = [
        {
            label: 'Chọn ngân hàng nộp thuế',
            command: (event) => {
                toast.current.show({
                    severity: 'info',
                    summary: 'First Step',
                    detail: event.item.label,
                });
            },
        },
        {
            label: 'Lập giấy nộp tiền',
            command: (event) => {
                toast.current.show({
                    severity: 'info',
                    summary: 'Seat Selection',
                    detail: event.item.label,
                });
            },
        },
    ];

    const banks = [
        { name: 'BIDV', code: 'BIDV' },
        { name: 'Agribank', code: 'BIDV' },
        { name: 'TP', code: 'LDN' },
        { name: 'MB', code: 'IST' },
        { name: 'TechCombank', code: 'PRS' },
    ];


    const trichTKsos = [
        { name: 'Trích số TK A', code: 'A' },
        { name: 'Trích số TK B', code: 'B' },
        { name: 'Trích số tK C', code: 'C' },
    ];

    const tinhTPs = [
        { name: 'Thành phố A', code: 'A' },
        { name: 'Thành phố B', code: 'B' },
        { name: 'Thành phố C', code: 'C' },
    ];

    const coQuanQuanLyThus = [
        { name: 'Cơ quan quản lý thu A', code: 'A' },
        { name: 'Cơ quan quản lý thu B', code: 'B' },
        { name: 'Cơ quan quản lý thu C', code: 'C' },
    ];

    const quanHuyens = [
        { name: 'Quận huyện A', code: 'A' },
        { name: 'Quận huyện B', code: 'B' },
        { name: 'Quận huyện C', code: 'C' },
    ];

    const xaPhuongs = [
        { name: 'Xã phường A', code: 'A' },
        { name: 'Xã phường B', code: 'B' },
        { name: 'Xã phường C', code: 'C' },
    ];

    const khoBacNNs = [
        { name: 'Kho bạc nhà nước A', code: 'A' },
        { name: 'Kho bạc nhà nước B', code: 'B' },
        { name: 'Kho bạc nhà nước C', code: 'C' },
    ];


    const nganHangUNTs = [
        { name: 'Ngân hàng ủy nhiệm thu A', code: 'A' },
        { name: 'Ngân hàng ủy nhiệm thu B', code: 'B' },
        { name: 'Ngân hàng ủy nhiệm thu C', code: 'C' },
    ];

    const loaiThues = [
        { name: 'Loại thuế A', code: 'A' },
        { name: 'Loại thuế B', code: 'B' },
        { name: 'Loại thuế C', code: 'C' },
    ];











    const onChangeBank = (e) => {
        // console.log(e.target.value.name)
        setSelectedBank(e.value);

    };
    const processSelectedBank = () => {
        // alert('ok');
        if (selectedBank === null) {
            onClick('displayBasic');
            return;
        }
        setDisableSelectBank(true)

    };

    // Dialog

    const [displayBasic, setDisplayBasic] = useState(false);
    const [position, setPosition] = useState('center');

    const dialogFuncMap = {
        displayBasic: setDisplayBasic,
    };

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    };

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    };

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="Tắt" icon="pi pi-check" onClick={() => onHide(name)} autoFocus />
            </div>
        );
    };

    //End Dialog

    const renderTacVu = (e) => {
        // console.log('listData', listData)
        // console.log('rowData', rowData.rowIndex)
        let id = e.id;
        return (
            <div>
                <i
                    className="pi pi-trash icon-medium"
                    style={{ color: "red", cursor: "pointer", textAlign: "center" }}
                    title={"Xóa"}
                    // onClick={()=> console.log('e', e.id)}
                    onClick={() => handleDeleteRow(id)}

                />
            </div>
        );
    }

    let headerGroup = <ColumnGroup>

        <Row>
            <Column header="Phần dành cho NNT ghi" colSpan={6} style={{ textAlign: "center" }} />
            <Column header="Phần dành cho NH ủy nhiệm thu / NH phối hợp thu / KBNN ghi" colSpan={3} style={{ textAlign: "center" }} />
        </Row>

        <Row>
            <Column header="STT" field="stt" style={{ textAlign: "center" }} />
            <Column header="Số quyết định/thông báo" field="sqdtb" style={{ textAlign: "center" }} />
            <Column header="Kỳ thuế/Ngày quyết định/Thông báo" field="ktnqdtb" style={{ textAlign: "center" }} />
            <Column header="Nội dung các khoản NSNN" field="ndcknnsnn" style={{ textAlign: "center" }} />
            <Column header="Số nguyên tệ" field="snt" style={{ textAlign: "center" }} />
            <Column header="Số tiền VNĐ" field="stVND" style={{ textAlign: "center" }} />
            <Column header="Mã chương" field="mc" style={{ textAlign: "center" }} />
            <Column header="Mã tiểu mục" field="mtm" style={{ textAlign: "center" }} />
            <Column header="Tác vụ" field="tv" style={{ textAlign: "center" }} />
        </Row>
    </ColumnGroup>;



    //edit table 
    const [listData, setListData] = useState([]);
    const [stt, setStt] = useState(null);


    const dataTableFuncMap = {
        'stt': setStt,
    };

    const onEditorValueChange = (productKey, props, value) => {
        // console.log('productKey', productKey)
        // console.log('props', props)
        // console.log('value', value)

        let updatedProducts = [...props.value];
        // console.log('Before: updatedProducts', updatedProducts)
        updatedProducts[props.rowIndex][props.field] = value;
        // console.log('After: updatedProducts', updatedProducts)
        // dataTableFuncMap[`${productKey}`](updatedProducts);
        setStt(updatedProducts)
    }

    const codeEditor = (productKey, props) => {

        // console.log('props', props.field)

        if (props.field === 'sqdtb') {
            return inputTextEditor(productKey, props, 'sqdtb');
        }
        if (props.field === 'ktnqdtb') {
            return inputTextEditor(productKey, props, 'ktnqdtb');
        }
        if (props.field === 'ndcknnsnn') {
            return inputTextEditor(productKey, props, 'ndcknnsnn');
        }
        if (props.field === 'snt') {
            return inputTextEditor(productKey, props, 'snt');
        }
        if (props.field === 'stVND') {
            return inputTextEditor(productKey, props, 'stVND');
        }
        if (props.field === 'mc') {
            return inputTextEditor(productKey, props, 'mc');
        }
        if (props.field === 'mtm') {
            return inputTextEditor(productKey, props, 'mtm');
        }
    }

    const inputTextEditor = (productKey, props, field) => {
        return <InputText type="text" value={props.rowData[field]} onChange={(e) => onEditorValueChange(productKey, props, e.target.value)} />;
    }

    const addRow = async e => {
        var obj = {
            id: v4()
            , stt: '', sqdtb: '', ktnqdtb: '', ndcknnsnn: '', snt: '', stVND: '', mc: '', mtm: '', tv: ''
        };
        let data = listData;
        data.push(obj)
        // console.log('[...data]', [...data])
        // console.log('obj', obj)
        setListData([...data])
        // console.log(listData)
    };

    const renderRowIndex = (listData, column) => {
        // console.log('column', column)
        return column.rowIndex + 1;
    };



    //
    const handleDeleteRow = (id) => {
        const list = listData.filter(item => item.id !== id);
        // console.log('list', list)
        setListData(list)
    }

    const processHoanThanh = () => {
        // alert('0k')
        // const obj = {
        // 	thongtinNganHang: {
        // 		denghiNH: selectedBank.name,
        // 		trichTKso: trichTKso.name
        // 	},
        // 	thongtinCoQuanQuanLyThu: {
        // 		tinhTp: tinhTp.name,
        // 		coquanQLthu: coquanQLthu.name
        // 	},
        // 	thongtinNoiPhatSinhKhoanThu: {
        // 		diadiem: ttnpst,
        // 		tinhTp: tinhTp,
        // 		quanHuyen: quanHuyen.name,
        // 		xaPhuong: xaPhuong.name
        // 	},
        // 	thongtinKhoBac: {
        // 		chuyenChoKBNN: chuyenChoKBNN.name,
        // 		loaiNop: radioTTKB,
        // 		nganHangUNT: nganHangUNT.name
        // 	},
        // 	thongtinLoaiThue: {
        // 		loaiThueL: loaiThue.name,
        // 		loaiTien: radioLoaiTien,
        // 		noptheoVanBanCoQuanCoThamQuyen: radioNTVBCQCTQ
        // 	}
        // }
        // console.log(JSON.parse(obj))
        console.log('result:', formValidation())
    }

    const handleOnChangeRadioButton = (e) => {
        const { name, value } = e.target
        if (name === 'ttnpst') {
            if (value === 'tinhtp') {
                setTtnpst(value)

                setDisableQuanHuyenXaPhuong(true)
                setDisableXaPhuong(true)
            } else if (value === 'quanhuyen') {
                setTtnpst(value)

                setDisableQuanHuyenXaPhuong(false)
                setDisableXaPhuong(true)
            } else {
                setTtnpst(value)
                setDisableQuanHuyenXaPhuong(false)
                setDisableXaPhuong(false)
            }
        }
    }

    const formValidation = () => {
        // debugger

        const trichTkSoError = {}
        const tinhTPCQQLTObjectError = {}
        const coquanQLTError = {}
        const quanHuyenObjectError = {}
        const xaPhuongObjectError = {}

        const chuyenchoKBNNObjectError = {}
        const loaiThueObjectError = {}
        const loaiTienObjectError = {}


        let isValid = true;

        if (tinhTp === '' || tinhTp === null) {
            tinhTPCQQLTObjectError.required = MESSAGE_REQUIRE;
            isValid = false;
        }

        if (trichTKso === '' || trichTKso === null) {
            trichTkSoError.required = MESSAGE_REQUIRE;
            isValid = false;
        }

        if (coquanQLthu === '' || coquanQLthu === null) {
            coquanQLTError.required = MESSAGE_REQUIRE
            isValid = false;
        }

        if (quanHuyen === '' || quanHuyen === null) {
            quanHuyenObjectError.required = MESSAGE_REQUIRE
            isValid = false;
        }

        if (xaPhuong === '' || xaPhuong === null) {
            xaPhuongObjectError.required = MESSAGE_REQUIRE
            isValid = false;
        }

        if (chuyenChoKBNN === '' || chuyenChoKBNN === null) {
            chuyenchoKBNNObjectError.required = MESSAGE_REQUIRE
            isValid = false;
        }

        if (loaiThue === '' || loaiThue === null) {
            loaiThueObjectError.required = MESSAGE_REQUIRE
            isValid = false;
        }

        if (radioLoaiTien === '' || radioLoaiTien === null) {
            loaiTienObjectError.required = MESSAGE_REQUIRE
            isValid = false;
        }

        setTrichTKSoErro(trichTkSoError);
        setTinhTpCQQLTError(tinhTPCQQLTObjectError);
        setCoquanQLTError(coquanQLTError);
        setQuanHuyenTTNPSKTError(quanHuyenObjectError)
        setXaPhuongTTNPSKTError(xaPhuongObjectError)

        setChuyenChoKBNNError(chuyenchoKBNNObjectError)
        setLoaiThueError(loaiThueObjectError)
        setLoaiTienError(loaiTienObjectError)


        return isValid;
    }

    const handleOnChange = (e) => {

        // console.log(`e`, e)
        const { name, value } = e.target;

        // console.log('name', name)
        // console.log('value', value)
        const valueName = value.name;

        switch (name) {
            case "trichTKso":
                setTrichTKso(valueName)
                if (valueName.length > 0) {
                    setTrichTKSoErro("")
                } else {
                    setTrichTKSoErro(MESSAGE_REQUIRE)
                }
                break;
            case "tinhTp":
                setTinhTp(valueName)
                if (valueName.length > 0) {
                    setTinhTpCQQLTError("")
                } else {
                    setTinhTpCQQLTError(MESSAGE_REQUIRE)
                }
                break;
            case "coquanQLthu":
                setCoquanQLthu(valueName);
                if (valueName.length > 0) {
                    setCoquanQLTError("")
                } else {
                    setCoquanQLTError(MESSAGE_REQUIRE)
                }
                break;
            case "quanHuyen":
                setQuanHuyen(valueName);
                if (valueName.length > 0) {
                    setQuanHuyenTTNPSKTError("")
                } else {
                    setQuanHuyenTTNPSKTError(MESSAGE_REQUIRE)
                }
                break;
            case "xaPhuong":
                setXaPhuong(valueName);
                if (valueName.length > 0) {
                    setXaPhuongTTNPSKTError("")
                } else {
                    setXaPhuongTTNPSKTError(MESSAGE_REQUIRE)
                }
                break;
            case "chuyenChoKBNN":
                setChuyenChoKBNN(valueName);
                if (valueName.length > 0) {
                    setChuyenChoKBNNError("")
                } else {
                    setChuyenChoKBNNError(MESSAGE_REQUIRE)
                }
                break;
            case "loaiThue":
                setLoaiThue(valueName);
                if (valueName.length > 0) {
                    setLoaiThueError("")
                } else {
                    setLoaiThueError(MESSAGE_REQUIRE)
                }
                break;
            case "radioLoaiTien":
                setRadioLoaiTien(value);
                if (value.length > 0) {
                    setLoaiTienError("")
                } else {
                    setLoaiTienError(MESSAGE_REQUIRE)
                }
                break;
            case "ttnpst":
                if (value === 'tinhtp') {
                    setTtnpst(value)

                    setDisableQuanHuyenXaPhuong(true)
                    setDisableXaPhuong(true)
                } else if (value === 'quanhuyen') {
                    setTtnpst(value)

                    setDisableQuanHuyenXaPhuong(false)
                    setDisableXaPhuong(true)
                } else {
                    setTtnpst(value)
                    setDisableQuanHuyenXaPhuong(false)
                    setDisableXaPhuong(false)
                }
            default:
                break;

        }




    }

    const processLapMoi = () => {
        // alert('0k')
        setTrichTKso(null)
        setTinhTp(null)
        setCoquanQLthu(null)
        setQuanHuyen(null)
        setXaPhuong(null)
        setChuyenChoKBNN(null)
        setLoaiThue(null)
        setRadioLoaiTien(null)


        setTtnpst(null)
        setNganHangUNT(null)
        setRadioNTVBCQCTQ(null)
        setRadioTTKB(null)


        setTrichTKSoErro("")
        setTinhTpCQQLTError("")
        setCoquanQLTError("")
        setQuanHuyenTTNPSKTError("")
        setXaPhuongTTNPSKTError("")
        setChuyenChoKBNNError("")
        setLoaiThueError("")
        setLoaiTienError("")



    }




    return (
        <div>
            <Toast ref={toast}></Toast>
            <Dialog
                header="Thông báo"
                visible={displayBasic}
                style={{ width: '25vw' }}
                footer={renderFooter('displayBasic')}
                onHide={() => onHide('displayBasic')}
            >
                <p>
                    Bạn chưa chọn ngân hàng!
				</p>
            </Dialog>

            <div className="card">
                {/* <Steps
					model={items}
					activeIndex={activeIndex}
					onSelect={(e) => setActiveIndex(e.index)}
					readOnly={false}
				/> */}

                {/* Chọn ngân hàng */}

                {disableSelectBank === false && <div className="container center">
                    <div className="card-select">
                        <h2>Chọn ngân hàng nộp thuế</h2>
                        <hr />
                        <div className="p-fluid">
                            <div className="p-field p-grid" style={{ marginTop: '35px' }}>
                                <label htmlFor="firstname4" className="p-col-12 p-md-3" >
                                    Ngân hàng
								</label>
                                <div className="p-col-12 p-md-9">
                                    <Dropdown
                                        value={selectedBank}
                                        options={banks}
                                        onChange={onChangeBank}
                                        optionLabel="name"
                                        editable
                                    />
                                </div>
                            </div>
                        </div>
                        <button onClick={processSelectedBank} >
                            Tiếp theo
						</button>
                    </div>
                </div>
                }

                {disableSelectBank === true && <div className="card">



                    <div className="card-body">
                        <fieldset>
                            <legend>Thông tin người nộp thuế </legend>
                            <div>Mã số thuế nộp thay</div>
                            <div>Tên người nộp thay</div>
                            <div>Địa chỉ nộp thay</div>
                        </fieldset>


                        <fieldset>
                            <legend>Thông tin ngân hàng</legend>
                            <div className="p-grid">
                                <div className="p-col-12 p-md-6 p-lg-6" >
                                    <div className="p-grid">
                                        <label htmlFor="firstname4" className="p-col-fixed" style={{ width: '200px' }}>
                                            Đề nghị NH <span className="item-required">*</span>
                                        </label>
                                        <div className="p-col">
                                            <Dropdown
                                                value={selectedBank}
                                                options={banks}
                                                onChange={onChangeBank}
                                                optionLabel="name"
                                                editable
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-col-12 p-md-6 p-lg-6">
                                    <div className="p-grid">
                                        <label htmlFor="firstname4" className="p-col-fixed" style={{ width: '200px' }} >
                                            Trích TK số <span className="item-required">*</span>
                                        </label>
                                        <div className="p-col">
                                            <Dropdown
                                                className={Object.keys(trichTKSoErro).length > 0 ? "error" : null}
                                                value={trichTKso}
                                                options={trichTKsos}
                                                name="trichTKso"
                                                // onChange={(e) => setTrichTKso(e.value)}
                                                onChange={handleOnChange}
                                                optionLabel="name"
                                                editable
                                                placeholder="====== Chọn ======"
                                            />
                                        </div>
                                    </div>
                                    {Object.keys(trichTKSoErro).map((keyIndex, key) => {
                                        return <span className="errorMessage" key={key} >{trichTKSoErro[keyIndex]}</span>
                                    })}
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend>Thông tin người hưởng thụ</legend>
                            <div className="p-grid">

                                <div className="p-col-12 " >
                                    <div>Ngày: <Moment format="DD/MM/yy HH:mm:ss" date={currentDate} /> </div>
                                </div>

                                <div className="p-col-12 " >
                                    <div className="p-grid">
                                        <label htmlFor="firstname4" className="p-col-fixed" style={{ width: '200px' }}>
                                            Mã số thuế
                                        </label>
                                        <div className="p-col">
                                            <Dropdown
                                                value={selectedBank}
                                                options={banks}
                                                onChange={onChangeBank}
                                                optionLabel="name"
                                                editable
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-col-12 ">
                                    <div className="p-grid">
                                        <label htmlFor="firstname4" className="p-col-fixed" style={{ width: '200px' }} >
                                            Tên người nộp thuế
                                        </label>
                                        <div className="p-col">
                                            <Dropdown
                                                value={selectedBank}
                                                options={banks}
                                                onChange={onChangeBank}
                                                optionLabel="name"
                                                editable
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-col-12 ">Địa chỉ: </div>
                            </div>
                        </fieldset>



                        <fieldset>
                            <legend>Thông tin cơ quan quản lý thu</legend>
                            <div className="p-grid">
                                <div className="p-col-12 p-md-6 p-lg-6" >
                                    <div className="p-grid">
                                        <label htmlFor="firstname4" className="p-col-fixed" style={{ width: '200px' }}>
                                            Tỉnh/TP <span className="item-required">*</span>
                                        </label>
                                        <div className="p-col">
                                            <Dropdown
                                                className={Object.keys(tinhTpCQQLTError).length > 0 ? "error" : null}
                                                value={tinhTp}
                                                name="tinhTp"
                                                options={tinhTPs}
                                                // onChange={(e) => setTinhTp(e.value)}
                                                onChange={handleOnChange}
                                                optionLabel="name"
                                                editable
                                                placeholder="====== Chọn ======"
                                            />
                                        </div>
                                    </div>
                                    {Object.keys(tinhTpCQQLTError).map((keyIndex, key) => {
                                        return <span className="errorMessage" key={key} >{tinhTpCQQLTError[keyIndex]}</span>
                                    })}
                                </div>
                                <div className="p-col-12 p-md-6 p-lg-6">
                                    <div className="p-grid">
                                        <label htmlFor="firstname4" className="p-col-fixed" style={{ width: '200px' }} >
                                            Cơ quan quản lý thu <span className="item-required">*</span>
                                        </label>
                                        <div className="p-col">
                                            <Dropdown
                                                className={Object.keys(coquanQLTError).length > 0 ? "error" : null}
                                                value={coquanQLthu}
                                                name="coquanQLthu"
                                                options={coQuanQuanLyThus}
                                                // onChange={(e) => setCoquanQLthu(e.value)}
                                                onChange={handleOnChange}
                                                optionLabel="name"
                                                editable
                                                placeholder="====== Chọn ======"
                                            />
                                        </div>
                                    </div>
                                    {Object.keys(coquanQLTError).map((keyIndex, key) => {
                                        return <span className="errorMessage" key={key} >{coquanQLTError[keyIndex]}</span>
                                    })}
                                </div>
                            </div>
                        </fieldset>



                        <fieldset>
                            <legend>Thông tin nơi phát sinh khoản thu </legend>
                            <div className="p-grid">
                                <div className="p-col-3 ">
                                    <div className="p-field-radiobutton">
                                        <RadioButton inputId="tinhtp" name="ttnpst" value="tinhtp"
                                            // onChange={(e) => setTtnpst(e.target.value)} 
                                            // onChange={handleOnChangeRadioButton}
                                            onChange={handleOnChange}

                                            checked={ttnpst === 'tinhtp'} />
                                        <label htmlFor="tinhtp">Tỉnh/TP</label>
                                    </div>
                                </div>

                                <div className="p-col-3">
                                    <div className="p-field-radiobutton">
                                        <RadioButton inputId="quanhuyen" name="ttnpst" value="quanhuyen"
                                            // onChange={(e) => setTtnpst(e.target.value)} 
                                            // onChange={handleOnChangeRadioButton}
                                            onChange={handleOnChange}
                                            checked={ttnpst === 'quanhuyen'} />
                                        <label htmlFor="quanhuyen">Quận/Huyện</label>
                                    </div>
                                </div>

                                <div className="p-col-3">
                                    <div className="p-field-radiobutton">
                                        <RadioButton inputId="xaphuong" name="ttnpst" value="xaphuong"
                                            // onChange={(e) => setTtnpst(e.target.value)} 
                                            // onChange={handleOnChangeRadioButton}
                                            onChange={handleOnChange}
                                            checked={ttnpst === 'xaphuong'} />
                                        <label htmlFor="xaphuong">Xã/Phường</label>
                                    </div>

                                </div>

                                <div className="p-col-12 p-md-12 p-lg-12">Tỉnh/TP: {tinhTp === null ? '' : tinhTp.name} </div>


                                {disableQuanHuyenXaPhuong === false &&
                                    <div className="p-col-12 p-md-6">
                                        <div className="p-grid">
                                            <label htmlFor="firstname4" className="p-col-fixed" style={{ width: '200px' }} >
                                                Quận/Huyện <span className="item-required">*</span>
                                            </label>
                                            <div className="p-col-8 p-md-9">
                                                <Dropdown
                                                    className={Object.keys(quanHuyenTTNPSKTError).length > 0 ? "error" : null}
                                                    value={quanHuyen}
                                                    name="quanHuyen"
                                                    options={quanHuyens}
                                                    // onChange={(e) => setQuanHuyen(e.value)}
                                                    onChange={handleOnChange}
                                                    optionLabel="name"
                                                    editable
                                                    placeholder="====== Chọn ======"
                                                />
                                            </div>
                                        </div>
                                        {Object.keys(quanHuyenTTNPSKTError).map((keyIndex, key) => {
                                            return <span className="errorMessage" key={key} >{quanHuyenTTNPSKTError[keyIndex]}</span>
                                        })}
                                    </div>
                                }
                                {(disableXaPhuong === false) &&
                                    <div className="p-col-12 p-md-6">
                                        <div className="p-grid">
                                            <label htmlFor="firstname4" className="p-col-fixed" style={{ width: '200px' }} >
                                                Xã/Phường <span className="item-required">*</span>
                                            </label>
                                            <div className="p-col">
                                                <Dropdown
                                                    className={Object.keys(xaPhuongTTNPSKTError).length > 0 ? "error" : null}
                                                    value={xaPhuong}
                                                    name="xaPhuong"
                                                    options={xaPhuongs}
                                                    // onChange={(e) => setXaPhuong(e.value)}
                                                    onChange={handleOnChange}
                                                    optionLabel="name"
                                                    editable
                                                    placeholder="====== Chọn ======"
                                                />
                                            </div>
                                        </div>
                                        {Object.keys(xaPhuongTTNPSKTError).map((keyIndex, key) => {
                                            return <span className="errorMessage" key={key} >{xaPhuongTTNPSKTError[keyIndex]}</span>
                                        })}
                                    </div>
                                }

                            </div>
                        </fieldset>



                        <fieldset>
                            <legend>Thông tin kho bạc</legend>
                            <div className="p-grid">

                                <div className="p-col-4" >
                                    <div className="p-grid">
                                        <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>
                                            Chuyển cho KBNN <span className="item-required">*</span>
                                        </label>
                                        <div className="p-col">
                                            <Dropdown
                                                className={Object.keys(chuyenChoKBNNError).length > 0 ? "error" : null}
                                                value={chuyenChoKBNN}
                                                name="chuyenChoKBNN"
                                                options={khoBacNNs}
                                                // onChange={(e) => setChuyenChoKBNN(e.value)}
                                                onChange={handleOnChange}
                                                optionLabel="name"
                                                editable
                                                placeholder="====== Chọn ======"
                                            />
                                        </div>
                                    </div>
                                    {Object.keys(chuyenChoKBNNError).map((keyIndex, key) => {
                                        return <span className="errorMessage" key={key} >{chuyenChoKBNNError[keyIndex]}</span>
                                    })}
                                </div>

                                <div className="p-col-4">
                                    <div className="p-field-radiobutton ">
                                        <RadioButton inputId="tk7111" name="radioTTKB" value="tk7111" onChange={(e) => setRadioTTKB(e.target.value)} checked={radioTTKB === 'tk7111'} />
                                        <label htmlFor="city1">Nộp vào NSNN(TK 7111)</label>
                                    </div>
                                </div>

                                <div className="p-col-4">
                                    <div className="p-field-radiobutton ">
                                        <RadioButton inputId="tk8993" name="radioTTKB" value="tk8993" onChange={(e) => setRadioTTKB(e.target.value)} checked={radioTTKB === 'tk8993'} />
                                        <label htmlFor="city2">Thu hồi hoàn (TK 8993)</label>
                                    </div>

                                </div>






                                <div className="p-col-4">

                                    <div className="p-field p-grid">
                                        <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Ngân hàng ủy nhiệm thu</label>
                                        <div className="p-col">
                                            <Dropdown
                                                value={nganHangUNT}
                                                options={nganHangUNTs}
                                                onChange={(e) => setNganHangUNT(e.value)}
                                                optionLabel="name"
                                                editable
                                                placeholder="====== Chọn ======"
                                            />
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </fieldset>


                        <fieldset>
                            <legend>Thông tin loại thuế</legend>
                            <div className="p-grid nested-grid">
                                <div className="p-col-6" >
                                    <div className="p-grid">
                                        <label htmlFor="firstname4" className="p-col-4 p-md-3">
                                            Loại thuế <span className="item-required">*</span>
                                        </label>
                                        <div className="p-col-8 p-md-9">
                                            <Dropdown
                                                className={Object.keys(loaiThueError).length > 0 ? "error" : null}
                                                value={loaiThue}
                                                options={loaiThues}
                                                name="loaiThue"
                                                // onChange={(e) => setLoaiThue(e.value)}
                                                onChange={handleOnChange}
                                                optionLabel="name"
                                                editable
                                                placeholder="====== Chọn ======"
                                            />
                                        </div>
                                    </div>
                                    {Object.keys(loaiThueError).map((keyIndex, key) => {
                                        return <span className="errorMessage" key={key} >{loaiThueError[keyIndex]}</span>
                                    })}
                                </div>


                                <div className="p-col-6">
                                    <div className="p-grid nested-grid">

                                        <div className="p-col-2">
                                            <label htmlFor="firstname4" className="p-col-4 p-md-3" >
                                                Loại tiền<span className="item-required">*</span>
                                            </label>
                                        </div>

                                        <div className="p-col-10">
                                            <div className="p-grid">
                                                <div className="p-col-12">
                                                    <div className="p-field-radiobutton ">
                                                        <RadioButton
                                                            // className={Object.keys(loaiTienError).length > 0 ? "error" : null}
                                                            inputId="VND"
                                                            name="radioLoaiTien"
                                                            value="VND"
                                                            // onChange={(e) => setRadioLoaiTien(e.target.value)}
                                                            onChange={handleOnChange}
                                                            checked={radioLoaiTien === 'VND'} />
                                                        <label htmlFor="city1">VND</label>
                                                    </div>
                                                </div>
                                                <div className="p-col-12">
                                                    <div className="p-field-radiobutton ">
                                                        <RadioButton
                                                            // className={Object.keys(loaiTienError).length > 0 ? "error" : null}
                                                            inputId="USD"
                                                            name="radioLoaiTien"
                                                            value="USD"
                                                            // onChange={(e) => setRadioLoaiTien(e.target.value)}
                                                            onChange={handleOnChange}
                                                            checked={radioLoaiTien === 'USD'} />
                                                        <label htmlFor="city1">USD</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    {Object.keys(loaiTienError).map((keyIndex, key) => {
                                        return <span className="errorMessage" key={key} >{loaiTienError[keyIndex]}</span>
                                    })}

                                </div>
                            </div>

                            <div className="p-col-12">

                                <div className="p-grid nested-grid">
                                    <div className="p-col-2">
                                        <div>Nộp theo văn bản cơ quan có thẩm quyền</div>
                                    </div>
                                    <div className="p-col-10">
                                        <div className="p-col-12 p-field-radiobutton">
                                            <RadioButton inputId="city1" name="radioNTVBCQCTQ" value="ktnn" onChange={(e) => setRadioNTVBCQCTQ(e.target.value)} checked={radioNTVBCQCTQ === 'ktnn'} />
                                            <label htmlFor="city1">Kiểm toán nhà nước</label>
                                        </div>
                                        <div className="p-col-12 p-field-radiobutton">
                                            <RadioButton inputId="city2" name="radioNTVBCQCTQ" value="tttc" onChange={(e) => setRadioNTVBCQCTQ(e.target.value)} checked={radioNTVBCQCTQ === 'tttc'} />
                                            <label htmlFor="city2">Thanh tra tài chính</label>
                                        </div>
                                        <div className="p-col-12 p-field-radiobutton">
                                            <RadioButton inputId="city1" name="radioNTVBCQCTQ" value="tccp" onChange={(e) => setRadioNTVBCQCTQ(e.target.value)} checked={radioNTVBCQCTQ === 'tccp'} />
                                            <label htmlFor="city1">Thanh tra chính phủ</label>
                                        </div>
                                        <div className="p-col-12 p-field-radiobutton">
                                            <RadioButton inputId="city2" name="radioNTVBCQCTQ" value="cqctq" onChange={(e) => setRadioNTVBCQCTQ(e.target.value)} checked={radioNTVBCQCTQ === 'cqctq'} />
                                            <label htmlFor="city2">Cơ quan có thẩm quyền khác</label>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </fieldset>


                        <fieldset>
                            <div className="p-grid">
                                <div className="p-col-6">
                                    <Button label="Truy vấn số thuế PN" className="p-button-primary" />
                                </div>
                                <div className="p-col-6">
                                    <Button label="Thêm dòng" className="p-button-success" onClick={addRow} style={{ float: "right" }} />
                                </div>
                            </div>


                            <DataTable value={listData} headerColumnGroup={headerGroup} >
                                <Column field="stt" body={renderRowIndex} />
                                <Column field="sqdtb" editor={(props) => codeEditor('sqdtb', props)} />
                                <Column field="ktnqdtb" editor={(props) => codeEditor('ktnqdtb', props)} />
                                <Column field="ndcknnsnn" editor={(props) => codeEditor('ndcknnsnn', props)} />
                                <Column field="snt" editor={(props) => codeEditor('snt', props)} />
                                <Column field="stVND" editor={(props) => codeEditor('stVND', props)} />
                                <Column field="mc" editor={(props) => codeEditor('mc', props)} />
                                <Column field="mtm" editor={(props) => codeEditor('mtm', props)} />
                                <Column field="tv" body={renderTacVu} />
                            </DataTable>


                            <div className="item-total">

                                <div>Tổng cộng: </div>
                                <div>Tổng tiền ghi bằng chữ: </div>
                                <div>Tổng số ký hiện tại: </div>
                            </div>

                            <div className="p-grid">
                                <div className="p-col-6">
                                    <Button label="Lập mới" className="p-button-danger" style={{ float: "right" }} onClick={processLapMoi} />
                                </div>

                                <div className="p-col-6">
                                    <Button label="Hoàn thành" className="p-button-warning" onClick={processHoanThanh} />
                                </div>
                            </div>
                        </fieldset>

                    </div>
                </div>
                }

            </div>
        </div>

    );
}

export default LapGiayNopTienThay
