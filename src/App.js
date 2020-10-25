import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
 import {Linking} from 'react-native'


const onEmergency = () => {
Linking.openURL(`tel:${7809348188}`)
let userId = 0;
FirebaseProvider.sendEmail(userId);

console.log("Hello!");
}
export default function App() {
  return (
    <View style={styles.container}>

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
       >
        <Text style={styles.btnText}>Add User</Text>
       </TouchableOpacity>

       </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  emergencyButton: {
    backgroundColor: '#e04151',
    height: '50%',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  row: {
    flexDirection: "row",
    width: '100%',
    justifyContent: "space-evenly",
  },
  userButton: {
      backgroundColor: '#4183e0',
      width: '30%',
      alignItems: 'center',
      padding: 10,
      borderRadius: 15,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,

      elevation: 7,
  },
  btnText: {
    fontSize: 15,
    color: '#fff'
  },
btnTextLrg: {
  fontSize: 30,
  color: '#fff'
}
});
