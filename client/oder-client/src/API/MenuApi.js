import axiosClient from "./AxiosCliend"

const MenuApi = {
    getAll: (params) => {
        const url = `/menu/allproduct/${params}`
        return axiosClient.get(url)
    },
    getAproduct: (params) => {
        const url = `/menu/product/?classify=${params.classify}&category=${params.category}&key=${params.key}`
        return axiosClient.get(url)
    },
    addProduct: (data) => {
        const url = '/menu/addproduct';
        return axiosClient.post(url, data);
    },
    deleteProduct: (data) => {
        const url = '/menu/deleteproduct'
        return axiosClient.post(url, data);
    },
    repairProduct: (data) => {
        const url = '/menu/repairproduct';
        return axiosClient.post(url, data)
    },
    oderOption: (data) => {
        const url = '/menu/oderoption';
        return axiosClient.post(url, data)
    }

}

export default MenuApi;