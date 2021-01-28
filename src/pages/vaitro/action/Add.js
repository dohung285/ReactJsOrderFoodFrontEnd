import "primeflex/primeflex.css";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tree } from "primereact/tree";
import React, { useRef, useState } from "react";
import { withRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { EXPRITIME_HIDER_LOADER } from "../../../constants/ConstantString";
import RoleService from "../../../service/RoleService";
import "../css/style.scss";
import "./action.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Add = (props) => {
  // console.log("props", props);
  const { visible, onHide, datachucnangct } = props;

  const roleService = new RoleService();

  // console.log("datachucnangct", datachucnangct);

  const [selectedKeys, setSelectedKeys] = useState(null);
  const [listUUIDChitiet, setListUUIDChitiet] = useState([]);
  const [tenNhomQuyen, setTenNhomQuyen] = useState("");
  const [mota, setMota] = useState("");

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

  // const toast = useRef(null);

  // const showSuccess = (message) => {
  //   toast.current.show({
  //     severity: "success",
  //     summary: "Success Message",
  //     detail: message,
  //     life: 3000,
  //   });
  // };

  // const showError = (message) => {
  //   // toast.current.show({
  //   //   severity: "error",
  //   //   summary: "Error Message",
  //   //   detail: message,
  //   //   life: 3000,
  //   // });
  //   alert(message);
  // };

  function handleOnCloseDialog(params) {
    setSelectedKeys(null);
    onHide();
  }

  // Xử lý nút đồng ý thêm nhóm quyền
  function handleOnYesDialog(name) {
    if (
      tenNhomQuyen === "" ||
      tenNhomQuyen === null ||
      tenNhomQuyen === undefined
    ) {
      // showError("Không được bỏ trống Tên nhóm quyền");
      notifyError("Không được bỏ trống Tên nhóm quyền")
      return;
    }
    if (mota === "" || mota === null || mota === undefined) {
      // showError("Không được bỏ trống mô tả");
      notifyError("Không được bỏ trống mô tả")
      return;
    }
    saveRoleIntoDatabase();
    // props.fetDataUser();
    onHide(name);
  }

  const saveRoleIntoDatabase = async () => {
    const dataBody = {
      ten: tenNhomQuyen,
      mota: mota,
      idchucnangct: listUUIDChitiet,
    };

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
    console.log("returnArray", returnArray);
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
    console.log("datachucnangct", datachucnangct);
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
    // console.log("e", e.target.value);
    let value = e.target.value;
    setTenNhomQuyen(value);
  }

  function handleOnChangeMota(e) {
    let value = e.target.value;
    setMota(value);
  }

  return (
    <div>
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
        header="Thêm mới nhóm quyền"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={onHide}
        footer={renderFooter("displayBasic")}
      >
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="tenNhomQuyen">Tên nhóm quyền</label>
            <InputText
              id="tenNhomQuyen"
              name="tenNhomQuyen"
              type="text"
              onChange={handleOnChangeTenNhomQuyen}
              value={tenNhomQuyen}
            />
          </div>

          <div className="p-field">
            <label htmlFor="mota">Mô tả</label>
            <InputText
              id="mota"
              type="text"
              onChange={handleOnChangeMota}
              value={mota}
            />
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
