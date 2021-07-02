import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Paginator } from "primereact/paginator";
import { Tag } from "primereact/tag";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useState } from "react";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Moment from "react-moment";
import { withRouter } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EXPRITIME_HIDER_LOADER } from "../../constants/ConstantString";
import {
  PERMISSION_ADD,
  PERMISSION_DELETE,
  PERMISSION_EDIT,
  PERMISSION_ND_DELETE,
  PERMISSION_ND_EDIT,
} from "../../constants/PermissionString";
import {
  convertJsonToQueryString,
  queryStringToJSON,
} from "../../helper/CyberTaxHelper";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import { useRole } from "../../hooks/useRole";
import UserServices from "../../service/UserService";
import AddUser from "./AddUser";
import EditUser from "./EditUser";

const User = (props) => {
  const [visibleAddUser, setVisibleAddUser] = useState(false);
  const [visibleEditUser, setVisibleEditUser] = useState(false);

  // const roleOfUser = useRole();

  const [userObj, setUserObj] = useState({
    hoten: "",
    diachi: "",
    sodienthoai: "",
    tendangnhap: "",
    thudientu: "",
    loai: "",
  });

  const handleHideAddUser = () => {
    // alert('handleHideAddUser')
    setVisibleAddUser(false);
  };

  const onHandleShowAddUser = () => {
    // alert('onHandleShowAddUser');
    setVisibleAddUser(true);
  };

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

  //=================================================================
  const service = new UserServices();
  const [search, setSearch] = useState({
    trangthai: "",
    search: "",
  });

  const [inputSearch, setinputSearch] = useState("");

  const [paginate, setPaginate] = useState({
    page: 0,
    size: 10,
  });
  const [dataUser, setDataUser] = useState();
  const [selectionRecord, setSelectionRecord] = useState();
  const [first, setFirst] = useState(0);
  const [totalRecord, setTotalRecord] = useState();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [listGroupRole, setListGroupRole] = useState();

  const [idUser, setIdUser] = useState("");


  // const [roleOfUser, setRoleOfUser] = useState();

  const [loader, showLoader, hideLoader] = useFullPageLoader();


  // const fetAllRoles = async () => {


  //   const result = await service.getAllRoleWithPaging();
  //   console.log('result', result)
  //   if (result && result.status === 1000) {
  //   //  setRoleOfUser(result)
  //   }
  // };

  const [arrayPermissionSelected, setArrayPermissionSelected] = useState([])
  const getAllPermissionSelected = async (id) => {
    console.log('co chay', id)
    let arrayPermissionSelectedsssssss = [];
    // console.log('co chay vao day')
    const result = await service.getAllPermissionSelected(id)
    // console.log('result: ', result)
    if (result.status === 1000) {
      const array = result.list;
      // console.log('array', array)
      array.forEach(element => {
        // console.log('element: ', element.key, element.label);
        let objPer = {
          name: element.label,
          code: element.key
        }
        arrayPermissionSelectedsssssss.push(objPer)
      });
    }
    console.log('arrayPermissionSelectedsssssss', arrayPermissionSelectedsssssss)
    setArrayPermissionSelected(arrayPermissionSelectedsssssss)
  }



  const fetDataUser = async () => {
    showLoader();

    const result = await service.getDataUser({ ...paginate, ...search });
    if (result && result.status === 1000) {
      setDataUser(result.object);
      setTotalRecord(result.totalItem);
    }

    // setTimeout(hideLoader, EXPRITIME_HIDER_LOADER);
    hideLoader();
  };

  const getAllGroupRole = async () => {
    const result = await service.getAllGroupRole();
    // console.log('result', result.list)
    setListGroupRole(result.list);
  }

  // useEffect(() => {
  //   fetDataUser();
  //   getAllGroupRole();
  //   // eslint-disable-next-line
  //   // getAllPermissionSelected();
  // }, [props.location.search]);

  const onHandleChangeSearch = (e) => {
    let valueSearch = e.target.value;
    // console.log("{...search, [e.target.name]:e.target.value}", {
    //   ...search,
    //   search: valueSearch ,
    // });
    setinputSearch(valueSearch);
    setSearch({ ...search, search: valueSearch });

    // setSearch({ ...search, [e.target.name]: e.target.value });
    // setSearch({ ...search, search: e.target.value });
  };
  const onChangeStatus = (e) => {
    console.log(e.value);
    setSelectedStatus(e.value);
    console.log("search", search);
    console.log("onChangeStatus: ", {
      ...search,
      trangthai: e.value ? e.value.code : "",
    });
    setSearch({ ...search, trangthai: e.value ? e.value.code : "" });
  };

  const onHandleSearchClick = () => {
    const dataSearch = queryStringToJSON(props.location.search);
    console.log("dataSearch", dataSearch);
    const dataSearchQueryString = convertJsonToQueryString({
      ...dataSearch,
      ...search,
    });
    console.log("dataSearchQueryString", dataSearchQueryString);
    props.history.push({
      search: dataSearchQueryString,
    });
  };

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

    setinputSearch("");
  };

  const onPageChange = (event) => {
    setFirst(event.first);
    setPaginate({ ...paginate, size: event.rows, page: event.page });
    let dataSearch = { size: event.rows, page: event.page };
    let queryString = convertJsonToQueryString({ ...dataSearch, ...search });
    props.history.push({
      search: queryString,
    });
  };
  const onHandleDelete = (event) => {
    console.log(event.id);

    setIdUser(event.id);
    setDisplayBasic(true);
  };

  const onHandleEdit = (event) => {
    // console.log(event);

    setUserObj({
      id: event.id,
      hoten: event.hoten,
      diachi: event.diachi,
      sodienthoai: event.sodienthoai,
      tendangnhap: event.tendangnhap,
      thudientu: event.thudientu,
      loai: event.loai,
    });

    setTimeout(function () {
      setVisibleEditUser(true);
    }, 2000);
    getAllPermissionSelected(event.id);
    setVisibleEditUser(true);
  };

  const leftContents = (
    <React.Fragment>
      <InputText
        className={"p-mr-3"}
        // value={search.textSearch}
        value={inputSearch}
        onChange={onHandleChangeSearch}
        tooltip={"Tên, Tên đăng nhập, Số điện thoại"}
        name={"text"}
        placeholder={"Tên, tên đăng nhập, SĐT"}
      />

      <Dropdown
        className={"p-mr-3"}
        style={{ height: "39px" }}
        optionLabel="name"
        value={selectedStatus}
        options={[
          { name: "Hoạt động", code: "0" },
          { name: "Khóa", code: "1" },
        ]}
        onChange={onChangeStatus}
        placeholder="Trạng thái"
        tooltip={"Trạng thái"}
        name={"trangthai"}
        showClear
      />

      <Button
        icon="pi pi-search"
        className="p-mr-2"
        onClick={onHandleSearchClick}
      />
      <Button
        icon="pi pi-refresh"
        className="p-mr-2 p-button-help"
        onClick={onHandleRefresh}
      />
      <Button
        icon="pi pi-plus"
        className="p-mr-2 p-button-success"
        onClick={onHandleShowAddUser}
      />

      {/* <Calendar
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

  const rightContents = (
    <React.Fragment>
      {/* <Button
        icon="pi pi-search"
        className="p-mr-2"
        onClick={onHandleSearchClick}
      />
      <Button
        icon="pi pi-refresh"
        className="p-mr-2 p-button-help"
        onClick={onHandleRefresh}
      />
      <Button
        icon="pi pi-plus"
        className="p-mr-2 p-button-success"
        onClick={onHandleShowAddUser}
      /> */}
      {/* <Button icon="pi pi-trash" className="p-mr-2 p-button-danger" /> */}
    </React.Fragment>
  );
  // const renderRowIndex = (rowData, column) => {
  //   return column.rowIndex + 1 + first;
  // };
  const renderRowCreatedAt = (rowData) => {
    return <Moment format="DD/MM/YYYY H:m:s">{rowData.ngaytao}</Moment>;
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
    // console.log('rowData', rowData)
    return (
      <React.Fragment>
        {/* {roleOfUser.includes(PERMISSION_ND_EDIT) && (
          <i
            className="pi pi-pencil p-mr-2 icon-medium"
            title={"Sửa"}
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => onHandleEdit(rowData)}
          />
        )}
        {roleOfUser.includes(PERMISSION_ND_DELETE) && (
          <i
            className="pi pi-trash icon-medium"
            style={{ color: "red", cursor: "pointer" }}
            title={"Xóa"}
            onClick={() => onHandleDelete(rowData)}
          />
        )} */}


        <i
          className="pi pi-pencil p-mr-2 icon-medium"
          title={"Sửa"}
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => onHandleEdit(rowData)}
        />

        <i
          className="pi pi-trash icon-medium"
          style={{ color: "red", cursor: "pointer" }}
          title={"Xóa"}
          onClick={() => onHandleDelete(rowData)}
        />


      </React.Fragment>
    );
  };

  const [displayBasic, setDisplayBasic] = useState(false);

  // const [position, setPosition] = useState("center");

  const dialogFuncMap = {
    displayBasic: setDisplayBasic,
  };

  // const onClick = (name, position) => {
  //   dialogFuncMap[`${name}`](true);

  //   if (position) {
  //     setPosition(position);
  //   }
  // };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };

  const onHandleDeleteModel = async (name) => {
    console.log("Tham so truyen vao la: ", idUser);
    const result = await service.deleteUser(idUser);
    if (result && result.status === 1000) {
      setTimeout(function () {
        // alert("0k");
        fetDataUser();
      }, EXPRITIME_HIDER_LOADER);
      notifySuccess("Xóa người dùng thành công!");
    }
    if (result && result.status === 1001) {
      let message = result.message;
      notifyError(message);
    }
    onHide(name);
  };

  const renderFooterDelete = (name) => {
    return (
      <div>
        <Button
          label="No"
          icon="pi pi-times"
          onClick={() => onHide(name)}
          className="p-button-text"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          onClick={() => onHandleDeleteModel(name)}
          autoFocus
        />
      </div>
    );
  };

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
      <Dialog
        header="Thông báo xác nhận"
        visible={displayBasic}
        style={{ width: "25vw" }}
        footer={renderFooterDelete("displayBasic")}
        onHide={() => onHide("displayBasic")}
      >
        <p>Bạn có chắc chắn muốn xóa không?</p>
      </Dialog>

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
            rowHover
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "3.3rem" }}
              className="p-text-center"
            />
            {/* <Column
              body={renderRowIndex}
              header="STT"
              headerStyle={{ width: "4rem" }}
              className="p-text-center"
            /> */}
            <Column field="tendangnhap" header="Tên đăng nhập" sortable />
            <Column field="hoten" header="Họ tên" sortable />
            <Column field="sodienthoai" header="Số điện thoại" sortable />
            <Column field="thuedientu" header="Thuế điện tử" sortable />
            <Column field="diachi" header="Địa chỉ" sortable />
            <Column
              field="ngaytao"
              header="Ngày tạo"
              body={renderRowCreatedAt}
              sortable
            />
            <Column field="loai" header="Loại" body={renderRowType} sortable />
            <Column
              field="trangthai"
              header="Trạng thái"
              body={renderRowStatus}
              sortable
            />
            <Column
              header="Tác vụ"
              body={actionBodyTemplate}
              className="p-text-center"
              headerStyle={{ width: "6rem" }}
            />
          </DataTable>
          <div className="p-d-flex p-mt-2">
            <div className="p-mt-3">
              <span>
                Tổng số <b>{totalRecord}</b> bản ghi
              </span>
            </div>
            <div className="p-ml-auto">
              <Paginator
                first={first}
                rows={paginate.size}
                totalRecords={totalRecord}
                rowsPerPageOptions={[10, 20, 50, 100]}
                onPageChange={(event) => onPageChange(event)}
                template=" RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink "
              />
            </div>
          </div>
        </div>

        <AddUser
          visible={visibleAddUser}
          onHide={handleHideAddUser}
          fetDataUser={fetDataUser}
          listGroupRole={listGroupRole}
        />
        <EditUser
          visible={visibleEditUser}
          onHide={() => setVisibleEditUser(false)}
          userObj={userObj}
          fetDataUser={fetDataUser}
          arrayPermissionSelected={arrayPermissionSelected}
        />
      </div>
      {loader}
    </React.Fragment>
  );
};
export default withRouter(User);
