

import { PREFIX_URL_ORDERFOOD, PREFIX_URL_ORDERFOOD_WITHOUT_PREFIX_API } from "../constants/ConstantUrlAPI";
import { TypeMethodConstantEnum } from "../helper/MethodAPIConstant";
import FetchAPI from "./FetchAPI";


class NotificationService extends FetchAPI {

    async pushNotification(cardBody) {
        let url = `${PREFIX_URL_ORDERFOOD_WITHOUT_PREFIX_API}/fcm/notification/data`;
        return await this.request(url, cardBody, TypeMethodConstantEnum.POST);
    }

    async getCurrentNumberNotification() {
        let url = `${PREFIX_URL_ORDERFOOD}/notification/number`;
        return await this.request(url, null, TypeMethodConstantEnum.GET);
    }

    async incrementNumberNotification() {
        let url = `${PREFIX_URL_ORDERFOOD}/notification/number/increment`;
        return await this.request(url, null, TypeMethodConstantEnum.PUT);
    }

    async clearNumberNotification() {
        let url = `${PREFIX_URL_ORDERFOOD}/notification/number/clear`;
        return await this.request(url, null, TypeMethodConstantEnum.PUT);
    }


}
export default NotificationService;