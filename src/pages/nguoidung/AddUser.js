import axios from "axios";
import "primeflex/primeflex.css";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React from "react";
import { withRouter } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AddUser = (props) => {
  // console.log("props", props);
  const { visible, onHide } = props;



  const notifySuccess = (message) => {
    toast.success(`✔❤ ${message}`, {
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
    toast.error(`😢 ${message}`, {
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

  const onBasicUpload = (e) => {
    console.log('e', e)
    // notifySuccess("Thành công!!");
  };

  const onHandleSelectedFile = async (e) => {
    // console.log("e", e.target.files);

    let files = e.target.files;
    console.log('files', files)

    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      let url = 'http://localhost:8080/upload';
      const bodyData = { file: e.target.result }
      // console.log("reader", e.target.result);

      let token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ1Q0VCSk43c21ZSDRBOTZFNGRqRllhcWllMGJMajNGNFNPNzRCNzh4LWNZIn0.eyJleHAiOjE2MTE4ODcxMjQsImlhdCI6MTYxMTg1MTEyNCwianRpIjoiZGE2NzRjMWQtNmExZC00ZTlmLTliYWItMDI1NTNlNzgwNzQyIiwiaXNzIjoiaHR0cDovLzEwLjMwLjEuNDA6ODA4MC9hdXRoL3JlYWxtcy9kZW1vIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjM5OGQ4Zjk0LWZmZWUtNGU0Yi05ZGM1LWRkZDE5ZmU5ZjkyNiIsInR5cCI6IkJlYXJlciIsImF6cCI6InJlYWN0LWFwcCIsInNlc3Npb25fc3RhdGUiOiI5MmI4NGE3ZC1iNThjLTRlZGMtOGMwMS1jN2NiODVkNzJjYmEiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly8xMC4zMC4xLjE0MCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6ImNiZWlkMDAwMDE4MCJ9.RIreon1C8foa09hus7LhC76-dQ9bImAv2wnHMYOdZNNkwqdRyfdHZFG458kBbjoe1I5J0QzEQzEfxCiwNcADe1wDyuxyLq_2Lpeva7AZ3T6W47Uf1VIR3h64sMCMtWJP_IB35Y7LNlARhcNFtbex4rwa_lVu0RVEuG6UpauudX17P9GPJpNOrQ_7RVLIcrBucAjDjHiwR8IFFfSSCHL2AXTHM-MLUeRnIbrqhO1Q8a3l4RTxl_vWsGYKORta3iaUG5Q4TZLnvzmIXw5mOrIy8Wim0_jxk6cOsM82NIsKhAhBx3jHR5KSgalzOs3b6slD3Z_bM93eYi3gLejh2VKx6w';

      let data = new FormData();
      data.append('file', files[0]);

      console.log('data', data);


      var config = {
        method: 'POST',
        url: url,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
        data: data
      };

      return axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    };


    // const base64 = await convertBase64(files);
    // console.log(base64);
    notifySuccess('thanh cong!')


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
              accept="image/*"
              maxfilesize={1000000}

            />
          </div>

        </div>
      </Dialog>
    </div>
  );
};
export default withRouter(AddUser);
