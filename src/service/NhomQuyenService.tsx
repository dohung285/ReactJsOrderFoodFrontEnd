import FetchAPI from "./FetchAPI";
import { TypeMethodConstantEnum } from "../helper/MethodAPIConstant";
import { PREFIX_URL_NHOMQUYEN } from "../constants/ConstantUrlAPI";
// const PREFIX_URL = "hethong/cybertax/api";
class NhomQuyenService extends FetchAPI {

    public async getDataNhomQuenCt(dataSearch : any) {
        let url = `${PREFIX_URL_NHOMQUYEN}/nqcnchitiet`;
        return await this.request(
            url,
            dataSearch,
            TypeMethodConstantEnum.GET
        );
    }

    // public async getNhomQuyenCtById(id : any) {
    //     let url = `${PREFIX_URL_NHOMQUYEN}/nqcnchitiet`;  // hethong/cybertax/api/nqcnchitiet
    //     return await this.request(
    //         url,
    //         id,
    //         TypeMethodConstantEnum.GET
    //     );
    // }






}
export default NhomQuyenService;