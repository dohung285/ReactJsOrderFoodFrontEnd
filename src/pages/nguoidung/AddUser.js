import "primeflex/primeflex.css";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tree } from "primereact/tree";
import React, { useRef, useState } from "react";
import { withRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FileUpload } from "primereact/fileupload";
import { reject } from "lodash";

const AddUser = (props) => {
  // console.log("props", props);
  const { visible, onHide } = props;

  

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

  function handleOnCloseDialog(params) {
    onHide();
  }

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
          //   onClick={() => handleOnYesDialog(name)}
          autoFocus
        />
      </div>
    );
  };


  const onUpload = () => {
    notifySuccess("Thành công!!");
  };

  const onBasicUpload = () => {
    notifySuccess("Thành công!!");
  };

  const onHandleSelectedFile = async (e) => {
    // console.log("e", e.target.files);

    let files = e.target.files[0];

    const base64 = await convertBase64(files);
    console.log(base64);

    // let reader = new FileReader();
    // reader.readAsDataURL(files[0]);
    // reader.onload = (e) => {
    //   console.log("reader", e.target.result);
    // };
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
        header="Thêm mới người dùng"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={onHide}
        footer={renderFooter("displayBasic")}
      >
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col">
            <label htmlFor="hoten">Họ tên</label>
            <InputText id="hoten" type="text" />
          </div>
          <div className="p-field p-col">
            <label htmlFor="diachi">Địa chỉ</label>
            <InputText id="diachi" type="text" />
          </div>
        </div>

        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col">
            <label htmlFor="sodienthoai">Số điện thoại</label>
            <InputText id="sodienthoai" type="text" />
          </div>
          <div className="p-field p-col">
            <label htmlFor="tendangnhap">Tên đăng nhập</label>
            <InputText id="tendangnhap" type="text" />
          </div>
        </div>

        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col">
            <label htmlFor="thudientu">Thư điện tử</label>
            <InputText id="thudientu" type="text" />
          </div>
          <div className="p-field p-col">
            <label htmlFor="loai">Loại</label>
            <InputText id="loai" type="text" />
          </div>
        </div>

        <div className="p-fluid ">
          <div className="p-field p-col">
            <label htmlFor="base64anh">Ảnh</label>
            <InputText
              id="loai"
              type="file"
              onChange={(e) => onHandleSelectedFile(e)}
            />
            {/* <FileUpload
              mode="basic"
              name="demo[]"
              url="./upload.php"
              accept="image/*"
              maxFileSize={1000000}
              onUpload={onBasicUpload}
              onSelect={ onHandleSelectedFile}
            /> */}
          </div>
          {/* <FileUpload
            name="demo[]"
            url="./upload.php"
            // onUpload={onUpload}
            multiple
            accept="image/*"
            maxFileSize={1000000}
            // disabled={true}
            emptyTemplate={
              <p className="p-m-0">Drag and drop files to here to upload.</p>
            }
          /> */}
        </div>
      </Dialog>
    </div>
  );
};
export default withRouter(AddUser);
