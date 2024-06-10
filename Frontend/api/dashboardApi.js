import {api, setHeaders} from "./api.js";

export const dashboardApi = {
    sumOrderTo5MonthRecent() {
        const url = "/order/stats";
        return api.get(url, setHeaders());
    },
    sumPuscharOrderTo5MonthRecent() {
        const url = "/order/income/stats";
        return api.get(url, setHeaders());
    },
    sumPuscharOrderTo7dayRecent() {
        const url = "/order/week-sales";
        return api.get(url, setHeaders());
    },

}