import {
  PREFIX_URL_DANGKYHOSO,
    PREFIX_URL_DANHMUCHOSO,
    PREFIX_URL_KYVANOPHOSO
  } from "../constants/ConstantUrlAPI";
  import { TypeMethodConstantEnum } from "../helper/MethodAPIConstant";
  import FetchAPI from "./FetchAPI";
  // const PREFIX_URL = "taxsearch/api/cybertax/nguoi-dung";
  class DangkyhosoService extends FetchAPI {
    public async getData() {
      let url = `${PREFIX_URL_DANHMUCHOSO}/dmhsgroup`;
      return await this.request(url, {}, TypeMethodConstantEnum.GET);
    }

    public async dangKyHoso(data: any) {
      let url = `${PREFIX_URL_DANGKYHOSO}/dangkyhoso`;
      return await this.request(url, data, TypeMethodConstantEnum.POST);
    }

    public async kyVaNopHoso(id: any) {
      let url = `${PREFIX_URL_KYVANOPHOSO}/ky-va-nop-hoso?id=${id}`;
      return await this.request(url, {}, TypeMethodConstantEnum.POST);
    }
  }
  export default DangkyhosoService;
  