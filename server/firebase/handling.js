const firebase = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyDOVvt4pDHFUZ52fdyFvn38UWi3jU0-nTo",
  authDomain: "smart-menu-d89c1.firebaseapp.com",
  databaseURL: "https://smart-menu-d89c1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smart-menu-d89c1",
  storageBucket: "smart-menu-d89c1.appspot.com",
  messagingSenderId: "787219176254",
  appId: "1:787219176254:web:c38ebfe85207cd80c36a6f",
  measurementId: "G-5Y191LWY7G"
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
    console.log(typeof(data))
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