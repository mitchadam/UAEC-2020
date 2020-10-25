import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';
import {Linking} from 'react-native'
import { AddressScreen } from './AddressScreen'
import styles from './Styles'

const Stack = createStackNavigator();

const onEmergency = () => {
  Linking.openURL(`tel:${7809348188}`)
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

const onAddUser = async () => {
  FirebaseProvider.getInstance().storeHouseholdInfo({
    address: {
      street: "123 Main St",
      city: "Edmonton",
      province: "Alberta",
      postalCode: "TN73X5"
    },
    familyMembers: [
      {
        firstName: "Nayan",
        lastName: "Prakash",
        phn: "123456789",
        hin: "555555555",
        medicalConditions: ["Depression"]
      }
    ]
  });
  const address = `${householdInfo.street} ${householdInfo.city} ${householdInfo.province} ${householdInfo.postalCode}`;
  householdInfo = await FirebaseProvider.getInstance().retrieveHouseholdInfo(address);
  console.log(householdInfo);
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>

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
        >
          <Text style={styles.btnText}>Select User</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.userButton}
          onPress={onAddUser}
        >
          <Text style={styles.btnText}>Add User</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}
