
import {  PREFIX_URL_ORDERFOOD } from "../constants/ConstantUrlAPI";
import { TypeMethodConstantEnum } from "../helper/MethodAPIConstant";
import FetchAPI from "./FetchAPI";


class FoodService extends FetchAPI {

  
    async getFoodDetailByFoodId(foodId) {
        let url = `${PREFIX_URL_ORDERFOOD}/food/foodDetail?foodId=${foodId}`;
        return await this.request(url, null, TypeMethodConstantEnum.GET);
    }
}
export default FoodService;
