

import { PREFIX_URL_ORDERFOOD_WITHOUT_PREFIX_API } from "../constants/ConstantUrlAPI";
import { TypeMethodConstantEnum } from "../helper/MethodAPIConstant";
import FetchAPI from "./FetchAPI";


class NotificationService extends FetchAPI {

    async pushNotification(cardBody) {
        let url = `${PREFIX_URL_ORDERFOOD_WITHOUT_PREFIX_API}/fcm/notification/data`;
        return await this.request(url, cardBody, TypeMethodConstantEnum.POST);
    }
}
export default NotificationService;