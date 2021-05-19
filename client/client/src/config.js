import firebase from "firebase";
const config = {
    apiKey: "AIzaSyCylXcB_gWmWG7segUUasaqNu4pYRbpZw8",
    authDomain: "test-fa7d0.firebaseapp.com",
    databaseURL: "https://test-fa7d0-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "test-fa7d0",
    storageBucket: "test-fa7d0.appspot.com",
    messagingSenderId: "351398061682",
    appId: "1:351398061682:web:53c8414d93d6631d4404eb",
    measurementId: "G-7LPHEVZKSR"
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
// Tham chiếu tới cơ sở dữ liệu
export const realtimeDB = firebase.database();

export default firebase;