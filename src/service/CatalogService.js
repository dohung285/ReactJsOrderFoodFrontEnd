


import { PREFIX_URL_ORDERFOOD } from "../constants/ConstantUrlAPI";
import { TypeMethodConstantEnum } from "../helper/MethodAPIConstant";
import FetchAPI from "./FetchAPI";

class CatalogService extends FetchAPI {


    async getAllFoodByFoodGroup(page, size, foodGroup) {
        let url = `${PREFIX_URL_ORDERFOOD}/food/byFoodGroup?page=${page}&size=${size}&foodGroupId=${foodGroup}`;
        return await this.request(url, null, TypeMethodConstantEnum.GET);
    }

    async searchFoodLikeNameAndFoodGroup(txtName, foodGroup) {
        let url = `${PREFIX_URL_ORDERFOOD}/food/search?foodGroupId=${foodGroup}&foodName=${txtName}`;
        return await this.request(url, null, TypeMethodConstantEnum.GET);
    }





    // async saveRole(dataBody) {
    //   let url = `${PREFIX_URL_NHOMQUYEN}/nhomquyen/save`;
    //   return await this.request(url, dataBody, TypeMethodConstantEnum.POST);
    // }

    // async getAllRoleWithPaging(dataBody) {
    //   let url = `${PREFIX_URL_NHOMQUYEN_PAGING}/nhomquyen/search-all`; ///taxsearch/cybertax/search-service//nhomquyen/search-all
    //   return await this.request(url, dataBody, TypeMethodConstantEnum.GET);
    // }

    // async getNhomQuyenCtById(id) {
    //   let url = `${PREFIX_URL_NHOMQUYEN}/nhomquyenchitiet/getAllCnctByCn/${id}`; ///taxsearch/cybertax/search-service//nhomquyen/search-all
    //   return await this.request(url, null, TypeMethodConstantEnum.GET);
    // }

    // async deleteNhomQuyenCtById(id) {
    //   let url = `${PREFIX_URL_NHOMQUYEN}/nhomquyen/delete/${id}`; ///taxsearch/cybertax/search-service//nhomquyen/search-all
    //   return await this.request(url, null, TypeMethodConstantEnum.POST);
    // }

    // async updateNhomQuyen(id, dataBody) {
    //   let url = `${PREFIX_URL_NHOMQUYEN}/nhomquyen/update/${id}`; ///taxsearch/cybertax/search-service//nhomquyen/search-all
    //   return await this.request(url, dataBody, TypeMethodConstantEnum.POST);
    // }


}
export default CatalogService;