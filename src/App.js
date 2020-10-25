import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SelectUserScreen} from './SelectUser'
import React, {useEffect, useState} from 'react';
import {AsyncStorage, Linking, Text, TouchableOpacity, View} from 'react-native';
import {AddressScreen} from './AddressScreen';
import AddUserScreen from "./AddUserScreen";
import CameraScreen from "./CameraScreen";
import {FirebaseProvider} from './Firebase';
import {Address, FamilyMember, Household} from './Household';
import styles from './Styles';

const Stack = createStackNavigator();

const onEmergency = (userName) => {
  console.log(userName)
  console.log("Attempt to send");
  FirebaseProvider.getInstance().sendEmail(userName);
  console.log("After sending!");
  Linking.openURL(`tel:${7806048907}`)
}

const saveUser = async (userData) => {
  try {
    const addressJson = await AsyncStorage.getItem('address');
    const address = Address.fromJson(JSON.parse(addressJson));
    const familyMembers = [
      new FamilyMember(
        userData.firstName,
        userData.lastName,
        userData.phn,
        userData.hin,
        userData.healthConditions,
        userData.firstName + " " + userData.lastName
      )
    ];
    const newHousehold = new Household(address, familyMembers);
    FirebaseProvider.getInstance().storeHousehold(newHousehold);
  } catch (error) {
    console.log("Error getting address when saving user: " + error);
  }
}

const onAddUser = (navigation) => {
  testFirebase();
  navigation.navigate('AddUserScreen', {onSaveUser: saveUser});
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
          name="SelectUserScreen"
          component={SelectUserScreen}
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

const HomeScreen = ({navigation}) => {

  const [detectedUser, setDetectedUser] = useState("");
  const [householdId, setHouseholdId] = useState('');

  const handleSelectUserButton = () => {
    navigation.navigate('SelectUserScreen', {onUserSelect: setUser, householdId: householdId});
  }

  const setUser = async (uId) => {
    try {
      await AsyncStorage.setItem(
        'userId',
        uId
      );
      setDetectedUser(uId);
    } catch (error) {
      console.log("Error setting user from PLS");
    }
  }

  const handleAddressButton = () => {
    navigation.navigate('AddressScreen', {onAddressSave: setAddress});
  }

  const setAddress = async (addressInfo) => {
    try {
      const address = new Address(
        addressInfo.street,
        addressInfo.city,
        addressInfo.province,
        addressInfo.postalCode
      );
      const hhId = address.toString();
      await AsyncStorage.setItem('householdId', hhId);
      await AsyncStorage.setItem('address', JSON.stringify(address));
      setHouseholdId(hhId);
      setDetectedUser(null);
    } catch (error) {
      console.log("Error saving householdId from PLS");
    }
  }

  useEffect(() => {
    if (!householdId) {
      getHouseholdId();
    }
  });

  const getHouseholdId = async () => {
    let hhId = null;
    try {
      hhId = await AsyncStorage.getItem('householdId');
      setHouseholdId(hhId)
    } catch (error) {
      console.log("Error getting householdId from PLS");
    }
  }

  return (
    <View style={styles.container}>

      <Text style={styles.detectedUser}>
        Active Household: {householdId}
      </Text>
      <Text style={styles.detectedUser}>
        Active User: {detectedUser}
      </Text>
      <TouchableOpacity
        style={styles.setAddressButton}
        onPress={() => handleAddressButton()}
      >
        <Text style={styles.btnText}>Set Address</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.emergencyButton}
        onPress={() => onEmergency(detectedUser)}
      >
        <Text style={styles.btnTextLrg}>EMERGENCY</Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.userButton}
          onPress={() =>
            navigation.navigate('Camera', {
              onSetDetectedUser: setUser,
            })
          }
        >
          <Text style={styles.btnText}>Detect User</Text>
        </TouchableOpacity>

        {
          !!householdId &&
          <TouchableOpacity
            style={styles.userButton}
            onPress={() => handleSelectUserButton()}
          >
            <Text style={styles.btnText}>Select User</Text>
          </TouchableOpacity>
        }

        {
          !!householdId &&
          <TouchableOpacity
            style={styles.userButton}
            onPress={() => onAddUser(navigation)}
          >
            <Text style={styles.btnText}>Add User</Text>
          </TouchableOpacity>
        }

      </View>
    </View>
  );
}

const testFirebase = async () => {
  const address = new Address("123 Main St", "Edmonton", "Alberta", "TN73X5");
  const familyMembers = [
    new FamilyMember("Nayan", "Prakash", "123456789", "555555555", ["Influenza"], "dummyFaceId")
  ];
  const household = new Household(address, familyMembers);
  await FirebaseProvider.getInstance().storeHousehold(household);
  console.log(
    await FirebaseProvider.getInstance().retrieveHousehold(household.address.toString())
  );
  console.log(
    await FirebaseProvider.getInstance().retrieveHouseholdByFace("dummyFaceId")
  );
}
