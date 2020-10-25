import * as firebase from 'firebase';

// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

export class FirebaseProvider {
    // Initializes Firebase.
    firebaseConfig = {
        apiKey: "AIzaSyCeqMAiVwiQOUIRiZ6ndBSKa7BLYrgUMsk",
        authDomain: "uaec-2020.firebaseapp.com",
        databaseURL: "https://uaec-2020.firebaseio.com",
        projectId: "uaec-2020",
        storageBucket: "uaec-2020.appspot.com",
        messagingSenderId: "584353556169",
        appId: "1:584353556169:web:541f41efb92c04a6b30f18",
        measurementId: "G-DG62LPQLZ1"
    };
    initialized = false;
    instance;

    static getInstance() {
        if (initialized) {
            return instance;
        }
        firebase.initializeApp(firebaseConfig);
        instance = FirebaseProvider();
        return instance;
    }

    storeHighScore(userId) {
        firebase.database().ref(`users/${userId}`).set({
            highscore: 9000
        });
    }

    setupHighscoreListener(userId) {
        firebase.database().ref(`users/${userId}`).on("value", (snapshot) => {
            const highscore = snapshot.val().highscore;
            console.log("New high score: " + highscore);
        });
    }
}
