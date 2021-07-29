const database = require('../firebase/handlingRealtime').database;

function getaData(nameRef, res) {
    var data = database.ref(nameRef).get()
    data.then(snapshot => {
        if (snapshot.exists()) {
            res.status(200).send(snapshot.val())
        } else {
            res.status(200).json({
                message: "No data available"
            })
        }

    }).catch((error) => {
        console.error(error);
    });
}

function getData(nameRef) {
    var data;
    data = database.ref(nameRef).once('value')
        .then(function (snapshot) {
            return snapshot.val();
        })
    return data;
}

function addData(nameRef, data, res) {
    const ref = database.ref(nameRef)
    const key = ref.child('posts').push().key;
    data.key = key
    ref.child(key).set(data, function (error) {
        if (error) {
            res.status(200).send({
                "message": "more failed product"
            })
        } else {
            res.status(200).send({
                "message": "add product successful ",
                "key": key
            })
        }
    })
}

function repairData(nameRef, newData, key, res) {
    var productRef = database.ref(nameRef);
    productRef.child(key).set(newData, (error) => {
        if (error) {
            res.status(202).send(error)
        } else {
            res.status(200).send({
                "message": "repair product successful",
                "key": key
            })
        }
    })
}

function deleteData(nameRef, key, res) {
    var productRef = database.ref(nameRef);
    productRef.child(key).remove((error) => {
        if (error) {
            res.status(202).send(error)
        } else {
            res.status(200).send({
                "message": "delete product successful ",
                "key": key
            })
        }
    })
}

function getKeyOfParent(nameRef, res) {
    var ref = database.ref(nameRef);
    ref.orderByKey().on("child_added", function (snapshot) {
        console.log(snapshot.key);
    });
    
}

module.exports = {
    getaData,
    getData,
    addData,
    repairData,
    deleteData,
    getKeyOfParent
}