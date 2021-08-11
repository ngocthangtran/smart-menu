
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
    },
    getATable: (params) => {
        
    },
    addNewTable: async (params) => {
        const { keyTable, data } = params
        const res = await database.ref(`${nameRef}/${keyTable}`).set(data)
            .then(res => {
                return {
                    status: 200,
                    message: "Hoàn thành"
                }
            }).catch(err => {
                console.error('OderApi/AddNewTable')
                return {
                    status: 500,
                    message: "Có lỗi"
                }
            })
    },
    checkTableExsitInOder: async (params) => {
        const { keyTable } = params;
        const ref = await database.ref(`${nameRef}/${keyTable}`)
            .get()
            .then(snapShort => {
                if (snapShort.exists()) {
                    return {
                        status: 200,
                        message: 'Tồn tại bàn này',
                        data: snapShort.val()
                    }
                }
                else {
                    return {
                        status: 404,
                        message: 'Không tìm thấy bàn'
                    }
                }
            }).catch(err => {
                console.log('err on TableApi/CheckTable')
                throw {
                    status: 500,
                    message: 'Lỗi không thể lấy bàn',
                    location: 'TableApi/getlasttable'
                }
            })
        return ref;
    }
}

export default oderApi;