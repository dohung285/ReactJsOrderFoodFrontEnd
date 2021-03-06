import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { Tree } from "primereact/tree";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  EMAIL_REGEX,
  EXPRITIME_HIDER_LOADER,
  MESSAGE_EMAIL_FORMAT_ERROR,
  MESSAGE_REQUIRE,
  TIME_OUT_CLOSE_NOTIFY,
} from "../../constants/ConstantString";
import { useRole } from "../../hooks/useRole";
import UserServices from "../../service/UserService";
import "./user.css";

const EditUser = (props) => {
  const [file, setFile] = useState(null);
  const [hoten, setHoten] = useState();
  const [diachi, setDiachi] = useState();
  const [sodienthoai, setSodienthoai] = useState();
  const [tendangnhap, setTendangnhap] = useState();
  const [thudientu, setThudientu] = useState();
  const [loai, setLoai] = useState();

  const [hotenErrors, setHotenErrors] = useState({});
  const [diachiErrors, setDiachiErrors] = useState({});
  const [sodienthoaiErrors, setSodienthoaiErrors] = useState({});
  const [tendangnhapErrors, setTendangnhapErrors] = useState({});
  const [thudientuErrors, setThudientuErrors] = useState({});
  const [loaiErrors, setLoaiErrors] = useState({});
  const [fileErrors, setFileErrors] = useState({});


  const [selectedGroupRole, setSelectedGroupRole] = useState(null);


  // console.log("props", props);
  const { visible, onHide, userObj,getAllPermissionSelected } = props;
  // console.log("userObj", userObj);
  console.log('getAllPermissionSelected', getAllPermissionSelected)

  const userService = new UserServices();



  // const [arrayPermissionSelected, setArrayPermissionSelected] = useState([])
  // const getAllPermissionSelected = async () => {
  //   console.log('co chay')
  //   let arrayPermissionSelectedsssssss = [];
  //   // console.log('co chay vao day')
  //   const result = await userService.getAllPermissionSelected(userObj.id)
  //   // console.log('result: ', result)
  //   if (result.status === 1000) {
  //     const array = result.list;
  //     // console.log('array', array)
  //     array.forEach(element => {
  //       // console.log('element: ', element.key, element.label);
  //       let objPer = {
  //         name: element.label,
  //         code: element.key
  //       }
  //       arrayPermissionSelectedsssssss.push(objPer)
  //     });
  //   }
  //   setArrayPermissionSelected(arrayPermissionSelectedsssssss)
  //   // setSelectedGroupRole(arrayPermissionSelected)
  //   // console.log('arrayPermissionSelected', arrayPermissionSelected)
  // }
  // getAllPermissionSelected();



  const [allPermission, setAllPermission] = useState([])
  const getAllGroupRole = async () => {
    let arrayPermissionAll = [];
    const result = await userService.getAllGroupRole();
    if (result.status === 1000) {
      let array = result.list;
      // console.log('result.list', result)

      array.forEach(element => {
        // console.log('element', element.key, element.label)
        let objTmp = {
          name: element.label,
          code: element.key
        }
        arrayPermissionAll.push(objTmp)
      });
    }
    // console.log(arrayPermissionAll);
    setAllPermission(arrayPermissionAll);
    // console.log('arrayPermissionAll', arrayPermissionAll)
  }


  const handleOnChangeMultiSelect = (e) => {
    setSelectedGroupRole(e.value)
  }

  // useEffect(() => {
  //   getAllGroupRole();
  //   // getAllPermissionSelected();
  // }, [])



  // console.log('process.env.REACT_APP_BASE_API_URL', process.env.REACT_APP_BASE_API_URL);

  const notifySuccess = (message) => {
    toast.success(`??????????? ${message}`, {
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
    toast.error(`???????????????????????? ${message}`, {
      position: "top-right",
      autoClose: TIME_OUT_CLOSE_NOTIFY,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  function handleOnCloseDialog() {
    setActiveIndex(null);
    onResetFormInputErrors();
    onResetFormInput();
    onHide();
  }

  const onResetFormInput = () => {
    setHoten("");
    setDiachi("");
    setSodienthoai("");
    setTendangnhap("");
    setLoai("");
    setFile(null);
    setThudientu("");
  };

  const onResetFormInputErrors = () => {
    setHotenErrors("");
    setDiachiErrors("");
    setSodienthoaiErrors("");
    setTendangnhapErrors("");
    setLoaiErrors("");
    setFile(null);
    setThudientuErrors("");
  };

  const handleOnYesDialog = async (name) => {
    //kh???i t???o gi?? tr??? cho c??c ?? input

    let listDsNQ = [];


    console.log('object', selectedGroupRole)
    selectedGroupRole.forEach(e => listDsNQ.push(e.code))

    // console.log('object', object)

    let isValid = formValidation();
    if (isValid) {
      console.log(` --SUBMITTING-- `);

      const objUser = {
        hoten: hoten,
        diachi: diachi,
        sodienthoai: sodienthoai,
        thudientu: thudientu,
        loai: loai,
        dsNhomQuyen: listDsNQ
      };
      console.log("objUser", objUser);


      
      let jsonObj = JSON.stringify(objUser);
      let data = new FormData();
      let result;
      let id = userObj.id;
      console.log("id", id);
      if (file != null) {
        console.log("co file ");
        data.append("file", file);
        data.append("nguoidung", jsonObj);
        result = await userService.editUserHasFile(id, data);
      } else {
        console.log("khong co file ");
        data.append("nguoidung", jsonObj);
        result = await userService.editUserDontHasFile(id, data);
      }
      console.log("result", result);
      if (result && result.status === 1000) {
        let message = result.message;
        notifySuccess(message);
        setTimeout(function () {
          props.fetDataUser();
        }, EXPRITIME_HIDER_LOADER);
      } else {
        console.log("result", result);
        let message = result.message;
        notifyError(message);
        return;
      }
      onHide(name);
    }
  };

  const formValidation = () => {
    //  debugger
    const hotenErrors = {};
    const diachiErrors = {};
    const sodienthoaiErrors = {};
    // const tendangnhapErrors = {};
    const thudientuErrors = {};
    const loaiErrors = {};
    // const fileErrors = {};

    let isValid = true;
    // debugger;

    if (hoten === "") {
      hotenErrors.hotenRequired = MESSAGE_REQUIRE;
      isValid = false;
    }

    if (diachi === "") {
      diachiErrors.hotenRequired = MESSAGE_REQUIRE;
      isValid = false;
    }
    //=====================

    if (sodienthoai === "") {
      sodienthoaiErrors.hotenRequired = MESSAGE_REQUIRE;
      isValid = false;
    }
    // else if (String(sodienthoai).length < 0 && String(sodienthoai).length > 10) {
    //   sodienthoaiErrors.sodienthoaiLength = "S??? ??i???n tho???i ph???i g???m c?? 10 s???";
    //   isValid = false;
    // }

    // if (tendangnhap === "") {
    //   tendangnhapErrors.hotenRequired = "Kh??ng ???????c b??? tr???ng";
    //   isValid = false;
    // }

    if (thudientu === "") {
      thudientuErrors.thudientuRequired = MESSAGE_REQUIRE;
      isValid = false;
    } else if (EMAIL_REGEX.test(thudientu) === false) {
      thudientuErrors.emailIsvalid = MESSAGE_EMAIL_FORMAT_ERROR;
      isValid = false;
    }

    if (loai === "") {
      loaiErrors.hotenRequired = MESSAGE_REQUIRE;
      isValid = false;
    }

    // if (file === null) {
    //   fileErrors.hotenRequired = "Kh??ng ???????c b??? tr???ng";
    //   isValid = false;
    // }

    setHotenErrors(hotenErrors);
    setDiachiErrors(diachiErrors);

    setSodienthoaiErrors(sodienthoaiErrors);
    // setTendangnhapErrors(tendangnhapErrors);
    setThudientuErrors(thudientuErrors);
    setLoaiErrors(loaiErrors);
    // setFileErrors(fileErrors);

    return isValid;
  };

  const onChangeFormInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    switch (name) {
      case "hoten":
        if (value.length > 0) {
          setHotenErrors("");
        } else {
          setHotenErrors(MESSAGE_REQUIRE);
        }
        setHoten(value);
        break;
      case "diachi":
        if (value.length > 0) {
          setDiachiErrors("");
        } else {
          setDiachiErrors(MESSAGE_REQUIRE);
        }
        setDiachi(value);
        break;
      case "sodienthoai":
        console.log("value", value);
        if (value.length > 0) {
          setSodienthoaiErrors("");
        } else {
          setSodienthoaiErrors(MESSAGE_REQUIRE);
        }
        setSodienthoai(value);
        break;
      case "thudientu":
        if (value.length > 0) {
          setThudientuErrors("");
        } else if (!EMAIL_REGEX.test(value)) {
          setThudientuErrors(MESSAGE_EMAIL_FORMAT_ERROR);
        } else {
          setThudientuErrors(MESSAGE_REQUIRE);
        }
        setThudientu(value);
        break;
      default:
        if (value.length > 0) {
          setLoaiErrors("");
        } else {
          setLoaiErrors(MESSAGE_REQUIRE);
        }
        setLoai(value);
        break;
    }
  };

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="H???y"
          icon="pi pi-times"
          // onClick={onHide}
          onClick={handleOnCloseDialog}
          className="p-button-text"
        />
        <Button
          label="?????ng ??"
          icon="pi pi-check"
          // onClick={() => onHide(name)}
          onClick={() => handleOnYesDialog(name)}
          autoFocus
        />
      </div>
    );
  };

  const onHandleSelectedFile = async (e) => {
    // console.log("e", e.target.files);

    let value = e.target.files[0];
    if (value === null) {
      setFileErrors(MESSAGE_REQUIRE);
    } else {
      setFileErrors("");
    }
    let file = value === null || value === undefined ? null : value;
    setFile(file);
  };

  // const convertBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);
  //     fileReader.onload = () => {
  //       resolve(fileReader.result);
  //     };
  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // };

  const handleOnCloseXModal = () => {
    setActiveIndex(null);
    onResetFormInputErrors();
    onResetFormInput();
    onHide();
  };

  const [activeIndex, setActiveIndex] = useState(null);
  function handleOnChangeAccordion(e) {
    setActiveIndex(e.index);

    setHoten(userObj.hoten);
    setDiachi(userObj.diachi);
    setSodienthoai(userObj.sodienthoai);
    setTendangnhap(userObj.tendangnhap);
    setThudientu(userObj.thudientu);
    setLoai(userObj.loai);



    // setSelectedGroupRole(arrayPermissionSelected)
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
        // header="S???a m???i ng?????i d??ng"
        header=""
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => handleOnCloseXModal()}
        footer={renderFooter("displayBasic")}
      >
        <Accordion
          onTabChange={handleOnChangeAccordion}
          activeIndex={activeIndex}
        >
          <AccordionTab header="S???a ng?????i d??ng">
            <div className="p-fluid p-formgrid p-grid">
              <div className="p-field p-col">
                <label htmlFor="hoten">H??? t??n</label>
                <InputText
                  id="hoten"
                  type="text"
                  // defaultValue={userObj.hoten}
                  value={hoten}
                  name="hoten"
                  onChange={(e) => onChangeFormInput(e)}
                />
                {Object.keys(hotenErrors).map((keyIndex, key) => {
                  return (
                    <span className="errorMessage" key={key}>
                      {hotenErrors[keyIndex]}
                    </span>
                  );
                })}
              </div>
              <div className="p-field p-col">
                <label htmlFor="diachi">?????a ch???</label>
                <InputText
                  id="diachi"
                  type="text"
                  // defaultValue={userObj.diachi}
                  value={diachi}
                  name="diachi"
                  onChange={(e) => onChangeFormInput(e)}
                />
                {Object.keys(diachiErrors).map((keyIndex, key) => {
                  return (
                    <span className="errorMessage" key={key}>
                      {diachiErrors[keyIndex]}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="p-fluid p-formgrid p-grid">
              <div className="p-field p-col">
                <label htmlFor="thudientu">Th?? ??i???n t???</label>
                <InputText
                  id="thudientu"
                  type="text"
                  // defaultValue={userObj.thudientu}
                  value={thudientu}
                  name="thudientu"
                  onChange={(e) => onChangeFormInput(e)}
                />
                {Object.keys(thudientuErrors).map((keyIndex, key) => {
                  return (
                    <span className="errorMessage" key={key}>
                      {thudientuErrors[keyIndex]}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="p-fluid p-formgrid p-grid">
              <div className="p-field p-col">
                <label htmlFor="sodienthoai">S??? ??i???n tho???i</label>
                <InputText
                  id="sodienthoai"
                  type="number"
                  // defaultValue={userObj.sodienthoai}
                  value={sodienthoai}
                  name="sodienthoai"
                  onChange={(e) => onChangeFormInput(e)}
                />
                {Object.keys(sodienthoaiErrors).map((keyIndex, key) => {
                  return (
                    <span className="errorMessage" key={key}>
                      {sodienthoaiErrors[keyIndex]}
                    </span>
                  );
                })}
              </div>

              <div className="p-field p-col">
                <label htmlFor="loai">Lo???i</label>
                <InputText
                  id="loai"
                  type="text"
                  // defaultValue={userObj.loai}
                  value={loai}
                  name="loai"
                  onChange={(e) => onChangeFormInput(e)}
                />
                {Object.keys(loaiErrors).map((keyIndex, key) => {
                  return (
                    <span className="errorMessage" key={key}>
                      {loaiErrors[keyIndex]}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="p-fluid ">
              <div className="p-field p-col">
                <label htmlFor="base64anh">???nh</label>
                <InputText
                  id="base64anh"
                  type="file"
                  onChange={(e) => onHandleSelectedFile(e)}
                  name="base64anh"
                />
              </div>
            </div>

            <MultiSelect
              value={selectedGroupRole}
              options={allPermission}
              onChange={handleOnChangeMultiSelect}
              optionLabel="name"
              placeholder="Ch???n nh??m quy???n" />

          </AccordionTab>
        </Accordion>
      </Dialog>
    </div>
  );
};

export default withRouter(EditUser);
