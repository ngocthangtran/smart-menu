import axiosClient from "../../../../API/AxiosCliend"

const oderApi = {
    addProduct: (data) => {
        const url = `oder/${data.keyTable}`
        axiosClient.post(url, data.dataOder)
    }
}

export default oderApi;