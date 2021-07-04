


import {  PREFIX_URL_ORDERFOOD } from "../constants/ConstantUrlAPI";
import { TypeMethodConstantEnum } from "../helper/MethodAPIConstant";
import FetchAPI from "./FetchAPI";


class CardService extends FetchAPI {

  
    async saveCard(cardBody) {
        let url = `${PREFIX_URL_ORDERFOOD}/card`;
        return await this.request(url, cardBody, TypeMethodConstantEnum.POST);
    }

    async countNumber(username) {
        let url = `${PREFIX_URL_ORDERFOOD}/card/number?username=${username}`;
        return await this.request(url, null, TypeMethodConstantEnum.GET);
    }



}
export default CardService;