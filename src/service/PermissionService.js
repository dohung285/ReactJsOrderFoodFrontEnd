import {
    PREFIX_URL_NHOMQUYEN,
    PREFIX_URL_NHOMQUYEN_PAGING,
  } from "../constants/ConstantUrlAPI";
  import { TypeMethodConstantEnum } from "../helper/MethodAPIConstant";
  import FetchAPI from "./FetchAPI";
  
  class PermissionService extends FetchAPI {

    //lấy ra tất cả các quyền thuộc về user
    async getAllPermissionByUser(){
       let url = `${PREFIX_URL_NHOMQUYEN}/ndnq/getNdNq`; ///taxsearch/cybertax/search-service//nhomquyen/search-all
        return await this.request(url,null, TypeMethodConstantEnum.GET);
    }
  }
  export default PermissionService;
  