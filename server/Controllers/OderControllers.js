const database = require('../firebase/handlingRealtime').database;

//Create
const CreateNewOder = (tableKey, res) => {
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var nameRef = `Oder/${tableKey}`

    const data = {
        keyTable: tableKey,
        timeIn: time,
        date: date
    }

    const ref = database.ref(`${nameRef}`)
    ref.once('value').then(snap => snap.exists())
        .then(check => {
            if (!check) {
                ref.set(data, (error) => {
                    if (error) {
                        res.status(200).send({
                            "message": "more failed oder"
                        })
                    } else {
                        res.status(200).send({
                            "message": "add oder successful",
                            "keyTable": data.keyTable
                        })
                    }
                })
            }
            else {
                res.status(200).send({
                    "message": "more failed oder",
                    "Details": "desk in use"
                })
            }
        })

}

const CreateListFoodOder = (nameRef, data, res) => {
    const ref = database.ref(nameRef)
    ref.child('dataOder').update(data, (err) => {
        if (err) throw err
        res.status(200).send({
            "message": "Add food complete",
        })
    })
}

//delete
const DeleteFood = (nameRef, productKey, res) => {
    const ref = database.ref(nameRef)
    ref.child('dataOder').child(productKey).remove((err) => {
        if (err) throw err
        res.status(200).send({
            "message": "Delete food complete",
        })
    })
}

const DeleteOder = (nameRef, res) => {
    console.log(nameRef)
    database.ref(nameRef).remove((err) => {
        if (err) throw err
        res.status(200).send({
            "message": "Delete table complete",
        })
    })
}


module.exports = {
    CreateNewOder, CreateListFoodOder,
    DeleteFood, DeleteOder
}