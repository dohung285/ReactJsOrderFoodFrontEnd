import {
  PREFIX_URL_NHOMQUYEN,
  PREFIX_URL_USER_ADD_EDIT_DELETE,
  PREFIX_URL_USER_SEARCH,
} from "../constants/ConstantUrlAPI";
import { TypeMethodConstantEnum } from "../helper/MethodAPIConstant";
import FetchAPI from "./FetchAPI";
// const PREFIX_URL = "taxsearch/api/cybertax/nguoi-dung";
class UserServices extends FetchAPI {


  // async getDataUser(dataSearch) {
  //   let url = `${PREFIX_URL_ORDERFOOD}/search-all`;
  //   return await this.request(url, dataSearch, TypeMethodConstantEnum.GET);
  // }

  // public async deleteUser(dataSearch: any) {
  //   //hethong/cybertax/api/nguoidung
  //   // let tmp = 'http://192.168.21.100:9900/cybertax/api/nguoidung'
  //   // let url = `${tmp}/xoa/${dataSearch}`;
  //   let url = `${PREFIX_URL_USER_ADD_EDIT_DELETE}/xoa/${dataSearch}`;

  //   return await this.request(url, dataSearch, TypeMethodConstantEnum.POST);
  // }

  // public async saveUserHasFile(formData: any) {
  //   let url = `${PREFIX_URL_USER_ADD_EDIT_DELETE}/themfile`;
  //   return await this.request(url, formData, TypeMethodConstantEnum.POST);
  // }

  // public async saveUserDontHasFile(formData: any) {
  //   let url = `${PREFIX_URL_USER_ADD_EDIT_DELETE}/them`;
  //   return await this.request(url, formData, TypeMethodConstantEnum.POST);
  // }



  // public async editUserDontHasFile(id: any, formData: any) {
  //   let url = `${PREFIX_URL_USER_ADD_EDIT_DELETE}/sua/${id}`;
  //   return await this.request(url, formData, TypeMethodConstantEnum.POST);
  // }

  // public async editUserHasFile(id: any, formData: any) {
  //   let url = `${PREFIX_URL_USER_ADD_EDIT_DELETE}/suafile/${id}`;
  //   return await this.request(url, formData, TypeMethodConstantEnum.POST);
  // }

  // public async getAllPermissionByUser() {
  //   let url = `${PREFIX_URL_NHOMQUYEN}/ndnq/getNdNq`;
  //   return await this.request(url, {}, TypeMethodConstantEnum.GET);
  // }


  // public async getAllGroupRole() {
  //   let url = `${PREFIX_URL_NHOMQUYEN}/nhomquyen/getallnq`;
  //   return await this.request(url, {}, TypeMethodConstantEnum.GET);
  // }


  // //  l???y ra danh s??ch c??c nh??m quy???n ???? ch???n ??? b?????c th??m user
  // public async getAllPermissionSelected(id:any){
  //   let url = `${PREFIX_URL_NHOMQUYEN}/ndnq/getnqbyidnd/${id}`;
  //   return await this.request(url, {}, TypeMethodConstantEnum.GET);
  // }







}
export default UserServices;



// {
//   "hoten": "fgdfgdfg",
//   "diachi": "sdfsdfsdf",
//   "sodienthoai": "0865478911",
//   "tendangnhap": "quytd123",
//   "thudientu": "qcfsd41@gmail.com",
//   "dsNhomQuyen": [
//       "df9d2001-6ac9-46b9-9c4d-edb61ac80ae6",
//       "ba5022e8-76bc-458d-86c4-0e9c3c9c51fb"
//   ],loai":"1"}


// {
//   "hoten":"fgdfgdfg",
//   "diachi":"sdfsdfsdf",
//   "sodienthoai":"0865478911",
//   "tendangnhap":"quytd123",
//   "thudientu":"qcfsd41@gmail.com",
//   "dsNhomQuyen":[
//      "df9d2001-6ac9-46b9-9c4d-edb61ac80ae6",
//      "ba5022e8-76bc-458d-86c4-0e9c3c9c51fb"
//   ],
//   "loai"":"1}"