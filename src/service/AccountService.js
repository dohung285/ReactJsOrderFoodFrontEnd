





import {  PREFIX_URL_ORDERFOOD } from "../constants/ConstantUrlAPI";
import { TypeMethodConstantEnum } from "../helper/MethodAPIConstant";
import FetchAPI from "./FetchAPI";


class AccountService extends FetchAPI {

  
     async getAll() {
        let url = `${PREFIX_URL_ORDERFOOD}/accounts`;
        return await this.request(url, null, TypeMethodConstantEnum.GET);
    }


    async getAccountDetail(id) {
        let url = `${PREFIX_URL_ORDERFOOD}/accounts/${id}`;
        return await this.request(url, null, TypeMethodConstantEnum.GET);
    }

    async changePassword(userId,dataBody) {
        let url = `${PREFIX_URL_ORDERFOOD}/change-password/${userId}`;
        return await this.request(url,dataBody , TypeMethodConstantEnum.PUT);
    }

    // async countNumber(username) {
    //     let url = `${PREFIX_URL_ORDERFOOD}/card/number?username=${username}`;
    //     return await this.request(url, null, TypeMethodConstantEnum.GET);
    // }

    // async getAllFoodIntoCardByUsername(page,size,username) { //page=${page}&size=${size}
    //     let url = `${PREFIX_URL_ORDERFOOD}/card?&username=${username}`;   
    //     return await this.request(url, null, TypeMethodConstantEnum.GET);
    // }

    async deleteAccount(id) {   //delete-account/4e88a385-6ae5-448a-a85c-b3edc3fc601a
        let url = `${PREFIX_URL_ORDERFOOD}/delete-account/${id}`;
        return await this.request(url, null, TypeMethodConstantEnum.DELETE);
    }

    // async updateAmountOfFoodIntoCardById(cardId,cardBody) {
    //     let url = `${PREFIX_URL_ORDERFOOD}/card?cardId=${cardId}`;
    //     return await this.request(url, cardBody, TypeMethodConstantEnum.PUT);
    // }

    // async deleteFoodIntoCardSelected(cardIds) {
    //     let url = `${PREFIX_URL_ORDERFOOD}/card/all/?cardIds=${cardIds}`;
    //     return await this.request(url, null, TypeMethodConstantEnum.DELETE);
    // }

    // async deleteFoodIntoCardSelected(cardIds) {
    //     let url = `${PREFIX_URL_ORDERFOOD}/card/all/?cardIds=${cardIds}`;
    //     return await this.request(url, null, TypeMethodConstantEnum.DELETE);
    // }





}
export default AccountService;

