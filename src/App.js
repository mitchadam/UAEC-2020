import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Linking, Text, TouchableOpacity, View} from 'react-native';
import {AddressScreen} from './AddressScreen';
import CameraScreen from "./CameraScreen";
import {FirebaseProvider} from './Firebase';
import {Address, FamilyMember, Household} from './Household';
import styles from './Styles';

const Stack = createStackNavigator();

const onEmergency = () => {
  Linking.openURL(`tel:${7806048907}`)
  let userId = 0;
  FirebaseProvider.getInstance().sendEmail(userId);

  console.log("Hello!");
}

const handleAddressButton = (navigation) => {
  navigation.navigate('AddressScreen', {onAddressSave: setAddress});
}

const setAddress = (addressInfo) => {
  console.log(addressInfo);
}

const onAddUser = async (navigation) => {
  navigation.navigate('AddUserScreen', {onUserSave: saveUser});
  /*
  const address = new Address("123 Main St", "Edmonton", "Alberta", "TN73X5");
  const familyMembers = [
    new FamilyMember("Nayan", "Prakash", "123456789", "555555555", ["Influenza"])
  ];
  const household = new Household(address, familyMembers);
  await FirebaseProvider.getInstance().storeHousehold(household);
  console.log(
    await FirebaseProvider.getInstance().retrieveHousehold(household.address.toString())
  );
  */
}


export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="AddressScreen"
          component={AddressScreen}
        />
        <Stack.Screen
          name="AddUserScreen"
          component={AddUserScreen}
        />
         <Stack.Screen
          name="Camera"
          component={CameraScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = ({ navigation }) => {
  const [detectedUser, setDetectedUser] = useState("");

  const onSetDetectedUser = (usr) => {
    console.log(usr);
    setDetectedUser(usr);
  }


  return (
    <View style={styles.container}>

        <Text style={styles.detectedUser}>
          Detected User: {detectedUser}
        </Text>
      <TouchableOpacity
        style={styles.setAddressButton}
        onPress={() => handleAddressButton(navigation)}
      >
        <Text style={styles.btnText}>Set Address</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.emergencyButton}
        onPress={onEmergency}
      >
        <Text style={styles.btnTextLrg}>EMERGENCY</Text>
      </TouchableOpacity>

       <View style={styles.row}>
       <TouchableOpacity
        style={styles.userButton}
        onPress={() =>
          navigation.navigate('Camera', {
            onSetDetectedUser: onSetDetectedUser,
            subjectId: "TESTUSR!"
          })
        }
       >
        <Text style={styles.btnText}>Detect User</Text>
       </TouchableOpacity>

        <TouchableOpacity
          style={styles.userButton}
        >
          <Text style={styles.btnText}>Select User</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.userButton}
          onPress={() => onAddUser(navigation)}
        >
          <Text style={styles.btnText}>Add User</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
