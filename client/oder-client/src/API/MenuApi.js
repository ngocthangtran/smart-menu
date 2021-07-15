import axiosClient from "./AxiosCliend"

const MenuApi = {
    getAll: (params) => {
        const url = '/menu/allproduct'
        return axiosClient.get(url)
    },
    addProduct: (data) => {
        const url = '/menu/addproduct';
        return axiosClient.post(url, data);
    },
    deleteProduct: (key) => {
        const url='/menu/deleteproduct'
        return axiosClient.get(url, key);
    }

}

export default MenuApi;