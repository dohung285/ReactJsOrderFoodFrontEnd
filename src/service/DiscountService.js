


import { PREFIX_URL_ORDERFOOD } from "../constants/ConstantUrlAPI";
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
        try {
            let url = `${PREFIX_URL_ORDERFOOD}/discount`;
            return await this.request(url, dataBody, TypeMethodConstantEnum.POST);
        } catch (error) {
            throw error
        }

    }

    async updateNameAndPercent(dataBody, discountId) {
        try {
            let url = `${PREFIX_URL_ORDERFOOD}/discount/percentAndName/${discountId}`;
            return await this.request(url, dataBody, TypeMethodConstantEnum.PUT);
        } catch (e) {
            throw e
        }
    }


    async update(discountId) {
        let url = `${PREFIX_URL_ORDERFOOD}/discount/${discountId}`;
        return await this.request(url, null, TypeMethodConstantEnum.PUT);
    }

    async delete(discountId) {
        let url = `${PREFIX_URL_ORDERFOOD}/discount/${discountId}`;
        return await this.request(url, null, TypeMethodConstantEnum.DELETE);
    }


}
export default DiscountService;
