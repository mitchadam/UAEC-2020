import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import {Linking} from 'react-native'
import { AddressScreen } from './AddressScreen'
import { SelectUserScreen } from './SelectUser'
import { AsyncStorage } from 'react-native';
import CameraScreen from "./CameraScreen";
import AddUserScreen from "./AddUserScreen";
import styles from './Styles'
import { FamilyMember, Household, Address } from './Household';
import { FirebaseProvider } from './Firebase';

const Stack = createStackNavigator();

const onEmergency = () => {
  Linking.openURL(`tel:${7806048907}`)
  let userId = 0;
  FirebaseProvider.getInstance().sendEmail(userId);

  console.log("Hello!");
}

const onAddUser = async (navigation) => {
  navigation.navigate('AddUserScreen', {onUserSave: saveUser});
  const address = new Address("123 Main St", "Edmonton", "Alberta", "TN73X5");
  const familyMembers = [
    new FamilyMember("Nayan", "Prakash", "123456789", "555555555", ["Influenza"], "dummyFaceId")
  ];
  const household = new Household(address, familyMembers);
  await FirebaseProvider.getInstance().storeHousehold(household);
  console.log(
    await FirebaseProvider.getInstance().retrieveHousehold(household.address.toString())
  );
}

const saveUser = async (userData) => {
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

  const onSetDetectedUser = (usr) => {
    console.log(usr);
    setDetectedUser(usr);
  }

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
      await AsyncStorage.setItem(
        'householdId',
        hhId
      )
      setHouseholdId(hhId);
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
        Detected User: {detectedUser}
      </Text>
      <TouchableOpacity
        style={styles.setAddressButton}
        onPress={() => handleAddressButton()}
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
