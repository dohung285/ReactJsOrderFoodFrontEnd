import React, { useState, useEffect } from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import ChungThuSoService from './../../service/ChungThuSoService';
import { Tag } from 'primereact/tag';
import Moment from 'react-moment';
import { Paginator } from 'primereact/paginator';
import { convertJsonToQueryString, queryStringToJSON } from '../../helper/CyberTaxHelper';
import { withRouter } from "react-router-dom";
import { confirmPopup } from 'primereact/confirmpopup';
import 'primeflex/primeflex.css';
import { Dialog } from 'primereact/dialog';
import { Password } from 'primereact/password';
import DialogPlus from './action/DialogPlus';
import DialogEdit from './action/DialogEdit';
import DeleteHandle from './action/DeleteHandle';


const ChungThuSo = (props) => {
    const service = new ChungThuSoService();
    const [search, setSearch] = useState({
        trangthai: "",
    });
    const [paginate, setPaginate] = useState({
        page: 1,
        size: 10,
    });
    const [dataUser, setDataUser] = useState(
        // [{
        //     "iddoanhnghiep": "1b7080a9-1951-420b-a6b5-039dbd519c99",
        //     "masothue": "0133456489",
        //     "ten": "Than Duc Hihi",
        //     "dnchungthuso": "1234",
        //     "nhacungcap": "Cyber",
        //     "chungthuso": null,
        //     "ngaybatdau": "2021-01-19T09:52:21.010+0000",
        //     "ngayketthuc": "2021-01-19T09:52:21.010+0000",
        //     "hosthsm": "HSM",
        //     "apikey": "Kyy",
        //     "passhsm": "HSM",
        //     "trangthai": 0,
        //     "pkcs10": null,
        //     "ngaytao": "2021-01-19T09:52:21.010+0000",
        //     "capnhat": null,
        //     "keygroup": null
        // }]
    );
    const [selectionRecord, setSelectionRecord] = useState();
    const [first, setFirst] = useState(0);
    const [totalRecord, setTotalRecord] = useState();
    const [selectedStatus, setSelectedStatus] = useState("");
    const fetDataUser = async () => {
        const result = await service.getList();
        console.log("result:",result)
        if (result && result.status === 1000) {
            setDataUser(result.object);
            setTotalRecord(result.totalItem);
            console.log(result.totalItem)
            console.log('run');
        }
    };

    const [test, setTest] = useState("i love u");

    const setTestDataUser = (name) => {
        setTest(name);
    }

    useEffect(() => {
        fetDataUser();
        // eslint-disable-next-line
    }, []);
    const onHandleChangeSearch = (e) => {
        setSearch({ ...search, [e.target.name]: e.target.value });
    };
    const onChangeStatus = (e) => {
        console.log(e);
        setSelectedStatus(e.value);
        setSearch({ ...search, trangthai: e.value ? e.value.code : "" });
    };

    const leftContents = (
        <React.Fragment>
            {/* <InputText
                className={"p-mr-3"}
                value={search.text}
                onChange={onHandleChangeSearch}
                tooltip={"Mã, Tên, Tên đăng nhập"}
                name={"text"}
                placeholder={"Mã, tên, tên đăng nhập"}
            />
            <Dropdown
                className={"p-mr-3"}
                style={{ height: "39px" }}
                optionLabel="name"
                value={selectedStatus}
                options={[
                    { name: "Hoạt động", code: "0" },
                    { name: "Khóa", code: "1" }
                ]}
                onChange={onChangeStatus}
                placeholder="Trạng thái"
                tooltip={"Trạng thái"}
                name={"trangthai"}
                showClear
            />
            <Calendar
                dateFormat="dd/mm/yy"
                value={search.created_at}
                onChange={onHandleChangeSearch}
                name={"created_at"}
                showIcon
                placeholder={"Ngày tạo"}
                tooltip={"Ngày tạo"}
            /> */}
        </React.Fragment>
    );
    const onHandleSearchClick = () => {
        const dataSearch = queryStringToJSON(props.location.search);
        const dataSearchQueryString = convertJsonToQueryString({ ...dataSearch, ...search });
        props.history.push({
            search: dataSearchQueryString,
        })
    };
    const onPageChange = (event) => {
        setFirst(event.first);
        setPaginate({ ...paginate, size: event.rows, page: event.page });
        let dataSearch = { size: event.rows, page: event.page };
        let queryString = convertJsonToQueryString({ ...dataSearch, ...search });
        props.history.push({
            search: queryString
        });
    };


    const testFunc = (param) => {
        test = param;
    }
    
    const rightContents = (
        <React.Fragment>
            <Button icon="pi pi-search" className="p-mr-2" onClick={onHandleSearchClick} />
            {/* <Button icon="pi pi-plus" className="p-mr-2 p-button-success" onClick={onHandlePlus} />
            <Button icon="pi pi-trash" className="p-mr-2 p-button-danger" /> */}
            <DialogPlus visible="true" fetDataUser={fetDataUser} test2={setTestDataUser}>
            <h1>Test children props</h1>    
            </DialogPlus>
              
           
        </React.Fragment>
    );
    const renderRowIndex = (rowData, column) => {
        return column.rowIndex + 1 + first;
    };
    const renderRowCreatedAt = (rowData) => {
        return <Moment format="DD/MM/YYYY H:m:s">{rowData.ngaytao}</Moment>
    };
    const renderRowType = (rowData) => {
        const type = rowData.loai === 0 ? "Loại 1" : "Loại 2";
        return <Tag severity="success" value={type} />;
    };
    const renderRowStatus = (rowData) => {
        const status = rowData.trangthai === 0 ? "Hoạt động" : "Khóa";
        return <Tag severity="info" value={status} />;
    };
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                {/* <i className="pi pi-pencil p-mr-2 icon-medium" title={"Sửa"} style={{ color: "blue", cursor: "pointer" }} onClick={() => { props.history.push('/vai-tro') }} /> */}
                <DialogEdit rowData = {rowData} test2={setTestDataUser} fetDataUser={fetDataUser}/>
                {/* <i className="pi pi-trash icon-medium" style={{ color: "red", cursor: "pointer" }} title={"Xóa"} onClick={onHandleDelete} value = "0" /> */}
                <DeleteHandle index={1} />
                
            </React.Fragment>
        );
    };

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;
    
    return (
        <React.Fragment>
            {/* <Card style={{ 'margin-bottom': 10 }}>
                <h1>{test}</h1>
            </Card> */}

            <div className={"card"}>
                <div className={"card-header"}>
                    <h1>Quản lý chứng thư số</h1>
                    <Toolbar left={leftContents} right={rightContents} />
                </div>
                <div className={"card-body"}>
                    <DataTable
                        value={dataUser}
                        selection={selectionRecord}
                        className="p-datatable-responsive-demo"
                        emptyMessage="Không có data"
                        onSelectionChange={(e) => setSelectionRecord(e.value)}
                        rowHover 

                        paginator
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={paginate.size} rowsPerPageOptions={[10,20,50,100]}
                    // paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                        
                        >
                        <Column selectionMode="multiple" headerStyle={{ width: '3.3rem' }} className="p-text-center" />
                        <Column body={renderRowIndex} header="STT" headerStyle={{ width: '4rem' }}
                            className="p-text-center" />
                        <Column field="iddoanhnghiep" header="Mã doanh nghiệp" sortable />
                        <Column field="masothue" header="Mã số thuế" sortable />
                        <Column field="ten" header="Tên" sortable />
                        <Column field="dnchungthuso" header="Doanh nghiệp chứng thư số" sortable />
                        <Column field="nhacungcap" header="Nhà cung cấp" sortable />
                        <Column field="chungthuso" header="Chứng thư số"  sortable />
                        <Column field="ngaybatdau" header="Ngày bắt đầu" body={renderRowCreatedAt} sortable />
                        <Column field="ngayketthuc" header="Ngày kết thúc" body={renderRowCreatedAt} sortable />
                        <Column field="hosthsm" header="Hosthsm"  sortable />
                        <Column field="apikey" header="Apikey"  sortable />
                        <Column field="passhsm" header="Passhsm"  sortable />
                        <Column field="trangthai" header="Trạng thái" sortable />
                        <Column field="pkcs10" header="Pkcs10" sortable />
                        <Column field="ngaytao" header="Ngày tạo" body={renderRowCreatedAt} sortable />
                        <Column field="capnhat" header="Cập nhập" sortable />
                        <Column field="keygroup" header="Keygroup" sortable />
                        <Column
                            header="Tác vụ"
                            body={actionBodyTemplate}
                            className="p-text-center"
                            headerStyle={{ width: '6rem' }}
                        />
                    </DataTable>
                    <div className="p-d-flex p-mt-2">
                        <div className="p-mt-3">
                            <span>Tổng số <b>{totalRecord}</b> bản ghi</span>
                        </div>
                        {/* <div className="p-ml-auto">
                            <Paginator
                                first={first}
                                rows={paginate.size}
                                totalRecords={totalRecord}
                                rowsPerPageOptions={[10, 20, 50, 100]}
                                onPageChange={(event) => onPageChange(event)}
                                template=" RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink " />
                        </div> */}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};
export default withRouter(ChungThuSo);