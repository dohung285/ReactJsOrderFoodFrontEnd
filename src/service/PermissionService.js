import {
  PREFIX_URL_NHOMQUYEN, PREFIX_URL_ORDERFOOD
} from "../constants/ConstantUrlAPI";
import { TypeMethodConstantEnum } from "../helper/MethodAPIConstant";
import FetchAPI from "./FetchAPI";

class PermissionService extends FetchAPI {

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
    let url = `${PREFIX_URL_ORDERFOOD}/permission`;
    return await this.request(url, dataBody, TypeMethodConstantEnum.POST);
  }

   //save
   async checkPermission(username, pathName, action) {
    let url = `${PREFIX_URL_ORDERFOOD}/permission/check?username=${username}&pathName=${pathName}&action=${action}`;
    return await this.request(url, null, TypeMethodConstantEnum.GET);
  }


}
export default PermissionService;
