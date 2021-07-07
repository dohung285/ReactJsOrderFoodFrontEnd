


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

    async getAllFoodIntoCardByUsername(page,size,username) { //page=${page}&size=${size}
        let url = `${PREFIX_URL_ORDERFOOD}/card?&username=${username}`;   
        return await this.request(url, null, TypeMethodConstantEnum.GET);
    }

    async deleteFoodIntoCardByUsername(cardId) {
        let url = `${PREFIX_URL_ORDERFOOD}/card/${cardId}`;
        return await this.request(url, null, TypeMethodConstantEnum.DELETE);
    }

    async updateAmountOfFoodIntoCardById(cardId,cardBody) {
        let url = `${PREFIX_URL_ORDERFOOD}/card?cardId=${cardId}`;
        return await this.request(url, cardBody, TypeMethodConstantEnum.PUT);
    }

    async deleteFoodIntoCardSelected(cardIds) {
        let url = `${PREFIX_URL_ORDERFOOD}/card/all/?cardIds=${cardIds}`;
        return await this.request(url, null, TypeMethodConstantEnum.DELETE);
    }






}
export default CardService;