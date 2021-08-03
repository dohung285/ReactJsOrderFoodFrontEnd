
import axios from "axios";
import { PREFIX_URL_ORDERFOOD } from "../constants/ConstantUrlAPI";
import { TypeMethodConstantEnum } from "../helper/MethodAPIConstant";
import FetchAPI from "./FetchAPI";


class FoodService extends FetchAPI {


    async getFoodDetailByFoodId(foodId) {
        let url = `${PREFIX_URL_ORDERFOOD}/food/foodDetail?foodId=${foodId}`;
        return await this.request(url, null, TypeMethodConstantEnum.GET);
    }

    async saveFood(data) {
        let url = `${PREFIX_URL_ORDERFOOD}/food`;
        return await this.request(url, data, TypeMethodConstantEnum.POST);
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

 


}
/*
export const saveFood = (data) => {
    console.log({ data })
    return axios.post(`http://localhost:8082/services${PREFIX_URL_ORDERFOOD}/food`, data)
}
*/

export default FoodService;
