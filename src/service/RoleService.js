import {
  PREFIX_URL_NHOMQUYEN,
  PREFIX_URL_NHOMQUYEN_PAGING,
  PREFIX_URL_ORDERFOOD,
} from "../constants/ConstantUrlAPI";
import { TypeMethodConstantEnum } from "../helper/MethodAPIConstant";
import FetchAPI from "./FetchAPI";

class RoleService extends FetchAPI {
  async saveRole(dataBody) {
    let url = `${PREFIX_URL_NHOMQUYEN}/nhomquyen/save`;
    return await this.request(url, dataBody, TypeMethodConstantEnum.POST);
  }

  async getAllRoleWithPaging(dataBody) {
    let url = `${PREFIX_URL_NHOMQUYEN_PAGING}/nhomquyen/search-all`; ///taxsearch/cybertax/search-service//nhomquyen/search-all
    return await this.request(url, dataBody, TypeMethodConstantEnum.GET);
  }

  async getNhomQuyenCtById(id) {
    let url = `${PREFIX_URL_NHOMQUYEN}/nhomquyenchitiet/getAllCnctByCn/${id}`; ///taxsearch/cybertax/search-service//nhomquyen/search-all
    return await this.request(url, null, TypeMethodConstantEnum.GET);
  }

  async deleteNhomQuyenCtById(id) {
    let url = `${PREFIX_URL_NHOMQUYEN}/nhomquyen/delete/${id}`; ///taxsearch/cybertax/search-service//nhomquyen/search-all
    return await this.request(url, null, TypeMethodConstantEnum.POST);
  }

  async updateNhomQuyen(id, dataBody) {
    let url = `${PREFIX_URL_NHOMQUYEN}/nhomquyen/update/${id}`; ///taxsearch/cybertax/search-service//nhomquyen/search-all
    return await this.request(url, dataBody, TypeMethodConstantEnum.POST);
  }



  async getAllUserAndRole() {
    let url = `${PREFIX_URL_ORDERFOOD}/rolesAmin`;
    return await this.request(url, null, TypeMethodConstantEnum.GET);
  }

  async addRoleMappingToUser(userId,dataBody) {
    let url = `${PREFIX_URL_ORDERFOOD}/role-mappings?userId=${userId}`; 
    return await this.request(url, dataBody, TypeMethodConstantEnum.POST);
  }

  async removeRoleMappingToUser(userId,dataBody) {
    let url = `${PREFIX_URL_ORDERFOOD}/role-mappings?userId=${userId}`; 
    return await this.request(url, dataBody, TypeMethodConstantEnum.DELETE);
  }
  
}
export default RoleService;
