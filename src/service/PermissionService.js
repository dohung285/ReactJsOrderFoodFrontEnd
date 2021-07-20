import {
  PREFIX_URL_NHOMQUYEN, PREFIX_URL_ORDERFOOD
} from "../constants/ConstantUrlAPI";
import { TypeMethodConstantEnum } from "../helper/MethodAPIConstant";
import FetchAPI from "./FetchAPI";
  
  class PermissionService extends FetchAPI {

      //lấy ra tất cả các quyền thuộc về user
      async getAllPermission(){
        let url = `${PREFIX_URL_ORDERFOOD}/permission`; 
         return await this.request(url,null, TypeMethodConstantEnum.GET);
     }

    // //lấy ra tất cả các quyền thuộc về user
    // async getAllPermissionByUser(){
    //    let url = `${PREFIX_URL_NHOMQUYEN}/ndnq/getNdNq`; ///taxsearch/cybertax/search-service//nhomquyen/search-all
    //     return await this.request(url,null, TypeMethodConstantEnum.GET);
    // }

    //save
    async save(dataBody){
      let url = `${PREFIX_URL_ORDERFOOD}/permission`; 
       return await this.request(url,dataBody, TypeMethodConstantEnum.POST);
   }


  }
  export default PermissionService;
  