import { database } from "../../../../utils/firebase"
const refTables = process.env.REACT_APP_NAME_REF_Table;

export const TableApi = {
    addNew: async (params) => {
        const { keyTable } = params
        const key = database.ref(`${refTables}`).key()
        const data = {
            ...params,
            keyTable
        }
        const res = await database.ref(`${refTables}/${keyTable}`).update(params)
            .then(res => {
                return {
                    status: 200,
                    message: 'Tạo bàn hoàn tất'
                }
            })
            .catch(err => {
                throw {
                    status: 500,
                    message: 'Lỗi không thể thêm bàn này',
                    location: 'TableApi'
                }
            })
        return res;
    },
    LastTable: async () => {
        const data = await database.ref(`${refTables}`)
            .get()
            .then((res) => {
                if (res.exists()) {
                    var data = res.val()[Object.keys(res.val())[0]]
                    Object.keys(res.val()).forEach(item => {
                        if (res.val()[item].numberTable > data.numberTable) {
                            data = res.val()[item]
                        }
                    })

                    return {
                        status: 200,
                        message: 'Đã tìm thấy bàn cuối cùng là bàn số ' + data.numberTable,
                        data: data
                    }
                }
                throw {
                    status: 404,
                    message: 'Chưa có bàn nào trong hệ thống'
                }
            }).catch(err => {
                console.error('err on TableApi/LastTable', err)
                throw {
                    status: 500,
                    message: 'Lỗi không thể lấy bàn',
                    location: 'TableApi/getlasttable'
                }
            })
        return data
    },
    checkTableExits: (param) => {
        const { keyTable } = param
        const data = database.ref(`${refTables}/${keyTable}`).get()
            .then(snapShort => {
                if (snapShort.exists()) {
                    return {
                        status: 200,
                        message: 'Tồn tại bàn này',
                        data: snapShort.val(),
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
        return data;
    },
    getAllTable: async () => {
        const data = await database.ref(refTables).get().then(
            (res) => {
                if (res.exists()) {
                    const data = [];
                    Object.keys(res.val()).map(item => {
                        data.push(res.val()[item])
                    })
                    data.sort((a, b) => (a.numberTable > b.numberTable) ? 1 : ((b.numberTable > a.numberTable) ? -1 : 0))
                    return data

                } else {
                    console.error('Not Desk in system')
                    throw {
                        status: 404,
                        message: "Không có bàn nào trong hệ thống"
                    }
                }
            }
        ).catch(err => {
            console.error('TableApi/GetAllTable')
            throw {
                status: 500,
                message: "Server Error"
            }
        })
        return data
    }
}