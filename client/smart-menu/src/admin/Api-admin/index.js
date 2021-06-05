import axios from "axios";

export const getAddMenu = (()=> axios.get(`${process.env.REACT_APP_URL}/menu/product/`));
// export const getAddMenu = (()=> fetch(`${process.env.REACT_APP_URL}/products`));