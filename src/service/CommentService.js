



import {  PREFIX_URL_ORDERFOOD } from "../constants/ConstantUrlAPI";
import { TypeMethodConstantEnum } from "../helper/MethodAPIConstant";
import FetchAPI from "./FetchAPI";


class CommentService extends FetchAPI {

  
    async getAll() {
        let url = `${PREFIX_URL_ORDERFOOD}/comment`;
        return await this.request(url, null, TypeMethodConstantEnum.GET);
    }

    async save(dataBody) {
        let url = `${PREFIX_URL_ORDERFOOD}/comment`;
        return await this.request(url, dataBody, TypeMethodConstantEnum.POST);
    }

    async delete(commentId) {
        let url = `${PREFIX_URL_ORDERFOOD}/comment/${commentId}`;
        return await this.request(url, null, TypeMethodConstantEnum.DELETE);
    }


}
export default CommentService;
