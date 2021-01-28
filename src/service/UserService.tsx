import FetchAPI from "./FetchAPI";
import { TypeMethodConstantEnum } from "../helper/MethodAPIConstant";
import { PREFIX_URL_USER_ADD_EDIT_DELETE, PREFIX_URL_USER_SEARCH } from "../constants/ConstantUrlAPI";
// const PREFIX_URL = "taxsearch/api/cybertax/nguoi-dung";
class UserServices extends FetchAPI {
    public async getDataUser(dataSearch : any) {
        let url = `${PREFIX_URL_USER_SEARCH}/search-all`;
        return await this.request(
            url,
            dataSearch,
            TypeMethodConstantEnum.GET
        );
    }


    public async deleteUser(dataSearch : any) {   
        //hethong/cybertax/api/nguoidung
        // let tmp = 'http://192.168.21.100:9900/cybertax/api/nguoidung' 
        // let url = `${tmp}/xoa/${dataSearch}`;
        let url = `${PREFIX_URL_USER_ADD_EDIT_DELETE}/xoa/${dataSearch}`;
        
        return await this.request(
            url,
            dataSearch,
            TypeMethodConstantEnum.POST
        );
    }



}
export default UserServices;