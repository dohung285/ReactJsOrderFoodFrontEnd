
import {Checkbox} from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';
import React, { Component, useEffect, useRef, useState } from 'react';

import { withRouter } from 'react-router-dom';
import useFullPageLoader from '../../hooks/useFullPageLoader';
import DangkyhosoService from '../../service/DangkyhosoService';

const Dangkyhoso = (props) => {

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
    
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;

    const [customers, setCustomers] = useState([]);
    const [isShow, setIsShow] = useState(true);
    const [expandedRows, setExpandedRows] = useState([]);
    const [datatabletk, setDatatabletk] = useState(null);
    const toastpri = useRef(null);
    const [data, setData] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [listloaiky, setListLoaiKy] = useState([]);
    const [checked, setChecked] = useState(false);
    const [listChecked, setListChecked] = useState([]);
    const [listHoso, setListHoso] = useState([]);
    const [date, setDate] = useState(null);
    
    const dangkyhosoService = new DangkyhosoService();
    const fetDataUser = async () => {
        showLoader();
        const result = await dangkyhosoService.getData();
        if(result && result.status === 1000) {
            setData(result.object);
        }
        hideLoader();
    };
    // 
    const datatk = [
        {"id": "1000","code": "f230fh0g3","name": "Bamboo Watch","description": "Product Description","image": "bamboo-watch.jpg","price": 65,"category": "Accessories","quantity": 24,"inventoryStatus": "INSTOCK","rating": 5},
        {"id": "1001","code": "nvklal433","name": "Black Watch","description": "Product Description","image": "black-watch.jpg","price": 72,"category": "Accessories","quantity": 61,"inventoryStatus": "INSTOCK","rating": 4},
        {"id": "1002","code": "zz21cz3c1","name": "Blue Band","description": "Product Description","image": "blue-band.jpg","price": 79,"category": "Fitness","quantity": 2,"inventoryStatus": "LOWSTOCK","rating": 3},
        
    ];
    const loaiKyKeKhai = [
        {name: 'Kê khai theo từng lần phát sinh', value: 'kk-lan-phat-sinh'},
        {name: 'Kê khai theo kỳ', value: 'kk-ky'},
        {name: 'Kê khai theo tháng', value: 'kk-thang'},
        {name: 'Kê khai theo quý', value: 'kk-quy'},
        {name: 'Kê khai theo năm', value: 'kk-nam'}
    ];
    useEffect(() => {
        fetDataUser();
        //customerService.getCustomersMedium().then(data => setCustomers(data));
        setCustomers(data);
        setDatatabletk(datatk);
    }, [props.location.search]); // eslint-disable-line react-hooks/exhaustive-deps

    const headerTemplate = (data) => {
        return (
            <React.Fragment>
                {/* <img alt={data.representative.name} src={`showcase/demo/images/avatar/${data.representative.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width="32" style={{ verticalAlign: 'middle' }} /> */}
                <span className="image-text"><b>{data.loaiHoso.tenLoai}</b></span>
            </React.Fragment>
        );
    }

    const footerTemplate = (data) => {
        return (
            <React.Fragment>
                {/* <td colSpan="4" style={{ textAlign: 'right' }}>Total Customers</td>
                <td>{calculateCustomerTotal(data.representative.name)}</td> */}
            </React.Fragment>
        );
    }

    // const loakyChangeValue = (key, rowData) => {
    //     return (
    //         <Dropdown options={loaiKyKeKhai} optionLabel="name" optionValue="value"
    //             onChange={(e) => onEditorValueChange(productKey, props, e.value)} style={{ width: '100%' }} placeholder="Select a Status"
    //             itemTemplate={(option) => {
    //                 return <span className={`product-badge status-${option.value.toLowerCase()}`}>{option.label}</span>
    //             }} />
    //     );
    // }

    const onChangeDropdown = (e, mahoso) => {
        const check = listloaiky.filter(loaiKy=>loaiKy.mahoso===mahoso)[0];
        if(!check) {
            let newArrLoaiKy=[...listloaiky];
            const saveLoaiKy={
                mahoso: mahoso,
                value:e.value
            }
            newArrLoaiKy.push(saveLoaiKy);
            setListLoaiKy(newArrLoaiKy);
        } else {
            let newArrLoaiKy=[...listloaiky];
            newArrLoaiKy.map(loaiKy=> {
                if(loaiKy.mahoso===check.mahoso) {
                    loaiKy.value = e.value;
                }
            });
            setListLoaiKy(newArrLoaiKy);
        }
    }
    console.log('tenLoaiky: ', listloaiky);
    const valueDropdown = (mahoso) =>{
       const newValue= listloaiky.filter(e=>e.mahoso===mahoso)[0];
       if (newValue){
           return newValue.value;
        }
    }
    
    const loaiKykekhaiBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Dropdown style={{ width: '100%' }} key={rowData.hoSo.mahoso} optionLabel="name" optionValue="name" value={valueDropdown(rowData.hoSo.mahoso)} options={loaiKyKeKhai} 
                onChange={(e)=>onChangeDropdown(e, rowData.hoSo.mahoso)} placeholder="Chọn loại kỳ kê khai"/>
            </React.Fragment>
        );
    }

    const getQuyTrongNam = (date)=> {
        const quy1 = [1,2,3];
        const quy2 = [4,5,6];
        const quy3 = [7,8,9];
        const quy4 = [10,11,12];
        const thang = date.getMonth()+1;
        if(quy1.includes(thang)) {
            return 1;
        } else if(quy2.includes(thang)) {
            return 2;
        } else if(quy3.includes(thang)) {
            return 3;
        } else if(quy4.includes(thang)) {
            return 4;
        }
    }

    const onChangeCheckbox = (e,data) => {
        console.log('data: ', data);
        let listSelected = [...listChecked];
        let newListHoso=[...listHoso];
        let checkShowDialog = false;
        if (e.checked) {
            const newTenLoaiKy = listloaiky.filter(e=>e.mahoso===data.hoSo.mahoso)[0];
            let loaiKy = null;
            if(newTenLoaiKy) {
                console.log('newTenLoaiKy: ', newTenLoaiKy);
                loaiKy = newTenLoaiKy.value;
                listSelected.push(e.value);
                const newHoso={
                    mahoso: data.hoSo.mahoso,
                    tenhoso: data.hoSo.tenhoso,
                    hieulucTu: data.hoSo.hieuluctu,
                    hieulucDen: data.hoSo.hieulucden,
                    maLoaiHoso: data.loaiHoso.maLoaiHoso,
                    nhomToKhai: data.hoSo.nhomtokhai,
                    mauHoso: data.hoSo.mauhoso,
                    htkkVersion: data.hoSo.htkkversion,
                    maSacThue: data.hoSo.masacthue,
                    hosoQtoan: data.hoSo.sosoquyettoan,
                    pbanXmlC: data.hoSo.phienbanxmlc,
                    pbanXmlB: data.hoSo.phienbanxmlb,
                    vangLai: data.hoSo.vanglai,
                    isDangKy: null,
                    dkyId: null,
                    kieuKy: loaiKy,
                    ngayBatdau: today.getDate(),
                    thangBatdau: today.getMonth()+1,
                    quyBatdau: getQuyTrongNam(today),
                    namBatdau: today.getFullYear(),
                    kyBatDau: `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`,
                    date: `${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()}`,
                    show:'show',
                }
                if(listHoso.filter(e=>e.mahoso===data.hoSo.mahoso)[0] === undefined) {
                    newListHoso.push(newHoso);
                    setListHoso(newListHoso);
                }
            } else {
                if(!checkShowDialog) {
                    notifyError("Vui lòng chọn loại ký kê khai!");
                    checkShowDialog = true;
                }
            }
        }
        else {
            listSelected.splice(listSelected.indexOf(e.value), 1);
            const hoSoRemove = listHoso.filter(e=>e.mahoso===data.hoSo.mahoso)[0];
            if(hoSoRemove) {
                newListHoso.pop(hoSoRemove);
                setListHoso(newListHoso);
            }
        }
        setListChecked(listSelected);
    }
    console.log('listHoso: ', listHoso);
    const chonBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
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
                <Checkbox name="checkbox" value={rowData.hoSo.mahoso} onChange={(e)=>onChangeCheckbox(e, rowData)} checked={listChecked.indexOf(rowData.hoSo.mahoso) !== -1}></Checkbox>
            </React.Fragment>
        );
    }
    const onChangeDate =(e, mahoso)=>{
        listHoso.map(hoSo=>{
            if(hoSo.mahoso === mahoso) {
                hoSo.ngayBatdau = e.value.getDate();
                hoSo.thangBatdau = e.value.getMonth()+1;
                hoSo.quyBatdau = getQuyTrongNam(e.value);
                hoSo.namBatdau = e.value.getFullYear();
                hoSo.kyBatDau = `${e.value.getDate()}/${e.value.getMonth()+1}/${e.value.getFullYear()}`;
                hoSo.date = `${e.value.getMonth()+1}/${e.value.getDate()}/${e.value.getFullYear()}`;
            }
        });
        console.log('listHoso: ', listHoso);
    }
    const showOnChangeDate =(mahoso)=>{
        const newValue= listHoso.filter(e=>e.mahoso===mahoso)[0];
        if (newValue){
           return newValue.show;
        }else{
            return "hide";
        }
    }
    const setDateData = (mahoso) => {
        const newValue= listHoso.filter(e=>e.mahoso===mahoso)[0];
        if (newValue){
            return new Date(newValue.date);
        } else {
            return new Date();
        }
    }
    const kyBatdauBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Calendar 
                className={showOnChangeDate(rowData.hoSo.mahoso)}
                 id="icon" value={setDateData(rowData.hoSo.mahoso)} onChange={(e) => onChangeDate(e, rowData.hoSo.mahoso)} showIcon />
            </React.Fragment>
        );
    }

    const onRowGroupExpand = (event) => {
        //  toast.current.show({ severity: 'info', summary: 'Row Group Expanded', detail: 'Value: ' + event.data.representative.name, life: 3000 });
    }

    const onRowGroupCollapse = (event) => {
        //  toast.current.show({ severity: 'success', summary: 'Row Group Collapsed', detail: 'Value: ' + event.data.representative.name, life: 3000 });
    }

    const calculateCustomerTotal = (name) => {
        let total = 0;

        if (customers) {
            for (let customer of customers) {
                if (customer.representative.name === name) {
                    total++;
                }
            }
        }

        return total;
    }

    const eventTieptuc = () => {

        setIsShow(!isShow);
    }
    const eventQuayLai = () => {

        setIsShow(!isShow);
    }
    const eventDangky = async() => {
        showLoader();
        const result = await dangkyhosoService.dangKyHoso(listHoso);
        console.log('result: ', result);
        hideLoader();
        if(result && result.status === 1000) {
            notifySuccess("Đăng ký hồ sơ thành công!");
            setIsShow(!isShow);;
        } else {
            notifyError("Đăng ký hồ sơ thất bại!");
            setIsShow(!isShow);;
        }
        
    }
    const eventDangkyvanop = async() => {
        showLoader();
        const result = await dangkyhosoService.dangKyHoso(listHoso);
        hideLoader();
        if(result && result.status === 1000) {
            console.log('result: ', result);
            const hosoThanhcong = result.object;
            let checkKyVaNop = false;
            for(let i=0; i<hosoThanhcong.length; i++) {
                const resultKyVaNop = await dangkyhosoService.kyVaNopHoso(hosoThanhcong[i].id);
                console.log('resultKyVaNop: ', resultKyVaNop);
                if(resultKyVaNop && resultKyVaNop.status===1000) {
                    checkKyVaNop = true;
                } else {
                    checkKyVaNop = false;
                    if(resultKyVaNop.message) {
                        notifyError(resultKyVaNop.message);
                    } else {
                        notifyError("Ký và nộp hồ sơ thất bại!");
                    }
                    break;
                }
            }
            if(checkKyVaNop) {
                notifySuccess("Đăng ký và nộp hồ sơ thành công!");
            };
            setIsShow(!isShow);
        } else {
            notifyError("Đăng ký hồ sơ thất bại!");
            setIsShow(!isShow);
        }
    }


    const checkstateshowview = () => {
        if (isShow) {
            return (
                <DataTable value={data} rowGroupMode="subheader" groupField="loaiHoso.tenLoai"
                    sortMode="single" sortField="loaiHoso.tenLoai" sortOrder={1}
                    expandableRowGroups expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                    onRowExpand={onRowGroupExpand} onRowCollapse={onRowGroupCollapse}
                    rowGroupHeaderTemplate={headerTemplate} rowGroupFooterTemplate={footerTemplate}>
                    <Column field="hoSo.mahoso" header="Mã tờ khai"></Column>
                    <Column field="hoSo.tenhoso" header="Tờ khai"></Column>
                    <Column header="Loại ký kê khai" body={loaiKykekhaiBodyTemplate}></Column>
                    <Column style={{ width: '10%' }} header="Chọn" body={chonBodyTemplate}></Column>
                    <Column header="Kỳ bắt đầu" body={kyBatdauBodyTemplate}></Column>
                    {/* <Column field="date" header="Date"></Column> */}
                </DataTable>
            );
        } else {
            return toKhaiCompoment();
        }
    }
    const showbtntieptuc= () => {
        if (isShow) {
            return <Button label="Tiếp tục" onClick={eventTieptuc} className="p-button-raised p-button-rounded" />;
        }
    }
    const showbtnquaylai = () => {
        if (!isShow) {
            return <Button label="Quay lại" onClick={eventQuayLai} className="p-button-raised p-button-rounded" />;
        }
    }
    const showbtndangky = () => {
        if (!isShow) {
            return <Button label="Đăng ký hồ sơ" onClick={eventDangky} className="p-button-raised p-button-rounded" />;
        }
    }
    const showbtndangkyvanop = () => {
        if (!isShow) {
            return <Button label="Đăng ký và nộp hồ sơ" onClick={eventDangkyvanop} className="p-button-raised p-button-rounded" />;
        }
    }
    const toKhaiCompoment = () => {
        return (
            <div>
                <div className="p-grid">
                    <div className="p-lg-4">

                    </div>
                    <div style={{ textAlign: 'center' }} className="p-lg-4">
                        <div>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
                        <div>Độc lập-Tự do-Hạnh phúc</div>
                        <div>----------oOo----------</div>
                        <div style={{ marginTop: 20 }}>HỒ SƠ ĐĂNG KÝ HỒ SƠ KHAI THUẾ NỘP QUA DỊCH VỤ T-VAN</div>
                    </div>

                </div>
                <div style={{ marginTop: 50 }} className="p-grid">
                    <div className="p-md-2">
                        Kính gửi:
                    </div>
                    <div className="p-md-10">
                        Chi cục Thuế khu vực Nam Khánh Hòa
                    </div>
                </div>
                <div className="p-grid">
                    <div className="p-md-2">
                    Tên người nộp thuế:
                    </div>
                    <div className="p-md-10">
                    CHI NHÁNH CÔNG TY CỔ PHẦN BÁN LẺ KỸ THUẬT SỐ FPT TẠI ĐÀ NẴNG-TRUNG TÂM BÁN LẺ 01 LÊ DUẨN - KHÁNH HÒA
                    </div>
                </div>
                <div className="p-grid">
                    <div className="p-md-2">
                    Mã số thuế:
                    </div>
                    <div className="p-md-10">
                    0311609355-209
                    </div>
                </div>
                <div className="p-grid">
                    <div className="p-md-12">
                        Cơ sở chúng tôi xin đăng ký các loại hồ sơ khai thuế nộp qua tổ chức cung cấp dịch vụ giá trị gia tăng về giao dịch điện tử trong lĩnh vực thuế (T-VAN).
                    </div>

                </div>
                <div className="p-grid">
                    <div className="p-md-12">
                        <b>1. Tổ chức cung cấp dịch vụ T-VAN: CÔNG TY CỔ PHẦN CÔNG NGHỆ CYBERLOTUS</b>
                    </div>

                </div>
                <div className="p-grid">
                    <div className="p-md-12">
                        <b>2. Danh sách hồ sơ khai thuế đăng ký nộp qua dịch vụ T-VAN:</b>
                    </div>

                </div>
                <div className="p-grid">
                    <div className="p-md-12">
                        <DataTable value={listHoso} className="p-datatable-gridlines">
                            <Column field="mahoso" header="Mã tờ khai"></Column>
                            <Column field="tenhoso" header="Tờ khai"></Column>
                            <Column field="kyBatDau" header="Kỳ bắt đầu"></Column>
                           
                        </DataTable>
                    </div>

                </div>
                <div className="p-grid">
                    <div className="p-md-12">
                    Chúng tôi xin cam kết tính thuế, khai thuế và nộp thuế theo đúng các quy định pháp luật về thuế ./. 
                    </div>

                </div>
            </div>
        )
    }
    return (

        <React.Fragment>
            <div className={"card"}>
                <div className={"card-header"}>
                    <h1>Đăng ký hồ sơ nộp qua mạng</h1>

                </div>
                <div className={"card-body"}>
                    <div>
                        {checkstateshowview()}

                    </div>
                    <br />
                    {showbtntieptuc()}
                    {showbtnquaylai()}
                    {showbtndangky()}
                    {showbtndangkyvanop()}
                </div>
            </div>
            <div>

            </div>
            {loader}
        </React.Fragment>

    )
}
export default withRouter(Dangkyhoso);