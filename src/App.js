import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import {Linking} from 'react-native'
import { AddressScreen } from './AddressScreen'
import { AsyncStorage } from 'react-native';
import CameraScreen from "./CameraScreen";
import AddUserScreen from "./AddUserScreen";
import styles from './Styles'
import { Household, Address } from './Household'

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

const setAddress = async (addressInfo) => {
  try {
    const address = new Address(
      addressInfo.street,
      addressInfo.city,
      addressCity.province,
      addressCity.postalCode
    );
    await AsyncStorage.setItem(
      'householdId',
      new Household(address, null).toString()
    )
  } catch (error) {
    console.log("Error saving householdId from PLS");
  }
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

const HomeScreen = ({navigation}) => {
  const [detectedUser, setDetectedUser] = useState("");

  const onSetDetectedUser = (usr) => {
    console.log(usr);
    setDetectedUser(usr);
  }

  const [householdId, setHouseholdId] = useState('');

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

        {
          householdId &&
          <TouchableOpacity
            style={styles.userButton}
          >
            <Text style={styles.btnText}>Select User</Text>
          </TouchableOpacity>
        }

        {
          householdId &&
          <TouchableOpacity
            style={styles.userButton}
            onPress={onAddUser}
          >
            <Text style={styles.btnText}>Add User</Text>
          </TouchableOpacity>
        }

      </View>
    </View>
  );
}
