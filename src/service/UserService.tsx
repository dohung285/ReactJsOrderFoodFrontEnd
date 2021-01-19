import FetchAPI from "./FetchAPI";
import { TypeMethodConstantEnum } from "../helper/MethodAPIConstant";
const PREFIX_URL = "nguoi-dung";
class UserServices extends FetchAPI {
    public async getDataUser(dataSearch : any) {
        let url = `${PREFIX_URL}/search-all`;
        return await this.request(
            url,
            dataSearch,
            TypeMethodConstantEnum.GET
        );
    }
}
export default UserServices;