import React, {useState, useEffect} from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import UserServices from '../service/UserService';
import { Tag } from 'primereact/tag';
import Moment from 'react-moment';
import { Paginator } from 'primereact/paginator';
import {convertJsonToQueryString, queryStringToJSON} from '../helper/CyberTaxHelper';
import { withRouter } from "react-router-dom";
import { confirmPopup } from 'primereact/confirmpopup';
const User = (props) => {
    const service = new UserServices();
    const [search, setSearch] = useState({
        trangthai:"",
    });
    const [paginate, setPaginate] = useState({
        page:0,
        size:10,
    });
    const [dataUser,setDataUser] = useState();
    const [selectionRecord, setSelectionRecord] = useState();
    const [first, setFirst] = useState(0);
    const [totalRecord, setTotalRecord] = useState();
    const [selectedStatus, setSelectedStatus] = useState("");
    const fetDataUser = async () => {
        const result = await service.getDataUser({...paginate,...search});
        if (result && result.status === 1000){
            setDataUser(result.object);
            setTotalRecord(result.totalItem);
        }
    };

    useEffect(() => {
        fetDataUser();
        // eslint-disable-next-line
    }, [props.location.search]);
    const onHandleChangeSearch = (e) => {
        setSearch({...search, [e.target.name]:e.target.value});
    };
    const onChangeStatus = (e) => {
        console.log(e.value);
        setSelectedStatus(e.value);
        console.log('search', search)
        console.log('onChangeStatus: ', {...search, trangthai:e.value ? e.value.code : ""})
        setSearch({...search, trangthai:e.value ? e.value.code : ""});
    };

    const leftContents = (
        <React.Fragment>

            <InputText
                className={"p-mr-3"}
                value={search.text}
                onChange={onHandleChangeSearch}
                tooltip={"Mã, Tên, Tên đăng nhập"}
                name={"text"}
                placeholder={"Mã, tên, tên đăng nhập"}
            />

            <Dropdown
                className={"p-mr-3"}
                style={{height:"39px"}}
                optionLabel="name"
                value={selectedStatus}
                options={[
                    {name:"Hoạt động",code:"0"},
                    {name:"Khóa",code:"1"}
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
            />
        </React.Fragment>
    );
    const onHandleSearchClick = () => {
        const dataSearch = queryStringToJSON(props.location.search);
        const dataSearchQueryString = convertJsonToQueryString({...dataSearch, ...search});
        props.history.push({
            search:dataSearchQueryString,
        })
    };
    const onPageChange = (event) => {
        setFirst(event.first);
        setPaginate({...paginate, size:event.rows, page:event.page});
        let dataSearch = { size: event.rows, page: event.page };
        let queryString = convertJsonToQueryString({...dataSearch, ...search});
        props.history.push({
            search: queryString
        });
    };
    const onHandleDelete = (event) => {
        console.log(event);
        confirmPopup({
            target: event.currentTarget,
            message: 'Do you want to delete this record?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            // accept,
            // reject
        });
    };
    const rightContents = (
        <React.Fragment>
            <Button icon="pi pi-search" className="p-mr-2" onClick={onHandleSearchClick}/>
            <Button icon="pi pi-plus" className="p-mr-2 p-button-success" />
            <Button icon="pi pi-trash" className="p-mr-2 p-button-danger" />
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
        return <Tag severity="success" value={type}/>;
    };
    const renderRowStatus = (rowData) => {
        const status = rowData.trangthai === 0 ? "Hoạt động" : "Khóa";
        return <Tag severity="info" value={status}/>;
    };
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <i className="pi pi-pencil p-mr-2 icon-medium" title={"Sửa"} style={{color:"blue",cursor:"pointer"}} onClick={() => {props.history.push('/vai-tro')}}/>
                <i className="pi pi-trash icon-medium" style={{color:"red",cursor:"pointer"}} title={"Xóa"} onClick={onHandleDelete}/>
            </React.Fragment>
        );
    };
    return (
        <React.Fragment>
            <div className={"card"}>
                <div className={"card-header"}>
                    <h1>Quản lý người dùng</h1>
                    <Toolbar left={leftContents} right={rightContents} />
                </div>
                <div className={"card-body"}>
                <DataTable
                    value={dataUser}
                    selection={selectionRecord}
                    className="p-datatable-responsive-demo"
                    emptyMessage="Không có data"
                    onSelectionChange={(e) => setSelectionRecord(e.value)}
                    rowHover >
                    <Column selectionMode="multiple" headerStyle={{ width: '3.3rem' }} className="p-text-center"/>
                    <Column body={renderRowIndex} header="STT" headerStyle={{ width: '4rem' }}
                            className="p-text-center" />
                    <Column field="tendangnhap" header="Tên đăng nhập" sortable />
                    <Column field="hoten" header="Họ tên" sortable />
                    <Column field="sodienthoai" header="Số điện thoại" sortable />
                    <Column field="thuedientu" header="Thuế điện tử" sortable />
                    <Column field="diachi" header="Địa chỉ" sortable />
                    <Column field="ngaytao" header="Ngày tạo" body={renderRowCreatedAt} sortable />
                    <Column field="loai" header="Loại" body={renderRowType} sortable />
                    <Column field="trangthai" header="Trạng thái" body={renderRowStatus} sortable />
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
                    <div className="p-ml-auto">
                        <Paginator
                            first={first}
                            rows={paginate.size}
                            totalRecords={totalRecord}
                            rowsPerPageOptions={[10, 20, 50, 100]}
                            onPageChange={(event) => onPageChange(event)}
                            template=" RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink "/>
                    </div>
                </div>
                </div>
            </div>
        </React.Fragment>
    )
};
export default withRouter(User);