


import {  PREFIX_URL_ORDERFOOD } from "../constants/ConstantUrlAPI";
import { TypeMethodConstantEnum } from "../helper/MethodAPIConstant";
import FetchAPI from "./FetchAPI";


class DiscountService extends FetchAPI {

  
    async getAll() {
        let url = `${PREFIX_URL_ORDERFOOD}/discounts`;
        return await this.request(url, null, TypeMethodConstantEnum.GET);
    }


    async getAllForFood() {
        let url = `${PREFIX_URL_ORDERFOOD}/discountId-foods`;
        return await this.request(url, null, TypeMethodConstantEnum.GET);
    }


    async save(dataBody) {
        let url = `${PREFIX_URL_ORDERFOOD}/discount`;
        return await this.request(url, dataBody, TypeMethodConstantEnum.POST);
    }

    async delete(discountId) {
        let url = `${PREFIX_URL_ORDERFOOD}/discount/${discountId}`;
        return await this.request(url, null, TypeMethodConstantEnum.DELETE);
    }


}
export default DiscountService;
