import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Paginator } from "primereact/paginator";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useRef, useState } from "react";
import Moment from "react-moment";
import { withRouter } from "react-router-dom";
import { EXPRITIME_HIDER_LOADER, TIME_OUT_CLOSE_NOTIFY } from "../../constants/ConstantString";
import { PERMISSION_VT_DELETE, PERMISSION_VT_EDIT } from "../../constants/PermissionString";
import {
  convertJsonToQueryString,
  queryStringToJSON,
} from "../../helper/CyberTaxHelper";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import { useRole } from "../../hooks/useRole";
import NhomQuyenService from "../../service/NhomQuyenService";
import RoleService from "../../service/RoleService";
import Add from "./action/Add";
import { Edit } from "./action/Edit";
import { ViewRole } from "./ViewRole";

const Role = (props) => {

  // const roleOfUser = useRole();
  //==================================================================================
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const toast = useRef(null);

  const showInfo = (message) => {
    toast.current.show({
      severity: "info",
      summary: "Info Message",
      detail: message,
      life: TIME_OUT_CLOSE_NOTIFY,
      
    });
  };

  const showError = (message) => {
    toast.current.show({
      severity: "error",
      summary: "Error Message",
      detail: message,
      life: TIME_OUT_CLOSE_NOTIFY,
    });
  };

  // const service = new UserServices();
  const service = new RoleService();

  const [search, setSearch] = useState({
    search: "",
  });
  const [paginate, setPaginate] = useState({
    page: 0,
    size: 10,
  });

  const [inputSearch, setInputSearch] = useState("");

  const [viewDialog, setViewDialog] = useState(false);

  const [viewRole, setViewRole] = useState(false);
  const [dataUser, setDataUser] = useState();
  const [selectionRecord, setSelectionRecord] = useState();
  const [first, setFirst] = useState(0);
  const [totalRecord, setTotalRecord] = useState();
  // const [selectedStatus, setSelectedStatus] = useState("");

  const [datachucnangct, setDatachucnangct] = useState([]);
  const [listNhomQuyenView, setlistNhomQuyenView] = useState([]); // l??u tr??? danh s??ch nh??m quy???n c???a user

  const [viewEditNhomQuyen, setViewEditNhomQuyen] = useState(false);

  const nhomQuyenService = new NhomQuyenService();
  const roleService = new RoleService();

  const [idCNCT, setIdCNCT] = useState("");

  const [objRoleTranfer, setObjRoleTranfer] = useState({});

  const fetDataUser = async () => {
    //  debugger

    showLoader();
    const dataBody = { ...paginate, ...search };
    // console.log('dataBody', dataBody)

    // console.log("fetdata:", paginate);
    const result = await service.getAllUserAndRole(dataBody);
    if (result && result.status === 1000) {
      //  console.log(result);
      // console.log('result - LOADING - totalItem: ', result.totalItem);
      setDataUser(result.object);
      setTotalRecord(result.totalItem);
    }
    hideLoader();
  };
 

  useEffect(() => {
    fetDataUser();
    // eslint-disable-next-line
  }, [props.location.search]); //props.location.search

  const onHandleChangeSearch = (e) => {
   
    setInputSearch(e.target.value);

    console.log("{ ...search, search: e.target.value }", {
      ...search,
      search: e.target.value,
    });

    setSearch({ ...search, search: e.target.value });
  };

  

  const onHandleRefresh = () => {
    props.history.push({
      search: "",
    });
    setSearch({ search: "" });
    setInputSearch("");
  };

 
  function onHandleSearchClick() {
    // console.log('props.location.search', props.location.search)
    const dataSearch = queryStringToJSON(props.location.search);
    // console.log('dataSearch', dataSearch)
    const dataSearchQueryString = convertJsonToQueryString({
      ...dataSearch,
      ...search,
    });
    // console.log('dataSearchQueryString', dataSearchQueryString)
    props.history.push({
      search: dataSearchQueryString,
    });

    // searchRoleWithPaging();
  }
  const onPageChange = (event) => {
    console.log("on change");
    setFirst(event.first);
    setPaginate({ ...paginate, size: event.rows, page: event.page });

    let dataSearch = { size: event.rows, page: event.page };
    let queryString = convertJsonToQueryString({ ...dataSearch, ...search });
    props.history.push({
      search: queryString,
    });
  };

  const onHandleDelete = async (name) => {
    const result = await roleService.deleteNhomQuyenCtById(idCNCT);
    if (result && result.status === 1000) {
      console.log("result", result);
      showInfo(result.message);
      setTimeout(fetDataUser, EXPRITIME_HIDER_LOADER);
      onHide(name);
    }
    if (result && result.status === 1001) {
      console.log("result", result);
      showError(result.message);
      onHide(name);
    }
  };

  const handleDeleteNhomQuyen = (id) => {
    // console.log('id', id)
    setIdCNCT(id);
    // onClick('displayBasic')
    let name = "displayBasic";
    dialogFuncMap[`${name}`](true);

    if (position) {
      setPosition(position);
    }
  };

  // const [arraySelectedKey, setArraySelectedKey] = useState()

  const handleEditNhomQuyen = (rowData) => {
    // console.log('rowData', rowData)
    let { id, mota, ten } = rowData;

    let objRoleTranfer = {
      id,
      ten,
      mota,
    };
    //    console.log('objRoleTranfer', objRoleTranfer)
    setObjRoleTranfer(objRoleTranfer);
    getNhomQuyenById(id);
    getListChucNangCt();
    

    setViewEditNhomQuyen(true);

  };

  const showDialog = () => {
    getListChucNangCt();
    setViewDialog(true);
  };

  const hidenDialog = () => {
    setViewDialog(false);
  };

  const showViewRole = (id) => {
    getNhomQuyenById(id);
    setViewRole(true);
  };

  const hidenViewRole = () => {
    setViewRole(false);
  };

  const hidenViewEditNhomQuyen = () => {
    setViewEditNhomQuyen(false);
  };

  const leftContents = (
    <React.Fragment>
      <InputText
        className={"p-mr-3"}
        // value={search.text}
        value={inputSearch}
        onChange={onHandleChangeSearch}
        tooltip={"T??n"}
        name={"text"}
        placeholder={"T??n"}
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
        onClick={showDialog}
      />
    </React.Fragment>
  );

  const rightContents = (
    <React.Fragment>
      {/* <Button icon="pi pi-search" className="p-mr-2" onClick={onHandleSearchClick} /> */}
      {/* <Button icon="pi pi-plus" className="p-mr-2 p-button-success" onClick={showDialog} /> */}
      {/* <Button icon="pi pi-trash" className="p-mr-2 p-button-danger" /> */}
    </React.Fragment>
  );

  const renderRowCreatedAt = (rowData) => {
    return <Moment format="DD/MM/YYYY H:m:s">{rowData.ngaytao}</Moment>;
  };
  const renderBodyChucNang = (rowData) => {
    // console.log('rowData', rowData.id)
    return (
      <React.Fragment>
        <i
          className="pi pi-eye p-mr-2 icon-medium"
          title={"Xem"}
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => showViewRole(rowData.id)}
        />
      </React.Fragment>
    );
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>

 <i
          className="pi pi-pencil p-mr-2 icon-medium"
          title={"S???a"}
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => handleEditNhomQuyen(rowData)}
        />

          <i
                  className="pi pi-trash icon-medium"
                  style={{ color: "red", cursor: "pointer" }}
                  title={"Xo??a"}
                  onClick={() => handleDeleteNhomQuyen(rowData.id)}
                />

        {/* {roleOfUser.includes(PERMISSION_VT_EDIT) && (
        <i
          className="pi pi-pencil p-mr-2 icon-medium"
          title={"S???a"}
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => handleEditNhomQuyen(rowData)}
        />
        )}

        {roleOfUser.includes(PERMISSION_VT_DELETE) && (
                <i
                  className="pi pi-trash icon-medium"
                  style={{ color: "red", cursor: "pointer" }}
                  title={"Xo??a"}
                  onClick={() => handleDeleteNhomQuyen(rowData.id)}
                />
        )} */}
      </React.Fragment>
    );
  };

  const getListChucNangCt = async () => {
    const result = await nhomQuyenService.getDataNhomQuenCt({
      // ...paginate,
      // ...search,
    }); //getNhomQuyenCtByI
    if (result && result.status === 1000) {
      // setDatachucnangct(result.list);
      console.log('getListChucNangCt', result.list)
      setDatachucnangct(result.list);
    }
  };

  const getNhomQuyenById = async (id) => {
    // const result = await nhomQuyenService.getDataNhomQuenCt({ ...paginate, ...search }); //getNhomQuyenCtById
    const result = await roleService.getNhomQuyenCtById(id);
    if (result && result.status === 1000) {
      // console.log('getNhomQuyenById', result.list)
      setlistNhomQuyenView(result.list);
    }
  };

  const [displayBasic, setDisplayBasic] = useState(false);
  const [position, setPosition] = useState("center");

  const dialogFuncMap = {
    displayBasic: setDisplayBasic,
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
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
          onClick={() => onHandleDelete(name)}
          autoFocus
        />
      </div>
    );
  };

  return (
    <React.Fragment>
      <Toast ref={toast} position="top-right" />

      <Dialog
        header="Th??ng b??o x??c nh???n"
        visible={displayBasic}
        style={{ width: "25vw" }}
        footer={renderFooterDelete("displayBasic")}
        onHide={() => onHide("displayBasic")}
      >
        <p>B???n c?? ch???c ch???n mu???n x??a kh??ng?</p>
      </Dialog>

      <div className={"card"}>
        <div className={"card-header"}>
          <h1>Qu???n l?? vai tr??</h1>
          <Toolbar left={leftContents} right={rightContents} />
        </div>
        <div className={"card-body"}>
          <DataTable
            value={dataUser}
            selection={selectionRecord}
            className="p-datatable-responsive-demo"
            emptyMessage="Kh??ng c?? data"
            onSelectionChange={(e) => setSelectionRecord(e.value)}
            rowHover
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "3.3rem" }}
              className="p-text-center"
            />

            <Column
              field="id"
              header="ID"
              className="p-text-center"
              sortable
              headerStyle={{ width: "20rem" }}
            />
            <Column
              field="email"
              header="Email"
              className="p-text-center"
              headerStyle={{ width: "25rem" }}
              sortable
            />
            <Column
              field="username"
              header="T??n ????ng nh???p"
              body={renderRowCreatedAt}
              className="p-text-center"
              sortable
              headerStyle={{ width: "15rem" }}
            />
            {/* <Column
              header="Ch???c n??ng"
              body={renderBodyChucNang}
              className="p-text-center"
              headerStyle={{ width: "6rem" }}
            />
            <Column
              header="T??c v???"
              body={actionBodyTemplate}
              className="p-text-center"
              headerStyle={{ width: "6rem" }}
            /> */}
          </DataTable>
          {/* <div className="p-d-flex p-mt-2">
            <div className="p-mt-3">
              <span>
                T???ng s??? <b>{totalRecord}</b> b???n ghi
              </span>
            </div>
            <div className="p-ml-auto">
              <Paginator
                first={first}
                rows={paginate.size}
                totalRecords={totalRecord}
                rowsPerPageOptions={[1, 10, 20, 50, 100]}
                onPageChange={(event) => onPageChange(event)}
                template=" RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink "
              />
            </div>
          </div> */}

        </div>
      

    
      </div>
      {loader}
    </React.Fragment>
  );
};
export default withRouter(Role);
