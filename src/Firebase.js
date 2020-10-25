import * as firebase from 'firebase';

// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

export class FirebaseProvider {
  static initialized = false;
  static instance;

  db = firebase.firestore();

  static getInstance() {
    if (FirebaseProvider.initialized) {
      return FirebaseProvider.instance;
    }
    // Initializes Firebase.
    const firebaseConfig = {
      apiKey: "AIzaSyCeqMAiVwiQOUIRiZ6ndBSKa7BLYrgUMsk",
      authDomain: "uaec-2020.firebaseapp.com",
      databaseURL: "https://uaec-2020.firebaseio.com",
      projectId: "uaec-2020",
      storageBucket: "uaec-2020.appspot.com",
      messagingSenderId: "584353556169",
      appId: "1:584353556169:web:541f41efb92c04a6b30f18",
      measurementId: "G-DG62LPQLZ1"
    };
    firebase.initializeApp(firebaseConfig);
    FirebaseProvider.instance = new FirebaseProvider();
    FirebaseProvider.initialized = true;
    return FirebaseProvider.instance;
  }


  async addTo(collection, data) {
    try {
      docRef = await this.db.collection(collection).add(data);
      console.log("Document written with ID: " + docRef.id);
    } catch (error) {
      console.log("Error adding document: " + error);
    }
  }


  async addTo(collection, doc, data) {
    try {
      docRef = await this.db.collection(collection).doc(doc).set(data);
      console.log("Created document: " + doc);
    } catch (error) {
      console.log(`Error adding document ${doc}: ${error}`);
    }
  }

  async getFrom(collection, doc) {
    try {
      const docRef = await this.db.collection(collection).doc(doc).get();
      const data = docRef.data();
      console.log(data);
      return data;
    } catch (error) {
      console.log("Error getting document: " + error);
    }
  }

  async sendEmail(userId) {
    // will automatically create id for the new document
    await this.addTo("mail", {
      to: ["rpshukla@ualberta.ca"],
      message: {
        subject: "EMERGENCY",
        text: "There has been an emergency.",
      }
    });
  }

  async storeHousehold(household) {
    await this.addTo("households", household.address.toString(), JSON.parse(JSON.stringify(household)));
  }

  async retrieveHousehold(address) {
    const household = await this.getFrom("households", address);
    const addressData = household.address;
    const street = addressData.street;
    const city = addressData.city;
    const province = addressData.province;
    const postalCode = addressData.postalCode
    const familyMembers = household.familyMembers;
    // iterates through each family member in a household
    for (const familyMember of familyMembers) {
      const firstName = familyMember.firstName;
      const lastName = familyMember.lastName;
      const phn = familyMember.phn;
      const hin = familyMember.hin;
      const medicalConditions = familyMember.medicalConditions;
      console.log(`${firstName} ${lastName} is living at: ${street} ${city} ${province} ${postalCode}`);
    }
    return household;
  }
}
