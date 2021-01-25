import FetchAPI from "./FetchAPI";
import { TypeMethodConstantEnum } from "../helper/MethodAPIConstant";
import { PREFIX_URL_USER } from "../constants/ConstantUrlAPI";
// const PREFIX_URL = "taxsearch/api/cybertax/nguoi-dung";
class UserServices extends FetchAPI {
    public async getDataUser(dataSearch : any) {
        let url = `${PREFIX_URL_USER}/search-all`;
        return await this.request(
            url,
            dataSearch,
            TypeMethodConstantEnum.GET
        );
    }
}
export default UserServices;