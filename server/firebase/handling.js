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

function addData(nameRef, data) {
    const ref = database.ref(nameRef)
    const key = ref.child('posts').push().key;
    ref.child(key).set(
        data, function (error) {
            if (error) {
                // The write failed...
                console.log("Failed with error: " + error)
            } else {
                // The write was successful...
                console.log("success")
            }
        })
}

function repairData(nameRef, newData, key) {
    var productRef = database.ref(nameRef);
    productRef.child(key).set(newData, (error)=>{
        if (error) {
            // The write failed...
            console.log("Failed with error: " + error)
        } else {
            // The write was successful...
            console.log("success")
        }
    })
}

function deleteData(nameRef, key) {
    var productRef = database.ref(nameRef);
    productRef.child(key).remove((error)=>{
        if (error) {
            // The write failed...
            console.log("Failed with error: " + error)
        } else {
            // The write was successful...
            console.log("success")
        }
    })
}

module.exports = {
    getData,
    addData,
    repairData
}