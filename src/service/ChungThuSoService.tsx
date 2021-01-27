import FetchAPI from "./FetchAPI";
import { TypeMethodConstantEnum } from "../helper/MethodAPIConstant";
const PREFIX_URL = "/taxsearch/cybertax/search-service/chungthuso";
class ChungThuSoService extends FetchAPI {
    public async getList(dataSearch : any) {
        let url = `${PREFIX_URL}/search-all`;
        return await this.request(
            url,
            dataSearch,
            TypeMethodConstantEnum.GET
        );
    }

    public async addChungThuSo(dataUpdate : any) {
        let url = '/hethong/cybertax/api/cts/save';
        return await this.request(
            url,
            dataUpdate,
            TypeMethodConstantEnum.POST
        );
    }

    public async deleteChungThuSo(dataDelete : any) {
        let url = `${PREFIX_URL}/search-all`;
        return await this.request(
            url,
            dataDelete,
            TypeMethodConstantEnum.POST
        );
    }

    public async updateChungThuSo(dataUpdate : any) {
        let url = '/hethong/cybertax/api/cts/update';
        return await this.request(
            url,
            dataUpdate,
            TypeMethodConstantEnum.POST
        );
    }
}
export default ChungThuSoService;