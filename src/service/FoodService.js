
import axios from "axios";
import { PREFIX_URL_ORDERFOOD } from "../constants/ConstantUrlAPI";
import { TypeMethodConstantEnum } from "../helper/MethodAPIConstant";
import FetchAPI from "./FetchAPI";


class FoodService extends FetchAPI {


    async getAll(daa) {
        let url = `${PREFIX_URL_ORDERFOOD}/food`;
        return await this.request(url, null, TypeMethodConstantEnum.GET);
    }

    async getFoodDetailByFoodId(foodId) {
        let url = `${PREFIX_URL_ORDERFOOD}/food/foodDetail?foodId=${foodId}`;
        return await this.request(url, null, TypeMethodConstantEnum.GET);
    }

    async saveFood(data) {
        try {
            let url = `${PREFIX_URL_ORDERFOOD}/food`;
            return await this.request(url, data, TypeMethodConstantEnum.POST);
        } catch (e) {
            throw e
        }
    }

    async updateDiscountIdToFoods(data) {
        let url = `${PREFIX_URL_ORDERFOOD}/food/update-discountid`;
        return await this.request(url, data, TypeMethodConstantEnum.PUT);
    }

    async getAllFoodForDiscount() {
        let url = `${PREFIX_URL_ORDERFOOD}/food/all`;
        return await this.request(url, null, TypeMethodConstantEnum.GET);
    }

    async getAllFoodHadDiscount() {
        let url = `${PREFIX_URL_ORDERFOOD}/food/had-discount`;
        return await this.request(url, null, TypeMethodConstantEnum.GET);
    }

    async deleteFood(id) {
        let url = `${PREFIX_URL_ORDERFOOD}/food/${id}`;
        return await this.request(url, null, TypeMethodConstantEnum.DELETE);
    }

    async updateNameAndPrice(dataBody, id) {
        try {
            let url = `${PREFIX_URL_ORDERFOOD}/food/priceAndName/${id}`;
            return await this.request(url, dataBody, TypeMethodConstantEnum.PUT);
        } catch (e) {
            throw e
        }
    }

    async deleteAllFood(ids) {
        let url = `${PREFIX_URL_ORDERFOOD}/food/delete-ids?ids=${ids}`;
        return await this.request(url, null, TypeMethodConstantEnum.DELETE);
    }



}
/*
/food/priceAndName/{id}
export const saveFood = (data) => {
    console.log({ data })
    return axios.post(`http://localhost:8082/services${PREFIX_URL_ORDERFOOD}/food`, data)
}
*/

export default FoodService;
