import axiosClient from "../../API/AxiosCliend";

const oderApi = {
    addProduct: (data) => {
        const url = `oder/${data.keyTable}`
        axiosClient.post(url, data.dataOder)
    },
    removeProduct: (params) => {
        const { keyTable, keyFood } = params
        const url = `/oder/deletefood/${keyTable}/${keyFood}`;
        axiosClient.get(url)
    }
}

export default oderApi;