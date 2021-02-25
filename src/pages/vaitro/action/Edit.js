import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tree } from "primereact/tree";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EXPRITIME_HIDER_LOADER, MESSAGE_REQUIRE, TIME_OUT_CLOSE_NOTIFY } from "../../../constants/ConstantString";
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
    // console.log("arrayReturnSelectKey", arrayReturnSelectKey);
    // // const obj = Object.assign({}, arrayReturnSelectKey);
    // console.log('obj', {...arrayReturnSelectKey})
    return arrayReturnSelectKey;
  }

  // const obj = {
  //   "9f0fb98b-7766-41fb-8a1f-9d1ad5aa66ea": { checked: true },
  //   "e32ea907-60eb-4999-939f-3dd6cdb86d3a": { checked: true },
  //   "8f1ec869-abf4-42d1-bba2-33bd2604e86c": { checked: true },
  //   "1e3b0b15-4fe0-4d03-8f34-e595a9f37f4c": { checked: true },
  //   "fe3e8926-c8d5-45cf-8d2c-dd0b949c52f3": { checked: true },
  // };

  // console.log(obj);
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
  // useEffect(() => {
  //   setTenNhomQuyen(objRoleTranfer.ten);
  //   setMota(objRoleTranfer.mota);

  //   //getStateNodeSelectedKey();

  //   // let objSelected = process();
  //   // console.log('objSelected', objSelected)
  //   // var dumpObj = [];
  //   // objSelected.forEach(el => {
  //   //   Object.keys(el).forEach(function (key) {
  //   //     dumpObj[key] = el[key];
  //   //     // dumpObj = dumpObj.push({[key]: el[key]});
  //   //     // console.log({[key]: el[key]});
  //   //   });
  //   // });
  //   // console.log(dumpObj)
  //   // setSelectedKeys(dumpObj);

  //   // const obj = {
  //   //   "9f0fb98b-7766-41fb-8a1f-9d1ad5aa66ea": { checked: true },
  //   //   "e32ea907-60eb-4999-939f-3dd6cdb86d3a": { checked: true },
  //   //   "8f1ec869-abf4-42d1-bba2-33bd2604e86c": { checked: true },
  //   //   "1e3b0b15-4fe0-4d03-8f34-e595a9f37f4c": { checked: true },
  //   //   "fe3e8926-c8d5-45cf-8d2c-dd0b949c52f3": { checked: true },
  //   // };

  //   // setSelectedKeys(obj);
  //   // process();
  //   // setSelectedKeys(arraySelected);
  // }, []);

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
  // const [listUUIDChitiet, setListUUIDChitiet] = useState([]);
  const [tenNhomQuyen, setTenNhomQuyen] = useState();  //objRoleTranfer.ten
  const [mota, setMota] = useState(); //objRoleTranfer.id

  const [tenNhomQuyenErrors, setTenNhomQuyenErrors] = useState({});
  const [motaErrors, setMotaErrors] = useState({});

  const formValidation = () => {
    // debugger
    const tenNhomQuyenErrors = {};
    const motaErrors = {};

    let isValid = true;

    if (tenNhomQuyen === "") {
      tenNhomQuyenErrors.tenNhomQuyenRequired = MESSAGE_REQUIRE;
      isValid = false;
    }

    if (mota === "") {
      motaErrors.motaRequired = MESSAGE_REQUIRE;
      isValid = false;
    }
    //=====================

    setTenNhomQuyenErrors(tenNhomQuyenErrors);
    setMotaErrors(motaErrors);

    return isValid;
  };

  function getStateNodeSelectedKey() {
    let objSelected = process();
    // console.log('objobjSelectedect', objSelected)
    var dumpObj = [];
    objSelected.forEach((el) => {
      Object.keys(el).forEach(function (key) {
        dumpObj[key] = el[key];
        // console.log('dumpObj', dumpObj)
      });
    });
    // console.log({dumpObj});
    // console.log(dumpObj);
    // console.log('typeof', typeof dumpObj)
    setSelectedKeys(dumpObj);
  }

  function handleOnCloseDialog(params) {
    onResetFormInput();
    onResetFormInputErrors();
    setSelectedKeys([]);
    onHide();
    // getStateNodeSelectedKey();
  }

  const onResetFormInputErrors = () => {
    setTenNhomQuyenErrors("");
    setMotaErrors("");
  };

  const onResetFormInput = () => {
    setTenNhomQuyen("");
    setMota("");
  };

  // Xử lý nút đồng ý thêm nhóm quyền
  function handleOnYesDialog(name) {
    // console.log('tenNhomQuyen', tenNhomQuyen)
    // console.log('mota', mota)
    let isValid = formValidation();
    if (isValid) {
      console.log("Thanh cong@@@");
      updateRoleIntoDatabase();
      // props.fetDataUser();
      onResetFormInput();
      onResetFormInputErrors();
      onHide(name);
    }else{
      console.log('Thất bại')
    }
  }

  const updateRoleIntoDatabase = async () => {
    //lấy ra danh sách chức năng chi tiết
    console.log("selectedKeys", selectedKeys);

    let tempArray = Object.keys(selectedKeys);

    let mapTotal = getValueFromDataToMap(datachucnangct);

    let arrayKeyParentOfMapTotal = []; //luu giu cac key parent cua arrayTotal
    let arrayIdChucNangCT = [];
    for (let x of mapTotal.keys()) {
      arrayKeyParentOfMapTotal.push(x);
    }
    tempArray.forEach((el) => {
      if (!arrayKeyParentOfMapTotal.includes(el)) {
        arrayIdChucNangCT.push(el);
      }
    });

    console.log("arrayIdChucNangCT", arrayIdChucNangCT);

    const dataBody = {
      ten:
        tenNhomQuyen === null ||
        tenNhomQuyen === undefined ||
        tenNhomQuyen === ""
          ? objRoleTranfer.ten
          : tenNhomQuyen,
      mota:
        mota === null || mota === undefined || mota === ""
          ? objRoleTranfer.mota
          : mota,
      idchucnangct: arrayIdChucNangCT,
    };

    console.log("dataBody", dataBody);

    const result = await roleService.updateNhomQuyen(
      objRoleTranfer.id,
      dataBody
    );
    if (result && result.status === 1000) {
      let message = result.message;
      console.log('message', message)
      setTimeout(props.fetDataUser, EXPRITIME_HIDER_LOADER); // đợi 0.5s sau mới gọi hàm fetData()
      notifySuccess('Sửa nhóm quyền thành công!')
    } else {
      let message = result.message;
      // showError(message);
      notifyError(message)
    }
    setActiveIndex(null);
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

  // function setDataForMap() {
  //   let map = new Map();
  //   listNhomQuyenView.forEach((element) => {
  //     let key = Object.values(element)[0];
  //     let objCheck = Object.values(element)[3];
  //     let arrayValue = [];
  //     if (objCheck.length > 0) {
  //       // console.log("key", key);
  //       objCheck.forEach(function (x) {
  //         // console.log("keyChild: ", x.key);
  //         arrayValue.push(x.key);
  //       });
  //       map.set(key, arrayValue);
  //     }
  //   });

  //   return map;
  // }

  // let map = setDataForMap();

  // function handleSelectionChange(e) {
  //   let arrayKey = getKeyParent(map);
  //   let x = e.value;
  //   setSelectedKeys(x);
  //   let arr = [];
  //   if (x) {
  //     arr = Object.keys(x);
  //   }
  //   let returnArray = [];
  //   for (const v of arr) {
  //     if (!arrayKey.includes(v)) {
  //       returnArray.push(v);
  //     }
  //   }

  //   setListUUIDChitiet(returnArray);
  // }

  // function getKeyParent() {
  //   let map = setDataForMap();
  //   let arrayReturnKey = [];
  //   if (map instanceof Map) {
  //     for (const key of map.keys()) {
  //       arrayReturnKey.push(key);
  //     }
  //   }
  //   return arrayReturnKey;
  // }

  function handleOnChangeTenNhomQuyen(e) {
    // console.log("e", e.target.value);
    let value = e.target.value;
    // console.log('value', value)
    setTenNhomQuyen(value);
  }

  function handleOnChangeMota(e) {
    let value = e.target.value;
    // console.log('value', value)
    setMota(value);
  }

  const [activeIndex, setActiveIndex] = useState(null);
  function handleOnChangeAccordion(e) {
    getStateNodeSelectedKey();
    setActiveIndex(e.index);
  }

  function handleOnChangeSelectedKey(e) {
    // console.log("e", e.value);
    // console.log('selectedKeys', selectedKeys)
    setSelectedKeys(e.value);
  }
  // function handOnSelected(params) {
  //   console.log("handOnSelected", params.node);
  //   setSelectedKeys(params.node);
  // }

  function handOnUnSelected(params) {
    // console.log("handOnUnSelected", params.node);

    // console.log("key", params.node.key);
    // console.log("children", params.node.children);

    // lay ra danh sach keyParent va keyChildren de xoa khoa selectedKeys
    let arrayKeys = []; // khai bao bien arrayKey de chua danh sach cac key can xoa khi unselected
    let keySelected = params.node.key;
    let arrayReturnSelectKey = [];
    arrayKeys.push(keySelected);
    let listChildren = Array.isArray(params.node.children)
      ? params.node.children
      : [];
    if (listChildren.length > 0) {
      listChildren.map((x) => {
        arrayKeys.push(x.key);
      });
      //console.log("Day la node Cha - co danh sach con");
      const arrayKeySelected = processRemoveElementSelectedTreeNode(arrayKeys);
      if (arrayKeySelected.length === 0) {
        setSelectedKeys(arrayKeySelected);
      }
    } else {
      //console.log("Day la node con");
      const arrayKeySelected = processRemoveElementSelectedTreeNode(arrayKeys);
      // console.log("arrayKeySelected", arrayKeySelected);

      let mapTotal = getValueFromDataToMap(datachucnangct);
      //Lấy ra các keyParent của mapTotal
      let arrayKeyParentOfMapTotal = []; //luu giu cac key parent cua arrayTotal
      for (let x of mapTotal.keys()) {
        arrayKeyParentOfMapTotal.push(x);
      }

      for (const x of arrayKeySelected) {
        if (arrayKeyParentOfMapTotal.includes(x)) {
          // console.log("x la phan tu cha: ", x);
          //Kiểm tra nếu nó là keyParent thì thêm vào mảng
          let objSelectedKeyParent = {
            [x]: { checked: false, partialChecked: true },
          };
          arrayReturnSelectKey.push(objSelectedKeyParent);
        } else {
          // console.log("x la phan tu con: ", x);
          //Nếu nó ko phải là keyParent tức là nó là keyChildren sau đó thêm vào mảng
          let objSelectedKeyChildren = {
            [x]: { checked: true },
          };
          arrayReturnSelectKey.push(objSelectedKeyChildren);
        }
      }

      // console.log("arrayReturnSelectKey", arrayReturnSelectKey);
      let dumpObj = [];
      arrayReturnSelectKey.forEach((el) => {
        Object.keys(el).forEach(function (key) {
          dumpObj[key] = el[key];
          // console.log('dumpObj', dumpObj)
        });
      });
      // console.log("dumpObj", dumpObj);
      setSelectedKeys(dumpObj);
    }
    // console.log('arrayKeys', arrayKeys)
    //console.log('check', Array.isArray(selectedKeys))
    // console.log("selectedKeys", selectedKeys); // mucj dich laf duyet cai nay

    // console.log('length', Object.keys(selectedKeys))
  }

  function processRemoveElementSelectedTreeNode(arrayKeys = []) {
    let arrayKeySelected = Array.isArray(Object.keys(selectedKeys))
      ? Object.keys(selectedKeys)
      : [];
    // console.log("arrayKeySelected Before", arrayKeySelected);
    let arrayIndexRemove = [];
    arrayKeySelected.findIndex((elementTarget, indexTarget) => {
      // console.log("elementTarget", elementTarget);
      // console.log("indexTarget", indexTarget);
      arrayKeys.findIndex((element, index) => {
        // console.log("element", element);
        // console.log("index", index);
        if (elementTarget === element) {
          // console.log("indexTarget", indexTarget);
          arrayIndexRemove.push(indexTarget);
        }
      });
    });
    // console.log("arrayIndexRemove", arrayIndexRemove);
    arrayKeySelected = arrayKeySelected.filter(function (value, index) {
      return arrayIndexRemove.indexOf(index) === -1;
    });
    // console.log("arrayKeySelected After", arrayKeySelected);
    // nếu mảng selectedKeys sau khi bị xóa có số lượng phần tử bằng 0
    // thì bỏ check hết các ô từ nút cha đến con của ô hiện tại Đang được check

    // if (arrayKeySelected.length === 0) {
    //   setSelectedKeys(arrayKeySelected);
    // }
    return arrayKeySelected;
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

  const onCloseXDialog = () => {
    onResetFormInputErrors();
    onResetFormInput();
    // notifySuccess('thanh cong!!')
    setActiveIndex(null);
    onHide();
  };

  const handleBlur = (e) => {
    let { name, value } = e.target;
    // console.log("handleBlur", e);

    switch (name) {
      case "tenNhomQuyen":
        if (value.length < 0) {
          setTenNhomQuyenErrors(MESSAGE_REQUIRE);
        } else {
          setTenNhomQuyenErrors("");
        }
        setTenNhomQuyen(value);
        break;
      default:
        if (value.length < 0) {
          setMotaErrors(MESSAGE_REQUIRE);
        } else {
          setMotaErrors("");
        }
        setMota(value);
    }
  };

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
        header="Sửa mới nhóm quyền"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => onCloseXDialog()}
        footer={renderFooter("displayBasic")}
      >
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col">
            <label htmlFor="tenNhomQuyen">Tên nhóm quyền</label>
            <InputText
              className={
                Object.keys(tenNhomQuyenErrors).length > 0 ? "error" : null
              }
              id="tenNhomQuyen"
              name="tenNhomQuyen"
              type="text"
              onChange={handleOnChangeTenNhomQuyen}
              // defaultValue={tenNhomQuyen === "" ? objRoleTranfer.ten : tenNhomQuyen}
              defaultValue={objRoleTranfer.ten}
              // value={tenNhomQuyen}
              // onBlur={handleBlur}
            />
            {Object.keys(tenNhomQuyenErrors).map((keyIndex, key) => {
              return (
                <span className="errorMessage" key={key}>
                  {tenNhomQuyenErrors[keyIndex]}
                </span>
              );
            })}
          </div>
          <div className="p-field p-col">
            <label htmlFor="mota">Mô tả</label>
            <InputText
              className={Object.keys(motaErrors).length > 0 ? "error" : null}
              id="mota"
              type="text"
              onChange={handleOnChangeMota}
              defaultValue={objRoleTranfer.mota}
              // value={mota}
              // onBlur={handleBlur}
            />
            {Object.keys(motaErrors).map((keyIndex, key) => {
              return (
                <span className="errorMessage" key={key}>
                  {motaErrors[keyIndex]}
                </span>
              );
            })}
          </div>
        </div>

        <div className="bg-gr">
          <Accordion
            onTabChange={handleOnChangeAccordion}
            activeIndex={activeIndex}
          >
            <AccordionTab header="Danh sách quyền">
              <Tree
                value={datachucnangct}
                selectionMode="checkbox"
                selectionKeys={selectedKeys}
                onSelectionChange={handleOnChangeSelectedKey}
                // onSelect={handOnSelected}
                onUnselect={handOnUnSelected}
              />
            </AccordionTab>
          </Accordion>
        </div>
        
      </Dialog>
    </div>
  );
};
