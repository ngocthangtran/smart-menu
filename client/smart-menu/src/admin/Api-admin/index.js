import axios from "axios";

export const getAddMenu = ()=> axios.get(`${process.env.REACT_APP_URL}/menu/product/`);

export const addDataProduct = (data)=>axios.post(`${process.env.REACT_APP_URL}/menu/addproduct`,data)