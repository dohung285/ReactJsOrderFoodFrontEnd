import FetchAPI from "./FetchAPI";
import { TypeMethodConstantEnum } from "../helper/MethodAPIConstant";
const PREFIX_URL = "hethong/cybertax/api";
class NhomQuyenService extends FetchAPI {
    public async getDataNhomQuenCt(dataSearch : any) {
        let url = `${PREFIX_URL}/nqcnchitiet`;
        return await this.request(
            url,
            dataSearch,
            TypeMethodConstantEnum.GET
        );
    }
}
export default NhomQuyenService;