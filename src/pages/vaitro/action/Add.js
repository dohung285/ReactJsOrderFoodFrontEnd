import "primeflex/primeflex.css";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tree } from "primereact/tree";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EXPRITIME_HIDER_LOADER, MESSAGE_REQUIRE, TIME_OUT_CLOSE_NOTIFY } from "../../../constants/ConstantString";
import RoleService from "../../../service/RoleService";
import "../css/style.scss";
import "./action.css";

const Add = (props) => {
  // console.log("props", props);
  const { visible, onHide, datachucnangct } = props;

  const roleService = new RoleService();

  // console.log("datachucnangct", datachucnangct);

  const [selectedKeys, setSelectedKeys] = useState(null);
  const [listUUIDChitiet, setListUUIDChitiet] = useState([]);

  const [tenNhomQuyen, setTenNhomQuyen] = useState("");
  const [mota, setMota] = useState("");

  const [tenNhomQuyenErrors, setTenNhomQuyenErrors] = useState({})
  const [motaErrors, setMotaErrors] = useState({})


  const formValidation = () => {
    // debugger
    const tenNhomQuyenErrors = {}
    const motaErrors = {}

    let isValid = true;

    if (tenNhomQuyen === '') {
      tenNhomQuyenErrors.tenNhomQuyenRequired = MESSAGE_REQUIRE;
      isValid = false;
    }

    if (mota === '') {
      motaErrors.motaRequired = MESSAGE_REQUIRE;
      isValid = false;
    }
    //=====================

    setTenNhomQuyenErrors(tenNhomQuyenErrors);
    setMotaErrors(motaErrors);

    return isValid;
  }



  const notifySuccess = (message) => {
    toast.success(`🦄 ${message}`, {
      position: "top-right",
      autoClose: TIME_OUT_CLOSE_NOTIFY,
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
      autoClose: TIME_OUT_CLOSE_NOTIFY,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };



  function handleOnCloseDialog(params) {
    setSelectedKeys(null);
    onHide();
  }
  const onResetFormInputErrors = () => {
    setTenNhomQuyenErrors("")
    setMotaErrors("")
  }

  const onResetFormInput = () => {
    setTenNhomQuyen("")
    setMota("")
  }

  // Xử lý nút đồng ý thêm nhóm quyền
  function handleOnYesDialog(name) {

    let isValid = formValidation();
    if (isValid) {
      // console.log('Thanh cong@@@')
      saveRoleIntoDatabase();
      props.fetDataUser();
      onResetFormInput();
      onResetFormInputErrors();
      onHide(name);
    }


  }

  const saveRoleIntoDatabase = async () => {

    const dataBody = {
      ten: tenNhomQuyen,
      mota: mota,
      idchucnangct: listUUIDChitiet,
    };

    // console.log('dataBody', dataBody)

    const result = await roleService.saveRole(dataBody);
    if (result && result.status === 1000) {
      // console.log("result save: ", result);
      let message = result.message;
      setTimeout(props.fetDataUser, EXPRITIME_HIDER_LOADER); // đợi 0.5s sau mới gọi hàm fetData()
      notifySuccess(message)
    } else {
      let message = result.message;
      // showError(message);
      notifyError(message)
    }
  };

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="Hủy"
          icon="pi pi-times"
          // onClick={onHide}
          onClick={handleOnCloseDialog}
          className="p-button-text"
        />
        <Button
          label="Đồng ý"
          icon="pi pi-check"
          // onClick={() => onHide(name)}
          onClick={() => handleOnYesDialog(name)}
          autoFocus
        />
      </div>
    );
  };

  function handleSelectionChange(e) {
    let arrayKey = getKeyParent(map);
    let x = e.value;

    console.log("setSelectedKeys: ", x);
    setSelectedKeys(x);
    let arr = [];
    if (x) {
      arr = Object.keys(x);
    }
    let returnArray = [];
    for (const v of arr) {
      if (!arrayKey.includes(v)) {
        returnArray.push(v);
      }
    }
    // console.log("returnArray", returnArray);
    setListUUIDChitiet(returnArray);
  }

  function getKeyParent(map) {
    let arrayReturnKey = [];
    if (map instanceof Map) {
      for (const key of map.keys()) {
        arrayReturnKey.push(key);
      }
    }
    return arrayReturnKey;
  }

  function setDataForMap() {
    let map = new Map();
    // console.log("datachucnangct", datachucnangct);
    datachucnangct.forEach((element) => {
      let key = Object.values(element)[0];
      let objCheck = Object.values(element)[3];
      let arrayValue = [];
      if (objCheck.length > 0) {
        // console.log("key", key);
        objCheck.forEach(function (x) {
          // console.log("keyChild: ", x.key);
          arrayValue.push(x.key);
        });
        map.set(key, arrayValue);
      }
    });

    return map;
  }

  let map = setDataForMap();

  function handleOnChangeTenNhomQuyen(e) {
    let value = e.target.value;

    if (value.length > 0) {
      setTenNhomQuyenErrors("")
    } else {
      setTenNhomQuyenErrors(MESSAGE_REQUIRE)
    }
    setTenNhomQuyen(value)

  }

  function handleOnChangeMota(e) {
    let value = e.target.value;
    if (value.length > 0) {
      setMotaErrors("")
    } else {
      setMotaErrors(MESSAGE_REQUIRE)
    }
    setMota(value)
  }

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={TIME_OUT_CLOSE_NOTIFY}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Dialog
        header="Thêm mới nhóm quyền"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={onHide}
        footer={renderFooter("displayBasic")}
      >
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col">
            <label htmlFor="tenNhomQuyen">Tên nhóm quyền</label>
            <InputText
              className={Object.keys(tenNhomQuyenErrors).length > 0 ? "error" : null}
              id="tenNhomQuyen"
              name="tenNhomQuyen"
              type="text"
              onChange={handleOnChangeTenNhomQuyen}
              value={tenNhomQuyen}
            />
            {Object.keys(tenNhomQuyenErrors).map((keyIndex, key) => {
              return <span className="errorMessage" key={key} >{tenNhomQuyenErrors[keyIndex]}</span>
            })}
          </div>
          <div className="p-field p-col">
            <label htmlFor="mota">Mô tả</label>
            <InputText
              className={Object.keys(motaErrors).length > 0 ? "error" : null}
              id="mota"
              type="text"
              onChange={handleOnChangeMota}
              value={mota}
            />
            {Object.keys(motaErrors).map((keyIndex, key) => {
              return <span className="errorMessage" key={key} >{motaErrors[keyIndex]}</span>
            })}
          </div>
        </div>

        <div className="bg-gr">
          <Tree
            value={datachucnangct}
            selectionMode="checkbox"
            selectionKeys={selectedKeys}
            //   onSelectionChange={(e) => setSelectedKeys3(e.value)}
            onSelectionChange={handleSelectionChange}
          />
        </div>
      </Dialog>
    </div>
  );
};
export default withRouter(Add);
