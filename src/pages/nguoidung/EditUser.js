import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { TIME_OUT_CLOSE_NOTIFY } from "../../constants/ConstantString";
import UserServices from "../../service/UserService";

const EditUser = (props) => {
  // console.log("props", props);
  const { visible, onHide, userObj } = props;
  console.log("userObj", userObj);

  const [file, setFile] = useState(null);
  const [formInput, setFormInput] = useState({
    hoten: "",
    diachi: "",
    sodienthoai: "",
    tendangnhap: "",
    thudientu: "",
    loai: "",
  });
  const userService = new UserServices();

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
    toast.error(`😢😢😢😢😢😢 ${message}`, {
      position: "top-right",
      autoClose: TIME_OUT_CLOSE_NOTIFY,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    console.log("userObj useEffect", userObj);
    setFormInput({
      ...formInput,
      userObj
    });
  }, []);

  function handleOnCloseDialog() {
    onHide();
  }

  const handleOnYesDialog = async (name) => {
    if (file === null) {
      notifyError("Chưa chọn File");
      return;
    }

    const objUser = {
      diachi: formInput.diachi,
      hoten: formInput.hoten,
      sodienthoai: formInput.sodienthoai,
      tendangnhap: formInput.tendangnhap,
      thudientu: formInput.thudientu,
      loai:
        formInput.loai === null ||
        formInput.loai === undefined ||
        formInput.loai === ""
          ? 0
          : formInput.loai,
    };

    let jsonObj = JSON.stringify(objUser);

    let data = new FormData();
    data.append("file", file);
    data.append("nguoidung", jsonObj);

    let id = userObj.id;
    console.log("id", id);

    const result = await userService.editUser(id, data);
    if (result && result.status === 1000) {
      let message = result.message;
      notifySuccess(message);
    } else {
      console.log("result", result);
      let message = result.message;

      notifyError(message);
    }

    onHide(name);
  };

  const onChangeFormInput = (e, type) => {
    let value = e.target.value;
    console.log("value", value);
    switch (type) {
      case 1:
        // set hoten
        setFormInput({
          hoten: value,
          diachi: formInput.diachi,
          sodienthoai: formInput.sodienthoai,
          tendangnhap: formInput.tendangnhap,
          thudientu: formInput.thudientu,
          loai: formInput.loai,
        });
        break;
      case 2:
        setFormInput({
          hoten: formInput.hoten,
          diachi: value,
          sodienthoai: formInput.sodienthoai,
          tendangnhap: formInput.tendangnhap,
          thudientu: formInput.thudientu,
          loai: formInput.loai,
        });
        break;
      case 3:
        setFormInput({
          hoten: formInput.hoten,
          diachi: formInput.diachi,
          sodienthoai: value,
          tendangnhap: formInput.tendangnhap,
          thudientu: formInput.thudientu,
          loai: formInput.loai,
        });
        break;
      case 4:
        setFormInput({
          hoten: formInput.hoten,
          diachi: formInput.diachi,
          sodienthoai: formInput.sodienthoai,
          tendangnhap: value,
          thudientu: formInput.thudientu,
          loai: formInput.loai,
        });
        break;
      case 5:
        setFormInput({
          hoten: formInput.hoten,
          diachi: formInput.diachi,
          sodienthoai: formInput.sodienthoai,
          tendangnhap: formInput.tendangnhap,
          thudientu: value,
          loai: formInput.loai,
        });
        break;
      default:
        setFormInput({
          hoten: formInput.hoten,
          diachi: formInput.diachi,
          sodienthoai: formInput.sodienthoai,
          tendangnhap: formInput.tendangnhap,
          thudientu: formInput.thudientu,
          loai: value,
        });
        console.log("formInput", formInput);
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

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
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
        header="Sửa mới người dùng"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={onHide}
        footer={renderFooter("displayBasic")}
      >
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col">
            <label htmlFor="hoten">Họ tên</label>
            <InputText
              id="hoten"
              type="text"
              value={formInput.hoten}
              name="hoten"
              onChange={(e) => onChangeFormInput(e, 1)}
            />
          </div>
          <div className="p-field p-col">
            <label htmlFor="diachi">Địa chỉ</label>
            <InputText
              id="diachi"
              type="text"
              value={formInput.diachi}
              onChange={(e) => onChangeFormInput(e, 2)}
            />
          </div>
        </div>

        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col">
            <label htmlFor="sodienthoai">Số điện thoại</label>
            <InputText
              id="sodienthoai"
              type="text"
              value={formInput.sodienthoai}
              onChange={(e) => onChangeFormInput(e, 3)}
            />
          </div>
          <div className="p-field p-col">
            <label htmlFor="tendangnhap">Tên đăng nhập</label>
            <InputText
              id="tendangnhap"
              type="text"
              value={formInput.tendangnhap}
              onChange={(e) => onChangeFormInput(e, 4)}
            />
          </div>
        </div>

        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col">
            <label htmlFor="thudientu">Thư điện tử</label>
            <InputText
              id="thudientu"
              type="text"
              value={formInput.thudientu}
              onChange={(e) => onChangeFormInput(e, 5)}
            />
          </div>
          <div className="p-field p-col">
            <label htmlFor="loai">Loại</label>
            <InputText
              id="loai"
              type="text"
              value={formInput.loai}
              onChange={(e) => onChangeFormInput(e, 6)}
            />
          </div>
        </div>

        <div className="p-fluid ">
          <div className="p-field p-col">
            <label htmlFor="base64anh">Ảnh</label>
            <InputText
              id="base64anh"
              type="file"
              onChange={(e) => onHandleSelectedFile(e)}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default withRouter(EditUser);
