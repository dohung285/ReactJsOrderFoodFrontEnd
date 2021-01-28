import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Paginator } from "primereact/paginator";
import { Tag } from "primereact/tag";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { withRouter } from "react-router-dom";
import {
  convertJsonToQueryString,
  queryStringToJSON,
} from "../../helper/CyberTaxHelper";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import RegisterTvanService from "../../service/RegisterTvanService";

const RegisterTVAN = (props) => {
  //==================================================================================
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const [search, setSearch] = useState({
    search: "",
  });

  const [paginate, setPaginate] = useState({
    page: 0,
    size: 10,
  });

  const [masothue, setMasothue] = useState({
    masothue: "",
  });

  const [inputSearch, setInputSearch] = useState("");

  const [data, setData] = useState();
  const [selectionRecord, setSelectionRecord] = useState();
  const [first, setFirst] = useState(0);
  const [totalRecord, setTotalRecord] = useState();

  const registerTVANService = new RegisterTvanService();

  const fetData = async () => {
    //  debugger

    showLoader();
    const dataBody = { ...paginate, ...search };

    const result = await registerTVANService.getAllWithPaging(dataBody);
    if (result && result.status === 1000) {
      setData(result.object);
      setTotalRecord(result.totalItem);
    }
    hideLoader();
  };

  const searchWithPaging = async (dataBody) => {
    const result = await registerTVANService.searchWithMstAndPaging({
      dataBody,
    });
    if (result && result.status === 1000) {
      setData(result.object);
      // setTotalRecord(result.totalItem);
      // console.log('result searchRoleWithPaging: ', result)
    }
  };

  useEffect(() => {
    fetData();
    // eslint-disable-next-line
  }, [props.location.search]); //props.location.search

  // update state
  const fetDataWithSearch = async () => {
    //  debugger

    const dataBody = { masothue: inputSearch };
    showLoader();
    const result = await registerTVANService.searchWithMstAndPaging(dataBody);
    if (result && result.status === 1000) {
      console.log("result: ", result.object);
      setData(result.object);
      setTotalRecord(result.totalItem);
    }
    hideLoader();
  };

  const onHandleChangeSearch = (e) => {
    setInputSearch(e.target.value);
    setSearch({ ...search, masothue: e.target.value });
  };
  const onHandleRefresh = () => {
    setInputSearch('')
    fetData();
  };

  const leftContents = (
    <React.Fragment>
      <InputText
        className={"p-mr-3"}
        // value={search.text}
        value={inputSearch}
        onChange={onHandleChangeSearch}
        tooltip={"Mã số thuế"}
        name={"text"}
        placeholder={"Mã số thuế"}
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
    </React.Fragment>
  );
  function onHandleSearchClick() {
    if (inputSearch === "") {
      alert("chua nhap ma so thue!");
      return;
    }
    fetDataWithSearch();
    // console.log('ok');
    // console.log("fuck:",fetDataWithSearch());
    // console.log("text search:", inputSearch)

    // const dataSearch = queryStringToJSON(props.location.search);
    // console.log("dataSearch", dataSearch);
    // const dataSearchQueryString = convertJsonToQueryString({
    //   ...dataSearch,
    //   ...search,
    // });
    // console.log('dataSearchQueryString', dataSearchQueryString)
    // console.log('props before', props)
    // props.history.push({
    //   search: dataSearchQueryString,
    // });
    // console.log('props after: ', props)

    // console.log('{...paginate,...dataSearchQueryString}', {...paginate,...dataSearchQueryString})

    // //  searchWithPaging({...paginate,...dataSearchQueryString});
  }
  const onPageChange = (event) => {
    setFirst(event.first);
    setPaginate({ ...paginate, size: event.rows, page: event.page });
    let dataSearch = { size: event.rows, page: event.page };
    let queryString = convertJsonToQueryString({ ...dataSearch, ...search });
    console.log("props", props);
    props.history.push({
      search: queryString,
    });
  };

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
        />
      </React.Fragment>
    );
  };

  const renderBodyTrangThai = (rowData) => {
    const status = rowData.trangthai;
    let valueStatus = "";
    if (status === 0) {
      valueStatus = "Đăng kí thành công";
      return <Tag severity="success" value={valueStatus} />;
    } else if (status === 1) {
      valueStatus = "Chờ phê duyệt";
      return <Tag severity="warning" value={valueStatus} />;
    } else if (status === 2) {
      valueStatus = "Đã gửi tổng cục thuế";
      return <Tag severity="Danger" value={valueStatus} />;
    } else {
      valueStatus = "Đăng kí TVAN thành công";
      return <Tag severity="success" value={valueStatus} />;
    }
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <i
          className="pi pi-pencil p-mr-2 icon-medium"
          title={"Active"}
          style={{ color: "blue", cursor: "pointer" }}
          onClick={()=>alert('Acitve')}
        />
        <i
          className="pi pi-trash icon-medium"
          style={{ color: "red", cursor: "pointer" }}
          title={"DeActive"}
        />
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <div className={"card"}>
        <div className={"card-header"}>
          <h1>Quản lý đăng ký</h1>
          <Toolbar left={leftContents} right={rightContents} />
        </div>
        <div className={"card-body"}>
          <DataTable
            value={data}
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

            <Column
              field="mst"
              header="Mã số thuế"
              className="p-text-center"
              sortable
              headerStyle={{ width: "20rem" }}
            />
            <Column
              field="macongty"
              header="Mã công ty"
              className="p-text-center"
              headerStyle={{ width: "25rem" }}
              sortable
            />
            <Column
              field="tendoanhnghiep"
              header="Tên doanh nghiệp"
              className="p-text-center"
              sortable
              headerStyle={{ width: "15rem" }}
            />
            <Column
              field="thudientu"
              header="Thư điện tử"
              className="p-text-center"
              sortable
              headerStyle={{ width: "15rem" }}
            />
            <Column
              field="tencoquanthue"
              header="Tên cơ quan thuế"
              className="p-text-center"
              sortable
              headerStyle={{ width: "15rem" }}
            />
            <Column
              field="trangthai"
              header="Trạng thái"
              className="p-text-center"
              body={renderBodyTrangThai}
              sortable
              headerStyle={{ width: "15rem" }}
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
      </div>
      {loader}
    </React.Fragment>
  );
};
export default withRouter(RegisterTVAN); //RegisterTVAN;    //
