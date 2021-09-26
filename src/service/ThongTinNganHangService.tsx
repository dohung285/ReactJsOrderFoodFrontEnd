import { TypeMethodConstantEnum } from "../helper/MethodAPIConstant";
import FetchAPI from "./FetchAPI";

const PREFIX_URL = "doanhnghiep/cybertaxv2/api"

class ThongTinNganHangService extends FetchAPI {
    public async layThongTinNganHangTheoDoanhNghiep() {
        let url = `${PREFIX_URL}/nh/getdsnhbyuser`;
        return await this.request(url,
            {},
            TypeMethodConstantEnum.GET);
    }
    public async themNganHang(data: any) {
        let url = `${PREFIX_URL}/nh/save`;
        return await this.request(url, data, TypeMethodConstantEnum.POST)
    }
    public async suaNganHang(id: string, data: any) {
        let url = `${PREFIX_URL}/nh/update/${id}`;
        return await this.request(url, data, TypeMethodConstantEnum.POST)
    }
    public async xoaNganHang(id:any) {
        console.log(id)
        let url = `${PREFIX_URL}/nh/delete/${id}`;
        return await this.request(url, {}, TypeMethodConstantEnum.POST)
    }
    public async layNganHangTheoTen(name:string){
        let url = `${PREFIX_URL}/nh/details/${name}`;
        return await this.request(url, {}, TypeMethodConstantEnum.GET)
    }
}

export default ThongTinNganHangService;