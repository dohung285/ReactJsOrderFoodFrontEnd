 

 



import {  PREFIX_URL_ORDERFOOD } from "../constants/ConstantUrlAPI";
import { TypeMethodConstantEnum } from "../helper/MethodAPIConstant";
import FetchAPI from "./FetchAPI";


class OrderStatusService extends FetchAPI {

  
    async getAll() {
        let url = `${PREFIX_URL_ORDERFOOD}/orderStatus`;
        return await this.request(url, null, TypeMethodConstantEnum.GET);
    }

    async update(id,dataBody) {
        let url = `${PREFIX_URL_ORDERFOOD}/orderStatus/${id}`;
        return await this.request(url, dataBody, TypeMethodConstantEnum.PUT);
    }

    // async delete(commentId) {
    //     let url = `${PREFIX_URL_ORDERFOOD}/orderStatus/${commentId}`;
    //     return await this.request(url, null, TypeMethodConstantEnum.DELETE);
    // }


}
export default OrderStatusService;