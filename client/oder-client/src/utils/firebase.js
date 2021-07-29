import firebase from 'firebase/app';
import 'firebase/storage'
import 'firebase/database'

var firebaseConfig = {
    apiKey: "AIzaSyDOVvt4pDHFUZ52fdyFvn38UWi3jU0-nTo",
    authDomain: "smart-menu-d89c1.firebaseapp.com",
    databaseURL: "https://smart-menu-d89c1-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "smart-menu-d89c1",
    storageBucket: "smart-menu-d89c1.appspot.com",
    messagingSenderId: "787219176254",
    appId: "1:787219176254:web:c38ebfe85207cd80c36a6f",
    measurementId: "G-5Y191LWY7G"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage()
const database = firebase.database();
// firebase.analytics();

const deleteImg = (link_img) => {
    var links = link_img.split('?')[0].split('/')
    links = links[links.length - 1].split('%2F')
    const nameRef = links[0], nameImg = links[1]
    return storage.ref(nameRef).child(nameImg).delete().catch(err => { console.log(err) });
}

export {
    deleteImg, storage, database, firebase as default
}