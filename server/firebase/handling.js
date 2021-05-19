const firebase = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyCylXcB_gWmWG7segUUasaqNu4pYRbpZw8",
    authDomain: "test-fa7d0.firebaseapp.com",
    databaseURL: "https://test-fa7d0-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "test-fa7d0",
    storageBucket: "test-fa7d0.appspot.com",
    messagingSenderId: "351398061682",
    appId: "1:351398061682:web:53c8414d93d6631d4404eb",
    measurementId: "G-7LPHEVZKSR"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

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
                "message": "repair product successful ",
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
// deleteData("product", "Ma2DsLKQdoGGeLh3rUE", "asdsa");
module.exports = {
    getData,
    addData,
    repairData,
    deleteData
}