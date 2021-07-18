




import {  PREFIX_URL_ORDERFOOD } from "../constants/ConstantUrlAPI";
import { TypeMethodConstantEnum } from "../helper/MethodAPIConstant";
import FetchAPI from "./FetchAPI";


class OrderService extends FetchAPI {

  
    async saveOrder(orderBody) {
        let url = `${PREFIX_URL_ORDERFOOD}/order`;
        return await this.request(url, orderBody, TypeMethodConstantEnum.POST);
    }

    
    async getAllOrderByUsername(username) {
        let url = `${PREFIX_URL_ORDERFOOD}/order/${username}`;
        return await this.request(url, null, TypeMethodConstantEnum.GET);
    }



   
}
export default OrderService;