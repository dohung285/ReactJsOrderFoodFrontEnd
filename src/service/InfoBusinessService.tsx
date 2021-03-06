import { TypeMethodConstantEnum } from "../helper/MethodAPIConstant";
import FetchAPI from "./FetchAPI";

const PREFIX_URL = "taxsearch/cybertax/search-service/thongtin-doanhnghiep";
const PREFIX_ADD ="doanhnghiep/cybertaxv2/api/ttdn"

class InfoBusinessService extends FetchAPI {
    public async getDataInfoBusiness(dataSearch : any) {
        let url = `${PREFIX_URL}/search-all?`;
        return await this.request(
            url,
            dataSearch,
            TypeMethodConstantEnum.GET
        );
    }
    public async getDataInfoBusinessById() {
        let url = `${PREFIX_ADD}/getttdnbyuser`;
        return await this.request(
            url,
            {},
            TypeMethodConstantEnum.GET
        );
    }
    public async saveInfoBusiness(data : any){
        let url = `${PREFIX_ADD}/save`;
        return await this.request(
            url,
            data,
            TypeMethodConstantEnum.POST
        )
    }
    public async updateInfoBusiness(id:number ,data:any){
        let url= `${PREFIX_ADD}/update/${id}`;
        return await this.request(
            url,
            data,
            TypeMethodConstantEnum.POST
        )
    }
}



export default InfoBusinessService;