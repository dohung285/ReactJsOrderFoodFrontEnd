


import {  PREFIX_URL_ORDERFOOD } from "../constants/ConstantUrlAPI";
import { TypeMethodConstantEnum } from "../helper/MethodAPIConstant";
import FetchAPI from "./FetchAPI";


class FoodGroupService extends FetchAPI {

  
    async getAllFoodGroup() {
        let url = `${PREFIX_URL_ORDERFOOD}/foodGroup`;
        return await this.request(url, null, TypeMethodConstantEnum.GET);
    }

    async saveFoodGroup(dataBody) {
        let url = `${PREFIX_URL_ORDERFOOD}/foodGroup`;
        return await this.request(url, dataBody, TypeMethodConstantEnum.POST);
    }

    async deleteFoodGroupById(foodGroupId) {
        let url = `${PREFIX_URL_ORDERFOOD}/foodGroup/${foodGroupId}`;
        return await this.request(url, null, TypeMethodConstantEnum.DELETE);
    }


}
export default FoodGroupService;
