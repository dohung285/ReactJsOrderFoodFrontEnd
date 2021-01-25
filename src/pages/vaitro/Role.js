import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Paginator } from 'primereact/paginator';
import { Toolbar } from 'primereact/toolbar';
import Moment from 'react-moment';
import { useHistory, useLocation, withRouter } from "react-router-dom";
import { convertJsonToQueryString, queryStringToJSON } from '../../helper/CyberTaxHelper';
import useFullPageLoader from '../../hooks/useFullPageLoader';
import NhomQuyenService from '../../service/NhomQuyenService';
import RoleService from '../../service/RoleService';
import Add from './action/Add';
import { ViewRole } from './ViewRole';
import { confirmPopup } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Edit } from './action/Edit';




const Role = (props) => {



    const [loader, showLoader, hideLoader] = useFullPageLoader();

    const toast = useRef(null);

    const showInfo = (message) => {
        toast.current.show({ severity: 'info', summary: 'Info Message', detail: message, life: 3000 });
    }

    const showError = (message) => {
        toast.current.show({ severity: 'error', summary: 'Error Message', detail: message, life: 3000 });
    }

    // const service = new UserServices();
    const service = new RoleService();
    const history = useHistory();
    const location = useLocation();



    const [search, setSearch] = useState(
        {
            search: "",
        }
    );
    const [paginate, setPaginate] = useState(
        {
            page: 0,
            size: 10,
        }
    );

    const [inputSearch, setInputSearch] = useState('')


    const [viewDialog, setViewDialog] = useState(false);

    const [viewRole, setViewRole] = useState(false);
    const [dataUser, setDataUser] = useState();
    const [selectionRecord, setSelectionRecord] = useState();
    const [first, setFirst] = useState(0);
    const [totalRecord, setTotalRecord] = useState();
    const [selectedStatus, setSelectedStatus] = useState("");

    const [datachucnangct, setDatachucnangct] = useState([]);
    const [listNhomQuyenView, setlistNhomQuyenView] = useState([]); // lưu trữ danh sách nhóm quyền của user

    const [viewEditNhomQuyen, setViewEditNhomQuyen] = useState(false);


    const nhomQuyenService = new NhomQuyenService();
    const roleService = new RoleService();

    const [idCNCT, setIdCNCT] = useState('');




    const fetDataUser = async () => {
        //  debugger

        showLoader();
        const dataBody = { ...paginate, ...search }
        // console.log('dataBody', dataBody)

        const result = await service.getAllRoleWithPaging(dataBody);
        if (result && result.status === 1000) {

            hideLoader();

            //  console.log(result);
            // console.log('result - LOADING - totalItem: ', result.totalItem);

            setDataUser(result.object);
            setTotalRecord(result.totalItem);
        }


    }
    const searchRoleWithPaging = async (varSearch) => {
        // console.log('{ ...paginate, ...varSearch }', { ...paginate, ...varSearch })
        const result = await service.getAllRoleWithPaging({ ...paginate, ...varSearch });
        if (result && result.status === 1000) {
            setDataUser(result.object);
            // setTotalRecord(result.totalItem);
            // console.log('result searchRoleWithPaging: ', result)
        }
    }



    useEffect(() => {
        fetDataUser();
        // eslint-disable-next-line
    }, [props.location.search]); //props.location.search

    const onHandleChangeSearch = (e) => {
        // console.log(e.target.value);
        // console.log('search', search)
        // console.log('onHandleChangeSearch: ', { ...search, search: e.target.value })
        setInputSearch(e.target.value)
        setSearch({ ...search, search: e.target.value });

    };

    const onChangeStatus = (e) => {
        setSelectedStatus(e.value);
        setSearch({ ...search, trangthai: e.value ? e.value.code : "" });
    };

    const onHandleRefresh = () => {

        // console.log('search.text', search.text)

        // console.log('location', location)
        // console.log('history before', history)
        history.replace({ location: { search: '' } })
        // console.log('history after', history)
        // history.push('/vai-tro')
        setSearch({
            search: "",
        })

        setPaginate(
            {
                page: 0,
                size: 10,
            }
        )

        //clear text ô search


        fetDataUser();


    }


    const leftContents = (
        <React.Fragment>
            <InputText
                className={"p-mr-3"}
                value={search.text}
                // value={inputSearch}
                onChange={onHandleChangeSearch}
                tooltip={"Tên"}
                name={"text"}
                placeholder={"Tên"}
            />
            <Button icon="pi pi-search" className="p-mr-2" onClick={onHandleSearchClick} />
            <Button icon="pi pi-refresh" className="p-mr-2 p-button-help" onClick={onHandleRefresh} />
        </React.Fragment>
    );
    function onHandleSearchClick() {
        // console.log('props.location.search', props.location.search)
        const dataSearch = queryStringToJSON(props.location.search);
        // console.log('dataSearch', dataSearch)
        const dataSearchQueryString = convertJsonToQueryString({ ...dataSearch, ...search });
        // console.log('dataSearchQueryString', dataSearchQueryString)
        props.history.push({
            search: dataSearchQueryString,
        })

        searchRoleWithPaging();

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

    const onHandleDelete = async (name) => {
        const result = await roleService.deleteNhomQuyenCtById(idCNCT);
        if (result && result.status === 1000) {
            console.log('result', result)
            showInfo(result.message)
            setTimeout(fetDataUser, 1000);
            onHide(name)
        }
        if (result && result.status === 1001) {
            console.log('result', result)
            showError(result.message)
            onHide(name)
        }
    }

    const handleDeleteNhomQuyen = (id) => {
        console.log('id', id)
        setIdCNCT(id)
        // onClick('displayBasic')
        let name = 'displayBasic'
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }

    const handleEditNhomQuyen = (id) => {
        console.log('id', id)
        getNhomQuyenById(id);
        getListChucNangCt();
        setViewEditNhomQuyen(true)

        //setIdCNCT(id)
        // onClick('displayBasic')
        // let name = 'displayBasic'
        // dialogFuncMap[`${name}`](true);

        // if (position) {
        //     setPosition(position);
        // }
    }


    const showDialog = () => {
        getListChucNangCt();
        setViewDialog(true);
    };

    const hidenDialog = () => {
        setViewDialog(false);
    };


    const showViewRole = (id) => {
        getNhomQuyenById(id);
        setViewRole(true)
    }

    const hidenViewRole = () => {
        setViewRole(false);
    };

    const hidenViewEditNhomQuyen = () => {
        setViewEditNhomQuyen(false);
    };




    const rightContents = (
        <React.Fragment>
            {/* <Button icon="pi pi-search" className="p-mr-2" onClick={onHandleSearchClick} /> */}
            <Button icon="pi pi-plus" className="p-mr-2 p-button-success" onClick={showDialog} />
            {/* <Button icon="pi pi-trash" className="p-mr-2 p-button-danger" /> */}

        </React.Fragment>
    );

    const renderRowCreatedAt = (rowData) => {
        return <Moment format="DD/MM/YYYY H:m:s">{rowData.ngaytao}</Moment>
    };
    const renderBodyChucNang = (rowData) => {
        // console.log('rowData', rowData.id)
        return (
            <React.Fragment>
                <i className="pi pi-eye p-mr-2 icon-medium" title={"Xem"} style={{ color: "blue", cursor: "pointer" }} onClick={() => showViewRole(rowData.id)} />
            </React.Fragment>
        );
    };
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <i className="pi pi-pencil p-mr-2 icon-medium" title={"Sửa"} style={{ color: "blue", cursor: "pointer" }} onClick={() => handleEditNhomQuyen(rowData.id)} />
                <i className="pi pi-trash icon-medium" style={{ color: "red", cursor: "pointer" }} title={"Xóa"} onClick={() => handleDeleteNhomQuyen(rowData.id)} />
            </React.Fragment>
        );
    };


    const getListChucNangCt = async () => {
        showLoader();
        const result = await nhomQuyenService.getDataNhomQuenCt({ ...paginate, ...search }); //getNhomQuyenCtByI
        if (result && result.status === 1000) {
            hideLoader();
            // setDatachucnangct(result.list);
            console.log('result.list', result.list)
            setDatachucnangct(result.list);


        }
    };


    const getNhomQuyenById = async (id) => {
        showLoader();
        // const result = await nhomQuyenService.getDataNhomQuenCt({ ...paginate, ...search }); //getNhomQuyenCtById
        const result = await roleService.getNhomQuyenCtById(id);
        if (result && result.status === 1000) {
            hideLoader();
            // setDatachucnangct(result.list);
            // console.log('result.list', result.list)
            setlistNhomQuyenView(result.list);
        }
    };


    const [displayBasic, setDisplayBasic] = useState(false);
    const [position, setPosition] = useState('center');

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,

    }

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }


    const renderFooterDelete = (name) => {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={() => onHandleDelete(name)} autoFocus />
            </div>
        );
    }

    // const renderFooterUpdate = (name) => {
    //     return (
    //         <div>
    //             <Button label="No" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
    //             <Button label="Yes" icon="pi pi-check" onClick={() => onHide(name)} autoFocus />
    //         </div>
    //     );
    // }


    return (
        <React.Fragment>
            <Toast ref={toast} position="top-right" />

            <Dialog header="Thông báo xác nhận" visible={displayBasic} style={{ width: '25vw' }} footer={renderFooterDelete('displayBasic')} onHide={() => onHide('displayBasic')}>
                <p>Bạn có chắc chắn muốn xóa không?</p>
            </Dialog>

            {/* <Dialog header="Thông báo xác nhận" visible={displayBasic} style={{ width: '25vw' }} footer={renderFooterDelete('displayBasic')} onHide={() => onHide('displayBasic')}>
                <p>Bạn có chắc chắn muốn cập nhập không?</p>
            </Dialog> */}




            <div className={"card"}>
                <div className={"card-header"}>
                    <h1>Quản lý vai trò</h1>
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

                        <Column selectionMode="multiple" headerStyle={{ width: '3.3rem' }} className="p-text-center" />

                        <Column
                            field="ten"
                            header="Tên"
                            className="p-text-center"
                            sortable
                            headerStyle={{ width: '20rem' }}
                        />
                        <Column
                            field="mota"
                            header="Mô tả"
                            className="p-text-center"
                            headerStyle={{ width: '25rem' }}
                            sortable />
                        <Column field="ngaytao"
                            header="Ngày tạo"
                            body={renderRowCreatedAt}
                            className="p-text-center"
                            sortable
                            headerStyle={{ width: '15rem' }} />
                        <Column
                            header="Chức năng"
                            body={renderBodyChucNang}
                            className="p-text-center"
                            headerStyle={{ width: '6rem' }}
                        />
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
                                template=" RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink " />
                        </div>
                    </div>
                </div>
                {viewDialog ?
                    <Add visible={viewDialog} onHide={hidenDialog} datachucnangct={datachucnangct} fetDataUser={fetDataUser} /> : ""}


                <ViewRole visible={viewRole} onHide={hidenViewRole} listNhomQuyenView={listNhomQuyenView} />
                <Edit visible={viewEditNhomQuyen} onHide={hidenViewEditNhomQuyen} listNhomQuyenView={listNhomQuyenView} datachucnangct={datachucnangct} />
            </div>
            {loader}
        </React.Fragment>

    )
}
export default withRouter(Role);