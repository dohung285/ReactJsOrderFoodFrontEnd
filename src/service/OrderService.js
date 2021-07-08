




import {  PREFIX_URL_ORDERFOOD } from "../constants/ConstantUrlAPI";
import { TypeMethodConstantEnum } from "../helper/MethodAPIConstant";
import FetchAPI from "./FetchAPI";


class OrderService extends FetchAPI {

  
    async saveOrder(orderBody) {
        let url = `${PREFIX_URL_ORDERFOOD}/order`;
        return await this.request(url, orderBody, TypeMethodConstantEnum.POST);
    }

   
}
export default OrderService;