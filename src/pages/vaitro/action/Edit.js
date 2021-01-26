import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tree } from "primereact/tree";
import React, { useState, useRef, useEffect } from "react";
import RoleService from "../../../service/RoleService";

export const Edit = (props) => {
  const {
    visible,
    onHide,
    listNhomQuyenView,
    datachucnangct,
    objRoleTranfer,
  } = props;

  // console.log("objRoleTranfer", objRoleTranfer);

  function getValueFromDataToMap(arr) {
    let map = new Map();
    arr.forEach((element) => {
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

  function getAllKeyChildrenOfMap(params) {
    let arrayReturn = [];
    for (const x of params) {
      // console.log("x in array total", Object.values(x)[0]);
      arrayReturn.push(Object.values(x)[0]);
    }
    return arrayReturn;
  }

  function process() {
    let mapTotal = getValueFromDataToMap(datachucnangct);
    let mapSelected = getValueFromDataToMap(listNhomQuyenView);
    // console.log("MapTotal: ", getValueFromDataToMap(datachucnangct));
    // console.log("MapSelected: ", getValueFromDataToMap(listNhomQuyenView));

    //Lấy ra các keyParent của mapTotal và mapSelected
    let arrayKeyParentOfMapTotal = []; //luu giu cac key parent cua arrayTotal
    let arrayKeyParentOfMapSelected = [];
    let arrayKeyChildrenOfMapTotal = []; //luu giu cac key children cua arrayTotal
    let arrayKeyChildrenOfMapSelected = [];
    let arrayReturnSelectKey = [];

    for (let x of mapTotal.keys()) {
      arrayKeyParentOfMapTotal.push(x);
    }
    for (let x of mapSelected.keys()) {
      arrayKeyParentOfMapSelected.push(x);
    }

    let keysOfMapSelected = arrayKeyParentOfMapSelected.values();

    for (let idParent of keysOfMapSelected) {
      // console.log("IdParent:", idParent);
      // neu keyParent co ton tai
      if (arrayKeyParentOfMapTotal.includes(idParent)) {
        // console.log("Co ton tai");
        // //Lay ra cac keyChildren cua mapTotal va mapSelected
        // console.log("keyChildrenOfMapTotal: ",  mapTotal.get(item));
        let arrTotal = mapTotal.get(idParent);
        arrayKeyChildrenOfMapTotal = getAllKeyChildrenOfMap(arrTotal);
        // console.log("arrayKeyChildrenOfMapTotal", arrayKeyChildrenOfMapTotal);

        let arrSelected = mapSelected.get(idParent);
        arrayKeyChildrenOfMapSelected = getAllKeyChildrenOfMap(arrSelected);
        // console.log('arrayKeyChildrenOfMapSelected', arrayKeyChildrenOfMapSelected)

        //Neu so luong phan tu cua 2 mang arrayKeyChildrenOfMapTotal va arrayKeyParentOfMapSelected bang nhau
        // thi ta se add item (keyParent) va tat ca cac phan tu cua arrayKeyChildrenOfMapTotal || arrayKeyParentOfMapSelected vao mang tra ve
        //{ id : {checked : true } }
        if (
          arrayKeyChildrenOfMapTotal.length ===
          arrayKeyChildrenOfMapSelected.length
        ) {
          // console.log('So luong phan tu 2 mang bang nhau')
          // add keyParent vao mang arrayReturnSelectKey voi thuoc tinh { partialChecked : false , checked : true }
          let objSelectedKeyParent = {
            [idParent]: { checked: true },
          };
          arrayReturnSelectKey.push(objSelectedKeyParent);
          // arrayReturnSelectKey = { ...objSelectedKeyParent };
          // arrayReturnSelectKey.idParent = { checked: true };

          for (const itemChildren of arrayKeyChildrenOfMapTotal) {
            // console.log("itemChildren: ", itemChildren);
            let objSelectedKeyChildren = {
              [itemChildren]: { checked: true },
            };
            arrayReturnSelectKey.push(objSelectedKeyChildren);
            // arrayReturnSelectKey = { ...objSelectedKeyChildren };
            // arrayReturnSelectKey.itemChildren = { checked: true };
          }
        } else {
          // console.log("So luong phan tu hai mang khong bang nhau");
          // add keyParent vao mang arrayReturnSelectKey voi thuoc tinh { partialChecked : true }
          let objSelectedKeyParent = {
            [idParent]: { checked: false, partialChecked: true },
          };
          arrayReturnSelectKey.push(objSelectedKeyParent);
          // arrayReturnSelectKey = { ...objSelectedKeyParent };
          // arrayReturnSelectKey.idParent = {
          //   checked: false,
          //   partialChecked: true,
          // };

          //Sau do kiem tra xem co keyChildren nao o arrayKeyChildrenOfMapSelected nam trong arrayKeyChildrenOfMapTotal
          for (const idKeyChildren of arrayKeyChildrenOfMapSelected) {
            if (arrayKeyChildrenOfMapTotal.includes(idKeyChildren)) {
              let objSelectedKeyChildren = {
                [idKeyChildren]: { checked: true },
              };

              arrayReturnSelectKey.push(objSelectedKeyChildren);
              // arrayReturnSelectKey = { ...objSelectedKeyChildren };
              // arrayReturnSelectKey.idKeyChildren = { checked: true };

              // console.log(arrayReturnSelectKey)
            }
          }
        }
      }
    }
    // console.log("arrayReturnSelectKey",  arrayReturnSelectKey);
    // // const obj = Object.assign({}, arrayReturnSelectKey);
    // console.log('obj', {...arrayReturnSelectKey})
    return arrayReturnSelectKey;
  }

  let objSelected = process();

  // console.log('datachucnangct', datachucnangct);
  //  console.log('listNhomQuyenView', listNhomQuyenView)

  // const arrayA = {
  //   "222222222-60eb-4999-939f-3dd6cdb86d3a": { checked: true },
  //     "8f1ec869-abf4-42d1-bba2-33bd2604e86c": { checked: true },
  //   "555555555-7766-41fb-8a1f-9d1ad5aa66ea": { partialChecked: true },
  // };

  // const arraySelected = {
  //   "e32ea907-60eb-4999-939f-3dd6cdb86d3a": { checked: true },
  //   //   "8f1ec869-abf4-42d1-bba2-33bd2604e86c": { checked: true },
  //   "9f0fb98b-7766-41fb-8a1f-9d1ad5aa66ea": { partialChecked: true },
  // };
  // let mergeX = { ...arrayA };
  // mergeX = {...arraySelected}

  // console.log("mergeX", mergeX);
  useEffect(() => {
    setTenNhomQuyen(objRoleTranfer.ten);
    setMota(objRoleTranfer.mota);

    const obj = {
      "9f0fb98b-7766-41fb-8a1f-9d1ad5aa66ea": { checked: true },
      "e32ea907-60eb-4999-939f-3dd6cdb86d3a": { checked: true },
      "8f1ec869-abf4-42d1-bba2-33bd2604e86c": { checked: true },
      "1e3b0b15-4fe0-4d03-8f34-e595a9f37f4c": { checked: true },
      "fe3e8926-c8d5-45cf-8d2c-dd0b949c52f3": { checked: true },
    };

    setSelectedKeys(obj);
    // process();
    // setSelectedKeys(arraySelected);
  }, []);

  // process();

  // console.log('size', mapResult.size)

  // for (let x of mapResult.keys()) {
  //   console.log(x);
  //   //lấy ra giá của tùng key
  //   console.log("value of Map", mapResult.get(x));
  //   console.log("=======================");
  // }

  //=====================================================================================================

  const roleService = new RoleService();

  // console.log("datachucnangct", datachucnangct);

  const [selectedKeys, setSelectedKeys] = useState([]);
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
      // showError("Không được bỏ trống Tên nhóm quyền");
      alert("Không được bỏ trống Tên nhóm quyền");
      return;
    }
    if (mota === "" || mota === null || mota === undefined) {
      alert("Không được bỏ trống mô tả");
      return;
    }
    setListUUIDChitiet([
      "e32ea907-60eb-4999-939f-3dd6cdb86d3a",
      "8f1ec869-abf4-42d1-bba2-33bd2604e86c",
    ]);
    updateRoleIntoDatabase();
    // props.fetDataUser();
    onHide(name);
  }

  const updateRoleIntoDatabase = async () => {
    const dataBody = {
      ten: tenNhomQuyen,
      mota: mota,
      idchucnangct: [
        "e32ea907-60eb-4999-939f-3dd6cdb86d3a",
        "8f1ec869-abf4-42d1-bba2-33bd2604e86c",
      ],
    };

    const result = await roleService.updateNhomQuyen(
      objRoleTranfer.id,
      dataBody
    );
    if (result && result.status === 1000) {
      let message = result.message;
      setTimeout(props.fetDataUser, 1000); // đợi 0.5s sau mới gọi hàm fetData()
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

  function setDataForMap() {
    let map = new Map();
    listNhomQuyenView.forEach((element) => {
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

  function handleSelectionChange(e) {
    let arrayKey = getKeyParent(map);
    let x = e.value;
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
              value={
                tenNhomQuyen === null ||
                tenNhomQuyen === "" ||
                tenNhomQuyen === undefined
                  ? objRoleTranfer.ten
                  : tenNhomQuyen
              }
            />
          </div>

          <div className="p-field">
            <label htmlFor="mota">Mô tả</label>
            <InputText
              id="mota"
              type="text"
              onChange={handleOnChangeMota}
              value={
                mota === null || mota === "" || mota === undefined
                  ? objRoleTranfer.mota
                  : mota
              }
            />
          </div>
        </div>

        <div className="bg-gr">
          <Tree
            value={datachucnangct}
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
