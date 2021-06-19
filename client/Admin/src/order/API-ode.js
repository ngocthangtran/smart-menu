import axios from "axios";
export const postFood = (tableKey, data)=>axios.post(`${process.env.REACT_APP_URL}/oder/${tableKey}`, data)