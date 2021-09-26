


import {  PREFIX_URL_ORDERFOOD } from "../constants/ConstantUrlAPI";
import { TypeMethodConstantEnum } from "../helper/MethodAPIConstant";
import FetchAPI from "./FetchAPI";


class ReportService extends FetchAPI {
    async getAll() {
        let url = `${PREFIX_URL_ORDERFOOD}/report/countBuy`;
        return await this.request(url, null, TypeMethodConstantEnum.GET);
    }

    async getRevenueOfYear() {
        let url = `${PREFIX_URL_ORDERFOOD}/report/revenueOfYear`;
        return await this.request(url, null, TypeMethodConstantEnum.GET);
    }

    async getTotal(month,year) {
        let url = `${PREFIX_URL_ORDERFOOD}/report/total?month=${month}&year=${year}`;
        return await this.request(url, null, TypeMethodConstantEnum.GET);
    }

    async getReport(orderId) {
        let url = `${PREFIX_URL_ORDERFOOD}/report/${orderId}`;
        return await this.request(url, null, TypeMethodConstantEnum.GET);
    }



}
export default ReportService;
