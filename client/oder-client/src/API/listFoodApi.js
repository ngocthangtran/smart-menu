import axiosClient from "./AxiosCliend"

const ListFood = {
    getAll:(params)=>{
        const url='/menu/allproduct'
        return axiosClient.get(url)
    }
}

export default ListFood;