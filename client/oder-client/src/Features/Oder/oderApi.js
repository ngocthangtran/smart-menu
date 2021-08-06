
import { database } from "../../utils/firebase";


const nameRef = process.env.REACT_APP_NAME_REF_ODER

const oderApi = {
    addProduct: (data) => {
        // const url = `oder/${data.keyTable}`
        // axiosClient.post(url, data.dataOder)
        const { keyTable, dataOder } = data
        const dataRes = database.ref(`${nameRef}/${keyTable}`).child('/dataOder').update(dataOder).then(res => {
            return {
                status: 200,
                message: "Hoàn thành"
            }
        }).catch(err => {
            console.error('OderApi/RemoveProduct', err)
            return {
                status: 500,
                message: "Có lỗi"
            }
        })
        return dataRes
    },
    removeProduct: (params) => {
        const { keyTable, keyFood } = params
        const dataRes = database.ref(`${nameRef}/${keyTable}/dataOder`).child(keyFood).remove()
            .then(res => {
                return {
                    status: 200,
                    message: "Hoàn thành"
                }
            }).catch(err => {
                console.error('OderApi/RemoveProduct')
                return {
                    status: 500,
                    message: "Có lỗi"
                }
            })
        return dataRes;
    },
    quantityChange: async (params) => {
        const { keyTable, keyFood, quantityChange } = params;
        const ref = database.ref(`${nameRef}/${keyTable}/dataOder/${keyFood}/amount/`)
        return await ref.update({ amount: quantityChange }).then(res => {
            return {
                status: 200,
                message: "Hoàn thành"
            }
        }).catch(err => {
            console.error('OderApi/QuantityChangeProduct')
            return {
                status: 500,
                message: "Có lỗi"
            }
        })
    }
}

export default oderApi;