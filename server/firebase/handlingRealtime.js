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



// deleteData("product", "Ma2DsLKQdoGGeLh3rUE", "asdsa");
module.exports = {
    database
}