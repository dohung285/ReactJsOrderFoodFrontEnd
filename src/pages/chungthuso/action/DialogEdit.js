import React, { Component, useState, useEffect, useRef } from 'react'
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Calendar } from 'primereact/calendar';
import ChungThuSoService from './../../../service/ChungThuSoService';
import { Toast } from 'primereact/toast';
import './ToastDemo.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const DialogEdit = (props) => {

    // const [test, setTest] = useState(props.rowData);
    // console.log("fuckyou lần 1: ", test.iddoanhnghiep)

    const service = new ChungThuSoService
    const [displayBasic, setDisplayBasic] = useState(false);
    const [displayBasic2, setDisplayBasic2] = useState(false);
    const [displayModal, setDisplayModal] = useState(false);
    const [displayConfirmation, setDisplayConfirmation] = useState(false);
    const [displayMaximizable, setDisplayMaximizable] = useState(false);
    const [displayPosition, setDisplayPosition] = useState(false);
    const [position, setPosition] = useState('center');

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,
        'displayBasic2': setDisplayBasic2,
        'displayModal': setDisplayModal,
        'displayConfirmation': setDisplayConfirmation,
        'displayMaximizable': setDisplayMaximizable,
        'displayPosition': setDisplayPosition
    }

    // data of chung thu so
    const [nameabc, setName] = useState(props.rowData.ten);
    const [password, setPassword] = useState(props.rowData.passhsm);
    const [dnChungthuso, setdnChungthuso] = useState(props.rowData.dnchungthuso);
    const [nhaCungCap, setNhaCungCap] = useState(props.rowData.nhacungcap);
    const [chungThuSo, setChungThuSo] = useState(props.rowData.chungthuso);
    const [mst, setMst] = useState(props.rowData.masothue);
    const [pkcs10File, setPkcs10File] = useState();
    // const toast = useRef(null);
    // const showSuccess = () => {
    //     toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
    // }
    // const showError = (message) => {
    //     toast.current.show({ severity: 'error', summary: 'Error Message', detail: message, life: 5000 });
    // }
    // Thêm 2 function 

    const notifySuccess = (message) => {
        toast.success(`🦄 ${message}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const notifyError = (message) => {
        toast.error(`🦄 ${message}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    // call api to save
    const editChungThuSo = async (chungThuSoObject) => {
        const result = await service.updateChungThuSo(chungThuSoObject);
        console.log("result:", result)
        if (result && result.status === 1000) {
            console.log("result reponse add chung thu so:", result);
            setTimeout(props.fetDataUser, 500);

            notifySuccess(result.message);

        } else {
            // alert("them khong thanh cong");
            // showError(result.message)
            // console.log("response: ", result);
            notifyError(result.message);
        }
        clearState();
    };
    // useEffect(() => {
    //     addChungThuSo();
    //     // eslint-disable-next-line
    // }, []);


    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }

    const onHide = (name, check) => {



        if (check === 0) {
            clearState();
            console.log("close");
        } else {
            console.log("add", nameabc);
            // console.log("apikey", selectApikey.name);
            // console.log("password: ", password);
            // console.log("dnChungthuso: ", dnChungthuso);
            // console.log("nhaCungCap: ", nhaCungCap);
            // console.log("chungThuSo: ", chungThuSo);
            // console.log("mst: ", mst);
            // console.log("startDate: ", startDate);
            // console.log("endDate: ", endDate);
            // console.log("trangThai: ", selectTrangThai.name);
            console.log("selectHostHsm: ", selectHostHsm.name);
            // console.log("file: ",pkcs10File);



            var pat = /[0-9]{10}/;



            if (nameabc === null || selectApikey === null || password === null || dnChungthuso === null || nhaCungCap === null ||
                nhaCungCap === null || chungThuSo === null || mst === null || selectTrangThai === null || selectHostHsm === null || selectHostHsm.name === null
                || selectApikey.name === null || selectTrangThai.name === null) {
                notifyError("chu nhap du thong tin! kiem tra lai");
                // alert("chu nhap du thong tin! kiem tra lai");
                clearState();
                return;
            }


            if (!patMst.test(mst)) {
                // alert("ma so thue phai du 10 so");
                notifyError("ma so thue phai du 10 so");
                // toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'ma so thue phai du 10 so', life: 3000 });
                clearState();
                return;
            }

            // check password
            var count = strongPassword(password);
            if (count > 0) {
                //toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'password phai du 6 ki tu tro len va co chu hoa chu thuong so va ki tu dac biet', life: 5000 });
                // alert("password phai du 6 ki tu tro len va co chu hoa chu thuong so va ki tu dac biet");
                notifyError("password phai du 6 ki tu tro len va co chu hoa chu thuong so va ki tu dac biet");
                clearState();
                return;
            }


            //call api
            // addChungThuSo({
            //     "masothue": "0123456789",
            //     "ten": "Tran Trung Hai",
            //     "dnChungThuSo": "1234",
            //     "nhaCungCap": "Cyber",
            //     "chungThuSo": "123",
            //     "ngayBatDau": null,
            //     "ngayKetThuc": null,
            //     "hostHsm": "HSM",
            //     "apiKey": "Kyy",
            //     "passHsm": "HSM",
            //     "trangThai": 0,
            //     "pkcs10": "sfff"
            // });
            editChungThuSo({
                "id": props.rowData.iddoanhnghiep,
                "masothue": mst,
                "ten": nameabc,
                "dnChungThuSo": dnChungthuso,
                "nhaCungCap": nhaCungCap,
                "chungThuSo": chungThuSo,
                "ngayBatDau": null,
                "ngayKetThuc": null,
                "hostHsm": selectHostHsm.name,
                "apiKey": selectApikey.name,
                "passHsm": password,
                "trangThai": selectTrangThai.name === "0" ? 0 : 1,
                "pkcs10": "sfff"
            });
            // recall list
            // props.fetDataUser();
            // clearState();
        }
        // // tranform data to 
        // props.test2(nameabc);
        dialogFuncMap[`${name}`](false);
    }
    const clearState = () => {
        setName(props.rowData.ten);
        setPassword(props.rowData.passhsm);
        setdnChungthuso(props.rowData.dnchungthuso);
        setNhaCungCap(props.rowData.nhacungcap);
        setChungThuSo(props.rowData.chungthuso);
        setMst(props.rowData.masothue);
        setSelectApikey({ name: props.rowData.apikey });
        setSelectHostHsm({ name: props.rowData.hosthsm });
        setStartDate({ name: props.rowData.ngaybatdau });
        setEndDate({ name: props.rowData.ngayketthuc });
        setSelectTrangThai({ name: "" + props.rowData.trangthai });

    }
    const renderFooter = (name) => {
        return (
            <div>
                <Button label="Đóng" icon="pi pi-times" onClick={() => onHide(name, 0)} className="p-button-text" />
                <Button label="Thêm" icon="pi pi-check" onClick={() => onHide(name, 1)} autoFocus />
            </div>
        );
    }

    // console.log("fuckyou: ", props.testFunc);
    const [selectApikey, setSelectApikey] = useState({ name: props.rowData.apikey });
    const [selectHostHsm, setSelectHostHsm] = useState({ name: props.rowData.hosthsm });
    const [startDate, setStartDate] = useState({ name: props.rowData.ngaybatdau });
    const [endDate, setEndDate] = useState({ name: props.rowData.ngayketthuc });
    const [selectTrangThai, setSelectTrangThai] = useState({ name: "" + props.rowData.trangthai });
    const trangThai = [
        { name: "0" },
        { name: "1" }
    ]
    const apikey = [
        { name: 'Kyy' }

    ];
    const hostHsm = [
        { name: 'HSM' },
        { name: 'Origin' }
    ]

    // const initCheckOption = [
    //     {check: true}
    // ]

    const [checkName, setCheckName] = useState(true);
    const [checkMst, setCheckMst] = useState(true);
    const [checkTrangThai, setCheckTrangThai] = useState(true);
    const [checkPassword, setCheckPassword] = useState(true);
    const [checkDnChungThuSo, setCheckDnChungThuSo] = useState(true);
    const [checkChungThuSo, setCheckChungThuSo] = useState(true);
    const [checkNhaCungCap, setCheckNhaCungCap] = useState(true);


    const renderMessageError = (check) => {
        return (
            <label id="test" style={{ color: 'red' }}>{check === true ? "" : "* can not to blank"}</label>
        )
    };
    const patMst = /[0-9]{10}/;
    const patUpperCase = /[A-Z]/;
    const patLowerCase = /[a-z]/;
    const patNumber = /[0-9]/;
    const patChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    const strongPassword = (password) => {
        let count = 0;
        if (!patUpperCase.test(password)) {
            console.log("UpperCase");
            count = count + 1;
        }
        if (!patLowerCase.test(password)) {
            console.log("Lower case");
            count = count + 1;
        }
        if (!patNumber.test(password)) {
            console.log("number");
            count = count + 1;
        }
        if (!patChar.test(password)) {
            console.log("characteristic");
            count = count + 1;
        }
        if (password.length + count < 6) {
            console.log("count = count + (6 - (count+password.leng))");
            count = count + (6 - (count + password.length))
        }
        return count;
    }

    const aCheck = [];
    const handleFile = (e) => {
        const content = e.target.result;
        console.log('file content', content)
        console.log('file base 64: ', btoa(content));
        setPkcs10File(btoa(content));
        // You can set content in state and show it in render.
    }

    const handleChangeFile = (file) => {
        let fileData = new FileReader();
        fileData.onloadend = handleFile;
        fileData.readAsBinaryString(file);
    }
    console.log("prop fuck: ", props.rowData);
    return (

        <div style={{"text-align": "left"}}>
            {/* <Toast ref={toast} /> */}
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

            <i className="pi pi-pencil p-mr-2 icon-medium" title={"Sửa"} style={{ color: "blue", cursor: "pointer" }} onClick={() => onClick('displayBasic')} />

            {/* <Button icon="pi pi-plus" className="p-mr-2 p-button-success" onClick={() => onClick('displayBasic')} /> */}

            <Dialog header={<div><h1>Sửa chứng thư số</h1></div>}
                visible={displayBasic} style={{ width: '50vw' }}
                footer={renderFooter('displayBasic')}
                onHide={() => onHide('displayBasic', 0)}
            >

                <hr style={{ marginBottom: 40 }} />

                <div className="p-grid p-fluid">
                    <div className="p-col-12 p-md-6">
                        <label>Tên</label>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon" style={{ color: 'red' }}>
                                *
                            </span>
                            <InputText placeholder="Tên" onChange={(e) => {
                                if (e.target.value == "") {
                                    // setNotification("abc");
                                    // document.getElementById("test").value = "i love u";

                                    console.log("no have change");
                                    setCheckName(false);

                                } else {
                                    console.log("have change");
                                    setCheckName(true);
                                }
                                // aCheck.push(checkName);

                                console.log("value: ", e.target.value);
                                setName(e.target.value);
                            }}
                                value={nameabc} />

                        </div>
                        {/* <p id ="test">{() => {
                                if (check === false) return "fuckyou"
                            }}</p> */}
                        {renderMessageError(checkName)}

                    </div>

                    <div className="p-col-12 p-md-6">
                        <label>Mã số thuế</label>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon" style={{ color: 'red' }} >
                                *
                            </span>
                            <InputText placeholder="Mã số thuế" onChange={(e) => { setMst(e.target.value) }}
                                onChange={(e) => {
                                    if (e.target.value == "") {
                                        console.log("test patten string: ", patMst.test(e.target.value));
                                        setCheckMst(false);
                                    } else {
                                        setCheckMst(true);
                                    }

                                    // aCheck.push(checkMst);
                                    setMst(e.target.value)
                                }}
                                value={mst}
                            />


                        </div>
                        {renderMessageError(checkMst)}
                    </div>
                </div>
                <br />
                <div className="p-grid p-fluid">
                    <div className="p-col-12 p-md-6">
                        <label>PKCS 10 file</label>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon" style={{ color: 'red' }}>
                                *
                            </span>

                            {/* <FileUpload mode="basic" name="demo" url="./upload.php" accept="*" maxFileSize={1000000} onChange={e => 
            handleChangeFile(e.target.files[0])}> </FileUpload> */}
                            {/* <FileUpload mode="basic" name="demo[]" url="./upload.php" accept="image/*" maxFileSize={1000000} onUpload={
                                (e) => {
                                  var f = e.target.file[0];
                                  var reader = new FileReader();
                                  reader.onload = function(event) {
                                    // The file's text will be printed here
                                    console.log(event.target.result)
                                  };
                                

                                  reader.readAsText(f);
                            }}
                            /> */}
                            {/* <span className="p-inputgroup-addon" style={{ color: 'red' }}>
                                PKCS 10
                            </span> */}
                            <Button>
                                <input type="file" accept="*" onChange={e =>
                                    handleChangeFile(e.target.files[0])} />
                            </Button>
                        </div>

                    </div>
                    <div className="p-col-12 p-md-6">
                        <label>Trạng thái</label>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon" style={{ color: 'red' }}>
                                *
                            </span>
                            <Dropdown value={selectTrangThai} options={trangThai} onChange={(e) => {
                                if (e.value == "") {
                                    setCheckTrangThai(false);
                                } else {
                                    setCheckTrangThai(true);
                                }
                                setSelectTrangThai(e.value)
                            }} optionLabel="name" placeholder="Trạng thái"

                            />
                        </div>
                        {renderMessageError(checkTrangThai)}
                    </div>
                </div>
                <br />
                <div className="p-grid p-fluid">
                    <div className="p-col-12 p-md-6">
                        <label>Host HSM</label>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon" style={{ color: 'red' }}>
                                *
                            </span>
                            {/* <InputText placeholder="HostHsm" /> */}
                            <Dropdown value={selectHostHsm} options={hostHsm} onChange={(e) => { setSelectHostHsm(e.value); console.log(e.value) }} optionLabel="name" placeholder="Select host" />
                        </div>
                    </div>
                    <div className="p-col-12 p-md-6">
                        <label>Password</label>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon" style={{ color: 'red' }}>
                                *
                            </span>
                            <Password onChange={(e) => {
                                if (e.target.value == "") {
                                    setCheckPassword(false);
                                } else {
                                    setCheckPassword(true);
                                }
                                // aCheck.push(checkPassword);
                                setPassword(e.target.value)
                            }} placeholder="Password" value={password} />
                        </div>
                        {renderMessageError(checkPassword)}
                    </div>
                </div>
                <br />
                <div className="p-grid p-fluid">
                    <div className="p-col-12 p-md-6">
                        <label>Ngày bắt đầu</label>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon" style={{ color: 'red' }}>
                                *
                            </span>
                            {/* <InputText placeholder="HostHsm" /> */}
                            <Calendar id="icon" value={startDate} onChange={(e) => {
                                // setStartDate(e.value);
                                var valDate = e.target.value;
                                console.log("startDate fuck: ", e.target.value);
                                console.log("date: ", e.target.value.getDate(), valDate.getMonth() + 1, valDate.getFullYear())
                                var date = e.target.value.getDate();
                                var month = valDate.getMonth() + 1;
                                var year = valDate.getFullYear();

                                if (e.target.value.getDate() < 10) {
                                    date = "0" + date;
                                }
                                if (valDate.getMonth() < 9) {
                                    month = "0" + month;
                                }
                                var dateString = year + "-" + month + "-" + date;
                                setStartDate(dateString);
                            }}
                                showIcon dateFormat="dd/mm/yy" placeholder="startDate" />
                        </div>
                    </div>
                    {/* end date */}
                    <div className="p-col-12 p-md-6">
                        <label>Ngày kết thúc</label>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon" style={{ color: 'red' }}>
                                *
                            </span>
                            <Calendar id="icon" value={endDate} onChange={(e) => {
                                //   setEndDate(e.value.toString())
                                var valDate = e.target.value;
                                var date = e.target.value.getDate();
                                var month = valDate.getMonth() + 1;
                                var year = valDate.getFullYear();

                                if (e.target.value.getDate() < 10) {
                                    date = "0" + date;
                                }
                                if (valDate.getMonth() < 9) {
                                    month = "0" + month;
                                }
                                var dateString = year + "-" + month + "-" + date;
                                setEndDate(dateString)
                            }} showIcon dateFormat="dd/mm/yy" placeholder="endDate" />
                        </div>
                    </div>
                </div>
                <br />
                <div className="p-grid p-fluid">
                    <div className="p-col-12 ">
                        <label>API key</label>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon" style={{ color: 'red' }}>
                                *
                            </span>
                            {/* <Dropdown optionLabel="name" value="Rome" option = {cities} placeholder="Người dùng" onChange={(e) => {setName(e.target.value)}}/> */}
                            <Dropdown value={selectApikey} options={apikey} onChange={(e) => { setSelectApikey(e.value) }} optionLabel="name" placeholder="Apikey" />
                        </div>
                    </div>
                </div>
                <br />


                <div className="p-grid p-fluid">
                    <div className="p-col-12 ">
                        <label>Dn chứng thư số</label>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon" style={{ color: 'red' }}>
                                *
                            </span>
                            <InputText placeholder="dn Chứng thư số" onChange={(e) => {
                                if (e.target.value == "") {
                                    setCheckDnChungThuSo(false);
                                } else {
                                    setCheckDnChungThuSo(true);
                                }
                                // aCheck.push(checkDnChungThuSo);
                                setdnChungthuso(e.target.value)
                            }} value={dnChungthuso} />
                        </div>
                        {renderMessageError(checkDnChungThuSo)}
                    </div>
                </div>
                <br />
                <div className="p-grid p-fluid">
                    <div className="p-col-12 ">
                        <label>Nhà cung cấp</label>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon" style={{ color: 'red' }}>
                                *
                            </span>
                            <InputText placeholder="Nhà cung cấp" onChange={(e) => {
                                if (e.target.value == "") {
                                    setCheckNhaCungCap(false);
                                } else {
                                    setCheckNhaCungCap(true);
                                }
                                // aCheck.push(checkNhaCungCap);
                                setNhaCungCap(e.target.value)
                            }} value={nhaCungCap} />
                        </div>
                        {renderMessageError(checkNhaCungCap)}
                    </div>
                </div>
                <br />
                <div className="p-grid p-fluid">
                    <div className="p-col-12 ">
                        <label>Chứng thư số</label>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon" style={{ color: 'red' }}>
                                *
                            </span>
                            <InputText placeholder="Chứng thư số" onChange={(e) => {
                                if (e.target.value == "") {
                                    setCheckChungThuSo(false);
                                } else {
                                    setCheckChungThuSo(true);
                                }
                                // aCheck.push(checkChungThuSo);
                                setChungThuSo(e.target.value)
                            }} value={chungThuSo} />
                        </div>
                        {renderMessageError(checkChungThuSo)}
                    </div>
                </div>
                <hr style={{ marginTop: 40 }} />
                {/* {props.children} */}
            </Dialog>
        </div>
    )
}

export default DialogEdit;