import firebase from 'firebase';
import "firebase/firestore";
import {Household} from './Household';

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
      to: ["mli@ualberta.ca"],
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
    const householdData = await this.getFrom("households", address);
    const household = Household.fromJson(householdData);
    for (const familyMember of household.familyMembers) {
      const firstName = familyMember.firstName;
      const lastName = familyMember.lastName;
      console.log(`${firstName} ${lastName} is living at: ${household.address.toString()}`);
    }
    return household;
  }

  async retrieveHouseholdByFace(faceId) {
    const querySnapshot = await this.db.collection("households").get();
    const households = [];
    querySnapshot.forEach(doc => {
      const household = Household.fromJson(doc.data());
      for (const familyMember of household.familyMembers) {
        if (familyMember.faceId === faceId) {
          households.push(household);
        }
      }
    });
    if (households.length === 0) {
      throw new Error(`No household with faceId ${faceId} found.`);
    } else {
      return households[0];
    }
  }
}
