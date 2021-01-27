import { PREFIX_URL_NHOMQUYEN_PAGING } from "../constants/ConstantUrlAPI";
import { TypeMethodConstantEnum } from "../helper/MethodAPIConstant";
import FetchAPI from "./FetchAPI";

class RegisterTvanService extends FetchAPI {

  async getAllWithPaging(dataBody) {
    let url = `${PREFIX_URL_NHOMQUYEN_PAGING}/thongtin-doanhnghiep/search-all`; ///taxsearch/cybertax/search-service//nhomquyen/search-all
    return await this.request(url, dataBody, TypeMethodConstantEnum.GET);
  }

  async searchWithMstAndPaging(dataBody) {
    let url = `${PREFIX_URL_NHOMQUYEN_PAGING}/thongtin-doanhnghiep/search-by-masothue-param`; ///taxsearch/cybertax/search-service//nhomquyen/search-all
    return await this.request(url, dataBody, TypeMethodConstantEnum.GET);
  }


}
export default RegisterTvanService;
