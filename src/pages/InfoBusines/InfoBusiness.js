import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { confirmPopup } from 'primereact/confirmpopup';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Paginator } from 'primereact/paginator';
import { Tag } from 'primereact/tag';
import { Toolbar } from 'primereact/toolbar';
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { withRouter } from "react-router-dom";
import { convertJsonToQueryString, queryStringToJSON } from '../../helper/CyberTaxHelper';
import useFullPageLoader from '../../hooks/useFullPageLoader';
import InfoBusinessService from './../../service/InfoBusinessService';
import AddBusiness from './action/AddBusiness';
const emptyData = {
    mst: "",
    fax: "",
    thudientu: "",
    website: "",
    macongty: "",
    matinh: "",
    maquanhuyen: "",
    maphuongxa: "",
    diachi: "",
    tendoanhnghiep: "",
    tenthuongmai: "",
    tencoquanthue: "",
    linhvuckinhdoanh: "",
    lachinhanh: "",
    masothuedoanhnghiepme: "",
    tendoanhnghiepme: "",
    loaihinhkinhdoanh: "",
    mota: "",
    macoquanthue: "",
    tennguoidaidien: "",
    tennguoinopthue: "",
    sodienthoai: ""
}
const ThongTinDoanhNghiep = (props) => {
    const service = new InfoBusinessService();
    const [listData, setListData] = useState();
    // dialog xóa
    const [dialogDelete, setDialogDelete] = useState(false);
    // data thêm mới,  xóa
    const [adData, setAdData] = useState(emptyData);
    // check quyền
    const [typeRole, setTypeRole] = useState(1);
    // loại xóa nhiều xóa 1
    const [typeDelete, setTypeDelete] = useState(1);
    // loại thêm mới hay sửa
    const [typeAd, setTypeAd] = useState(1);
    // data lỗi validate
    const [errData, setErrdata] = useState({});
    // dialog thêm, sửa
    const [visibleDialog, setVisibleDialog] = useState(false);
    // data xóa nhiều
    const [selectedDatas, setSelectedDatas] = useState([]);
    const [trangthai, setTrangThai] = useState({
        trangthai: "",

    });
    const [search, setSearch] = useState({
        search: "",

    });
    const [paginate, setPaginate] = useState({
        page: 0,
        size: 10,
    });
    const [dataInfoBusiness, setDataInfoBusiness] = useState();
    const [selectionRecord, setSelectionRecord] = useState();
    const [first, setFirst] = useState(0);
    const [totalRecord, setTotalRecord] = useState();
    const [selectedStatus, setSelectedStatus] = useState("");
    const [viewDialog, setViewDialog] = useState(false);

    const [viewEditInfoBussiness, setViewEditInfoBussiness] = useState(false);
    const [showInfoBussinessById, setShowInfoBussinessById] = useState();
    const [loader, showLoader, hideLoader] = useFullPageLoader();

    // function search data
    const fetDataInfoBusiness = async () => {
        showLoader()
        const result = await service.getDataInfoBusiness({ ...paginate, ...search, ...trangthai });
        if (result && result.status === 1000) {
            setDataInfoBusiness(result.object);
            setTotalRecord(result.totalItem);
        }
        hideLoader()
    };


    // const handleEditInfoBussiness = (rowData) => {
    //     setShowInfoBussinessById(rowData);
    //     setViewDialog(true);

    // }
    useEffect(() => {
        fetDataInfoBusiness();
        // eslint-disable-next-line
    }, [props.location.search]);

    // dialog thêm mới
    const onCreateClick = () => {
        setAdData(emptyData);
        setVisibleDialog(true);
        setTypeAd(1);
    }
    // dialog sửa
    const onEditClick = (rowData) => {
        setAdData(rowData);
        setTypeAd(2);
        setVisibleDialog(true);
    }
    // export dữ liệu
    //Ẩn dialog thêm mới, cập nhật
    const onHideDialog = () => {
        setErrdata({});
        setVisibleDialog(false);
    }
// function Refresh 
    const onHandleRefresh = () => {
        props.history.push({
          search: "",
        });
        setSearch({
          trangthai: "",
          search: "",
        });
    
        setPaginate({
          page: 0,
          size: 10,
        });
    
        setSearch("");
      };


    const onHandleChangeSearch = (e) => {
        setSearch({ ...search, [e.target.name]: e.target.value })
    };
    const onChangeStatus = (e) => {
        setSelectedStatus(e.value);

        setTrangThai({ ...trangthai, trangthai: e.value ? e.value.code : "" });
    };

    const showDialog = () => {
        setViewDialog(true);
        setViewEditInfoBussiness(true)
    };

    const hidenDialog = () => {
        setViewDialog(false);
        setViewEditInfoBussiness(false)
    };

    const onHandleSearchClick = () => {
        const dataSearch = queryStringToJSON(props.location.search);
        const dataSearchQueryString = convertJsonToQueryString({ ...dataSearch, ...search, ...trangthai });
        props.history.push({
            search: dataSearchQueryString,
        })
    };

    const leftContents = (
        <React.Fragment>
            <InputText
                className={"p-mr-3"}
                value={search.search}
                onChange={onHandleChangeSearch}
                tooltip={"Mã, Tên công ty"}
                name={"search"}
                placeholder={"Mã, Tên công ty"}
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
            <Button icon="pi pi-search" className="p-mr-2" onClick={onHandleSearchClick} />
            <Button icon="pi pi-refresh" className="p-mr-2 p-button-help" onClick={onHandleRefresh} />
            <Button icon="pi pi-plus" className="p-mr-2 p-button-success" onClick={onCreateClick} />
        </React.Fragment>
    );

    const onPageChange = (event) => {
        setFirst(event.first);
        setPaginate({ ...paginate, size: event.rows, page: event.page });
        let dataSearch = { size: event.rows, page: event.page };
        let queryString = convertJsonToQueryString({ ...dataSearch, ...search, ...trangthai });
        props.history.push({
            search: queryString
        });
    };
    const onHandleDelete = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Do you want to delete this record?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
        });
    };


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
                <i className="pi pi-pencil p-mr-2 icon-medium"
                    title={"Sửa"} style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => onEditClick(rowData)} />
            </React.Fragment>
        );
    };
    return (
        <React.Fragment>
            <div className={"card"}>
                <div className={"card-header"}>
                    <h1>Danh sách doanh nghiệp</h1>
                    <Toolbar left={leftContents}  />
                </div>
                <div className={"card-body"}>
                    <DataTable
                        value={dataInfoBusiness}
                        selection={selectionRecord}
                        className="p-datatable-responsive-demo"
                        emptyMessage="Không có data"
                        onSelectionChange={(e) => setSelectionRecord(e.value)}
                        rowHover >
                        <Column selectionMode="multiple" headerStyle={{ width: '3.3rem' }} className="p-text-center" />
                        <Column body={renderRowIndex} header="STT" headerStyle={{ width: '4rem' }}
                            className="p-text-center" />
                        <Column field="mst" header="Mã số thuế" sortable />
                        <Column field="tendoanhnghiep" header="Tên công ty" sortable />
                        <Column field="ngaytao" header="Ngày tạo" body={renderRowCreatedAt} sortable />
                        <Column field="trangthai" header="Kích hoạt" body={renderRowStatus} sortable />

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
            </div>
            <AddBusiness
                visible={visibleDialog}
                onHideDialog={onHideDialog}
                adData={adData} setAdData={setAdData}
                errData={errData} setErrdata={setErrdata}
                dataInfoBusiness={dataInfoBusiness}
                typeAd={typeAd}
                fetDataInfoBusiness={fetDataInfoBusiness}

            />
            {loader}
        </React.Fragment>
    )
};
export default withRouter(ThongTinDoanhNghiep);