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
    public async getDataInfoBusinessByID(id:any ,databody:any) {
        let url = `${PREFIX_ADD}/details/${id}`;
        return await this.request(
            url,
            databody,
            TypeMethodConstantEnum.GET
        );
    }
    public async saveInfoBusiness(data : any){
        let url = `${PREFIX_ADD}/save`;
        console.log(url)
        return await this.request(
            url,
            data,
            TypeMethodConstantEnum.POST
        )
    }
    public async updateInfoBusiness(mst : any){
        let url= `${PREFIX_ADD}/update/${mst}`;
        return await this.request(
            url,
            mst,
            TypeMethodConstantEnum.POST
        )
    }
}



export default InfoBusinessService;