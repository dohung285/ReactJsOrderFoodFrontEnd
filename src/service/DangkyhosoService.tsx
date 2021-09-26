import {
  PREFIX_URL_NOPTOKHAI
  } from "../constants/ConstantUrlAPI";
  import { TypeMethodConstantEnum } from "../helper/MethodAPIConstant";
  import FetchAPI from "./FetchAPI";
  // const PREFIX_URL = "taxsearch/api/cybertax/nguoi-dung";
  class DangkyhosoService extends FetchAPI {
    public async getData() {
      let url = `${PREFIX_URL_NOPTOKHAI}/dmhsgroup`;
      return await this.request(url, {}, TypeMethodConstantEnum.GET);
    }

    public async dangKyHoso(data: any) {
      let url = `${PREFIX_URL_NOPTOKHAI}/dangkyhoso`;
      return await this.request(url, data, TypeMethodConstantEnum.POST);
    }

    public async kyVaNopHoso(id: any) {
      let url = `${PREFIX_URL_NOPTOKHAI}/ky-va-nop-hoso?id=${id}`;
      return await this.request(url, {}, TypeMethodConstantEnum.POST);
    }
  }
  export default DangkyhosoService;
  