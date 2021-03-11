import {
    PREFIX_URL_NHOMQUYEN
} from "../constants/ConstantUrlAPI";
import { TypeMethodConstantEnum } from "../helper/MethodAPIConstant";
import FetchAPI from "./FetchAPI";

class LapGiayNopTienService extends FetchAPI {

    //Lấy toàn bộ danh sach tỉnh thành
    async getAllTinhThanh() {
        let url = `/dm/danhmuc/cybertaxv2/api/getalltinh`;
        return await this.request(url, null, TypeMethodConstantEnum.GET);
    }


    //Lấy toàn bộ danh sach quận/huyện theo tỉnh thành
    async getAllQuanHuyenById(id) {
        let url = `/dm/danhmuc/cybertaxv2/api/gethuyenbymatinh/${id}`;
        return await this.request(url, null, TypeMethodConstantEnum.GET);
    }


     //Lấy toàn bộ danh sach quận/huyện theo tỉnh thành
     async getAllXaPhuongById(id) {
        let url = `/dm/danhmuc/cybertaxv2/api/getallxabymahuyen/${id}`;
        return await this.request(url, null, TypeMethodConstantEnum.GET);
    }






}
export default LapGiayNopTienService;