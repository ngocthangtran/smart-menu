import axios from "axios";

export const getAddMenu = ()=> axios.get(`${process.env.REACT_APP_URL}/menu/allproduct`);

export const addDataProduct = (data)=>axios.post(`${process.env.REACT_APP_URL}/menu/addproduct`,data)

export const getProduct = (category, key)=>axios.get(`${process.env.REACT_APP_URL}/menu/product/?category=${category}&key=${key}`)