import "primeflex/primeflex.css";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserServices from "../../service/UserService";
import { TIME_OUT_CLOSE_NOTIFY } from "../../constants/ConstantString";

const AddUser = (props) => {
  // console.log("props", props);
  const { visible, onHide } = props;

  const [file, setFile] = useState(null);

  const [hoten, setHoten] = useState("")
  const [diachi, setDiachi] = useState("")
  const [sodienthoai, setSodienthoai] = useState("");
  const [tendangnhap, setTendangnhap] = useState("")
  const [thudientu, setThudientu] = useState("")
  const [loai, setLoai] = useState("")

  const [hotenErrors, setHotenErrors] = useState({})
  const [diachiErrors, setDiachiErrors] = useState({})
  const [sodienthoaiErrors, setSodienthoaiErrors] = useState({})
  const [tendangnhapErrors, setTendangnhapErrors] = useState({})
  const [thudientuErrors, setThudientuErrors] = useState({})
  const [loaiErrors, setLoaiErrors] = useState({})

  const userService = new UserServices();
  const formValidation = () => {
    // debugger
    const hotenErrors = {}
    const diachiErrors = {}
    const sodienthoaiErrors = {}
    const tendangnhapErrors = {}
    const thudientuErrors = {}
    const loaiErrors = {}


    let isValid = true;

    if (hoten === '') {
      hotenErrors.hotenRequired = "Không được bỏ trống";
      isValid = false;
    }

    if (diachi === '') {
      diachiErrors.hotenRequired = "Không được bỏ trống";
      isValid = false;
    }
    //=====================

    if (sodienthoai === '') {
      sodienthoaiErrors.hotenRequired = "Không được bỏ trống";
      isValid = false;
    }

    if (tendangnhap === '') {
      tendangnhapErrors.hotenRequired = "Không được bỏ trống";
      isValid = false;
    }

    if (thudientu === '') {
      thudientuErrors.hotenRequired = "Không được bỏ trống";
      isValid = false;
    }

    if (loai === '') {
      loaiErrors.hotenRequired = "Không được bỏ trống";
      isValid = false;
    }
    // console.log('hotenErrors', hotenErrors)
    // console.log('diachiErrors', diachiErrors)

    setHotenErrors(hotenErrors);
    setDiachiErrors(diachiErrors);

    setSodienthoaiErrors(sodienthoaiErrors)
    setTendangnhapErrors(tendangnhapErrors)
    setThudientuErrors(thudientuErrors)
    setLoaiErrors(loaiErrors)

    return isValid;
  }

  // console.log('process.env.REACT_APP_BASE_API_URL', process.env.REACT_APP_BASE_API_URL);

  const notifySuccess = (message) => {
    toast.success(`👌👍❤ ${message}`, {
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
    toast.error(`😂🤣 ${message}`, {
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
    onResetFormInputErrors()
    onResetFormInput()
    onHide();
  }

  const handleOnYesDialog = async (name) => {
    if (file === null) {
      notifyError("Chưa chọn File");
      return;
    }

    let isValid = formValidation();
    if (isValid) {
      console.log(` --SUBMITTING-- `);
      const objUser = {
        hoten: hoten,
        diachi: diachi,
        sodienthoai: sodienthoai,
        tendangnhap: tendangnhap,
        thudientu: thudientu,
        loai: loai

      };

      let jsonObj = JSON.stringify(objUser);

      let data = new FormData();
      data.append("file", file);
      data.append("nguoidung", jsonObj);

      const result = await userService.saveUser(data);
      if (result && result.status === 1000) {
        let message = result.message;
        notifySuccess(message);
        onResetFormInput()
      } else {
        console.log("result", result);
        let message = result.message;
        notifyError(message);

      }
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
      return
    }






    onHide(name);
  };

  const handleOnCloseXDialog = () => {
    onResetFormInputErrors()
    onResetFormInput()
    onHide()
  }
 


  const onResetFormInput = () => {
    setHoten("")
    setDiachi("")
    setSodienthoai("")
    setTendangnhap("")
    setLoai("")
    setFile(null)
    setThudientu("")
  }
  const onResetFormInputErrors = () => {
    setHotenErrors("")
    setDiachiErrors("")
    setSodienthoaiErrors("")
    setTendangnhapErrors("")
    setLoaiErrors("")
    setFile(null)
    setThudientuErrors("")
  }

  const onChangeFormInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target
    switch (name) {
      case "hoten":
        if (value.length > 0) {
          setHotenErrors("")
        } else {
          setHotenErrors("Không được bỏ trống")
        }
        setHoten(value)
        break;
      case "diachi":
        if (value.length > 0) {
          setDiachiErrors("")
        } else {
          setDiachiErrors("Không được bỏ trống")
        }
        setDiachi(value)
        break;
      case "sodienthoai":
        if (value.length > 0) {
          setSodienthoaiErrors("")
        } else {
          setSodienthoaiErrors("Không được bỏ trống")
        }
        setSodienthoai(value)
        break;
      case "tendangnhap":
        if (value.length > 0) {
          setTendangnhapErrors("")
        } else {
          setTendangnhapErrors("Không được bỏ trống")
        }
        setTendangnhap(value)
        break;
      case "thudientu":
        if (value.length > 0) {
          setThudientuErrors("")
        } else {
          setThudientuErrors("Không được bỏ trống")
        }
        setThudientu(value)
        break;
      default:
        if (value.length > 0) {
          setLoaiErrors("")
        } else {
          setLoaiErrors("Không được bỏ trống")
        }
        setLoai(value)
        break;
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

  const onHandleSelectedFile = async (e) => {
    // console.log("e", e.target.files);

    let file =
      e.target.files[0] === null || e.target.files[0] === undefined
        ? null
        : e.target.files[0];
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
        header="Thêm mới người dùng"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => handleOnCloseXDialog()}
        footer={renderFooter("displayBasic")}
      >
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col">
            <label htmlFor="hoten">Họ tên</label>
            <InputText
              id="hoten"
              type="text"
              defaultValue={hoten}
              name="hoten"
              onChange={(e) => onChangeFormInput(e)}
            />
            {Object.keys(hotenErrors).map((keyIndex, key) => {
              return <span className="errorMessage" key={key} >{hotenErrors[keyIndex]}</span>
            })}
          </div>
          <div className="p-field p-col">
            <label htmlFor="diachi">Địa chỉ</label>
            <InputText
              id="diachi"
              type="text"
              defaultValue={diachi}
              name="diachi"
              onChange={(e) => onChangeFormInput(e)}
            />
            {Object.keys(diachiErrors).map((keyIndex, key) => {
              return <span className="errorMessage" key={key} >{diachiErrors[keyIndex]}</span>
            })}
          </div>
        </div>

        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col">
            <label htmlFor="sodienthoai">Số điện thoại</label>
            <InputText
              id="sodienthoai"
              type="text"
              defaultValue={sodienthoai}
              name="sodienthoai"
              onChange={(e) => onChangeFormInput(e)}
            />
            {Object.keys(sodienthoaiErrors).map((keyIndex, key) => {
              return <span className="errorMessage" key={key} >{sodienthoaiErrors[keyIndex]}</span>
            })}
          </div>
          <div className="p-field p-col">
            <label htmlFor="tendangnhap">Tên đăng nhập</label>
            <InputText
              id="tendangnhap"
              type="text"
              defaultValue={tendangnhap}
              name="tendangnhap"
              onChange={(e) => onChangeFormInput(e)}
            />
            {Object.keys(tendangnhapErrors).map((keyIndex, key) => {
              return <span className="errorMessage" key={key} >{tendangnhapErrors[keyIndex]}</span>
            })}
          </div>
        </div>

        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col">
            <label htmlFor="thudientu">Thư điện tử</label>
            <InputText
              id="thudientu"
              type="text"
              defaultValue={thudientu}
              name="thudientu"
              onChange={(e) => onChangeFormInput(e)}
            />
            {Object.keys(thudientuErrors).map((keyIndex, key) => {
              return <span className="errorMessage" key={key} >{thudientuErrors[keyIndex]}</span>
            })}
          </div>
          <div className="p-field p-col">
            <label htmlFor="loai">Loại</label>
            <InputText
              id="loai"
              type="text"
              defaultValue={loai}
              name="loai"
              onChange={(e) => onChangeFormInput(e)}
            />
            {Object.keys(loaiErrors).map((keyIndex, key) => {
              return <span className="errorMessage" key={key} >{loaiErrors[keyIndex]}</span>
            })}
          </div>
        </div>

        <div className="p-fluid ">
          <div className="p-field p-col">
            <label htmlFor="base64anh">Ảnh</label>
            <InputText
              id="base64anh"
              type="file"
              onChange={(e) => onHandleSelectedFile(e)}
              name="base64anh"
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};
export default withRouter(AddUser);
