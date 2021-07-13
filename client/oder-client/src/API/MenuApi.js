import axiosClient from "./AxiosCliend"

const MenuApi = {
    getAll: (params) => {
        const url = '/menu/allproduct'
        return axiosClient.get(url)
    },
    addProduct: (data) => {
        const url = '/menu/addproduct';
        return axiosClient.post(url, data);
    }

}

export default MenuApi;