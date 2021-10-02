import {
  PREFIX_URL_NHOMQUYEN, PREFIX_URL_ORDERFOOD
} from "../constants/ConstantUrlAPI";
import { TypeMethodConstantEnum } from "../helper/MethodAPIConstant";
import FetchAPI from "./FetchAPI";

class PermissionService extends FetchAPI {


  //lấy ra tất cả các tên chức năng của hệ thống
  async getAllNameOfSystemByUsername(usename) {
    let url = `${PREFIX_URL_ORDERFOOD}/permission/function/${usename}`;
    return await this.request(url, null, TypeMethodConstantEnum.GET);
  }


  //lấy ra tất cả các quyền trong hệ thống
  async getAllPermission() {
    let url = `${PREFIX_URL_ORDERFOOD}/permission`;
    return await this.request(url, null, TypeMethodConstantEnum.GET);
  }

  //lấy ra tất cả các quyền thuộc về user
  async getAllPermissionOfUser(username) {
    let url = `${PREFIX_URL_ORDERFOOD}/permission/${username}`;
    return await this.request(url, null, TypeMethodConstantEnum.GET);
  }

  //save
  async save(dataBody) {
    try {
      let url = `${PREFIX_URL_ORDERFOOD}/permission`;
      return await this.request(url, dataBody, TypeMethodConstantEnum.POST);
    } catch (error) {
      throw error
    }
   
  }

  //checkPermission các hành động khác
  async checkPermission(username, pathName, action) {
    try {
      let url = `${PREFIX_URL_ORDERFOOD}/permission/check?username=${username}&pathName=${pathName}&action=${action}`;
      return await this.request(url, null, TypeMethodConstantEnum.GET);
    } catch (error) {
      throw error
    }

  }

  //checkPermission có quyền add hay không đối với chức năng quản trị vai trò
  async checkPermissionAdd(username) {
    let url = `${PREFIX_URL_ORDERFOOD}/permission/add-check?username=${username}`;
    return await this.request(url, null, TypeMethodConstantEnum.GET);
  }

  //checkPermission có quyền truy cập vào tính năng quản trị vai trò hay không
  async checkAccountIsRoot(username) {
    let url = `${PREFIX_URL_ORDERFOOD}/permission/check-root?username=${username}`;
    return await this.request(url, null, TypeMethodConstantEnum.GET);
  }

  //checkPermission có quyền nhận thông báo khi có đơn hàng mới không?
  async checkHasPermissionGetNotification(username) {
    let url = `${PREFIX_URL_ORDERFOOD}/permission/get-notification?username=${username}`;
    return await this.request(url, null, TypeMethodConstantEnum.GET);
  }



}
export default PermissionService;
