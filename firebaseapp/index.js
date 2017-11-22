import firebase from 'firebase';

let config = {
    apiKey: "AIzaSyC4Ek193ETBAiL7egFhCalJg4wiO8pcXCg",
    authDomain: "headbangers-zayas.firebaseapp.com",
    databaseURL: "https://headbangers-zayas.firebaseio.com",
    projectId: "headbangers-zayas",
    storageBucket: "headbangers-zayas.appspot.com",
    messagingSenderId: "928555979419"
};

let firebaseApp;

if(firebase.apps.length === 0){
    firebaseApp = firebase.initializeApp(config);
}else{
    firebaseApp = firebase.apps[0];
}

export default firebaseApp;

