
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




}
/*
export const saveFood = (data) => {
    console.log({ data })
    return axios.post(`http://localhost:8082/services${PREFIX_URL_ORDERFOOD}/food`, data)
}
*/

export default FoodService;
