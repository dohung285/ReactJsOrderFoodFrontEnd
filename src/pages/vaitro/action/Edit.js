import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tree } from "primereact/tree";
import React, { useState, useRef, useEffect } from "react";
import RoleService from "../../../service/RoleService";

export const Edit = (props) => {
  const { visible, onHide, listNhomQuyenView, datachucnangct } = props;

  // console.log('datachucnangct', datachucnangct);


  function getValueFromDataToMap() {
    // console.log('datachucnangct.length', datachucnangct.length)
    let map = new Map();
    datachucnangct.forEach(element => {
      // console.log('key', Object.values(element)[0])
      // console.log('children', Object.values(element)[3])
      let key = Object.values(element)[0];
      let arryChildren = Object.values(element)[3];
      // console.log('arryChildren', arryChildren)
      let arrayValue = [];
      if (arryChildren.length > 0) {
        for (const x of arryChildren) {
          // console.log('keyChildren', x.key)
          arrayValue.push(x.key);
        }
      }
      map.set(key, arryChildren);
    });
    return map;
  }

  let mapResult = getValueFromDataToMap();
  // console.log('getValueFromDataToMap', getValueFromDataToMap())
  // console.log('size', mapResult.size)

  for (var [key, value] of mapResult) {
    // console.log(key + ' = ' + Object.values(value));
    var result = value.filter(obj => {
      console.log('obj', obj)
    })
  }

  // mapResult.forEach((value, key) => {
  //   console.log('key', key);
  //   console.log('value', Object.values(value))
  // })

  const roleService = new RoleService();

  // console.log("datachucnangct", datachucnangct);

  const [selectedKeys, setSelectedKeys] = useState(null);
  const [listUUIDChitiet, setListUUIDChitiet] = useState([]);
  const [tenNhomQuyen, setTenNhomQuyen] = useState("");
  const [mota, setMota] = useState("");

  const toast = useRef(null);

  const showSuccess = (message) => {
    toast.current.show({
      severity: "success",
      summary: "Success Message",
      detail: message,
      life: 3000,
    });
  };

  const showError = (message) => {
    toast.current.show({
      severity: "error",
      summary: "Error Message",
      detail: message,
      life: 3000,
    });
  };

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
      showError("Không được bỏ trống Tên nhóm quyền");
      return;
    }
    if (mota === "" || mota === null || mota === undefined) {
      showError("Không được bỏ trống mô tả");
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
      setTimeout(props.fetDataUser, 500); // đợi 0.5s sau mới gọi hàm fetData()
    } else {
      let message = result.message;
      showError(message);
    }
  };

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="No"
          icon="pi pi-times"
          // onClick={onHide}
          onClick={handleOnCloseDialog}
          className="p-button-text"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          // onClick={() => onHide(name)}
          onClick={() => handleOnYesDialog(name)}
          autoFocus
        />
      </div>
    );
  };

  //   function handleSelectionChange(e) {
  //     let arrayKey = getKeyParent(map);
  //     let x = e.value;
  //     setSelectedKeys(x);
  //     let arr = [];
  //     if (x) {
  //       arr = Object.keys(x);
  //     }
  //     let returnArray = [];
  //     for (const v of arr) {
  //       if (!arrayKey.includes(v)) {
  //         returnArray.push(v);
  //       }
  //     }
  //     setListUUIDChitiet(returnArray);
  //   }

  function getKeyParent(map) {
    let arrayReturnKey = [];
    if (map instanceof Map) {
      for (const key of map.keys()) {
        arrayReturnKey.push(key);
      }
    }
    return arrayReturnKey;
  }

  //   function setDataForMap() {
  //     let map = new Map();
  //     listNhomQuyenView.forEach((element) => {
  //       let key = Object.values(element)[0];
  //       let objCheck = Object.values(element)[3];
  //       let arrayValue = [];
  //       if (objCheck.length > 0) {
  //         // console.log("key", key);
  //         objCheck.forEach(function (x) {
  //           // console.log("keyChild: ", x.key);
  //           arrayValue.push(x.key);
  //         });
  //         map.set(key, arrayValue);
  //       }
  //     });

  //     return map;
  //   }

  //   let map = setDataForMap();

  function handleOnChangeTenNhomQuyen(e) {
    // console.log("e", e.target.value);
    let value = e.target.value;
    setTenNhomQuyen(value);
  }

  function handleOnChangeMota(e) {
    let value = e.target.value;
    setMota(value);
  }

  useEffect(() => {
    const obj = {
      "e32ea907-60eb-4999-939f-3dd6cdb86d3a": { checked: true },
      //   "8f1ec869-abf4-42d1-bba2-33bd2604e86c": { checked: true },
      "9f0fb98b-7766-41fb-8a1f-9d1ad5aa66ea": { partialChecked: true },

    };
    setSelectedKeys(obj);
  }, []);

  return (
    <div>
      <Dialog
        header="Sửa mới nhóm quyền"
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
            value={listNhomQuyenView}
            selectionMode="checkbox"
            selectionKeys={selectedKeys}
            onSelectionChange={(e) => setSelectedKeys(e.value)}
          // onSelectionChange={handleSelectionChange}
          />
        </div>
      </Dialog>
    </div>
  );
};
