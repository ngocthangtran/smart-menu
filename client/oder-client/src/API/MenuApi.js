import { database } from "../utils/firebase"

const MenuApi = {
    getAll: async (params) => {
        const data = await database.ref(params).once("value")
            .then((snapSort) => snapSort.val())
            .catch(err => {
                console.error('loi', err)
            })
        return data
    },
    getAproduct: async (params) => {
        const { classify, category, key } = params
        const data = await database.ref(`${classify}/${category}/${key}`)
            .once("value")
            .then((snapSort) => snapSort.val())
        return data;
    },
    addProduct: async (data) => {
        const { classify, data: dataFood } = data
        const ref = database.ref(`${classify}/${dataFood.category}`);
        const key = ref.child('posts').push().key;
        dataFood.key = key;
        return await ref.child(key).set(dataFood).then(res => {
            return {
                status: 200,
                message: "Hoàn thành"
            }
        }).catch(err => {
            console.error('MenuApi/AddProduct', err)
            return {
                status: 500,
                message: "Có lỗi"
            }
        })
    },
    deleteProduct: async (data) => {
        const { category, key, classify } = data;
        return await database.ref(`${classify}/${category}`).child(key).remove().then(res => {
            return {
                status: 200,
                message: "Hoàn thành"
            }
        }).catch(err => {
            console.error('MenuApi/DeleteProduct', err)
            return {
                status: 500,
                message: "Có lỗi"
            }
        })
    },
    repairProduct: async (dataRepair) => {
        const { data, key, classify } = dataRepair;
        return await database.ref(`${classify}/${data.category}`)
            .child(key).set(data)
            .then(res => {
                return {
                    status: 200,
                    message: "Hoàn thành"
                }
            }).catch(err => {
                console.error('MenuApi/RepairProduct', err)
                return {
                    status: 500,
                    message: "Có lỗi"
                }
            })
    },
    oderOption: async (data) => {
        const { data: dataOption, key, classify } = data;
        console.log(dataOption, key, classify)
        return database.ref(`${classify}/${dataOption.category}`)
            .child(key).set(dataOption)
            .then(res => {
                return {
                    status: 200,
                    message: "Hoàn thành"
                }
            }).catch(err => {
                console.error('MenuApi/RepairProduct', err)
                return {
                    status: 500,
                    message: "Có lỗi"
                }
            })
    }

}

export default MenuApi;