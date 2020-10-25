import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import {FirebaseProvider} from './Firebase';
import { styles } from './App'

export default function AddUserScreen({route, navigation}) {
    const [firstNameText, setFirstNameText] = useState();
    const [lastNameText, setLastNameText] = useState();
    const [phnText, setPhnText] = useState();
    const [hinText, setHinText] = useState();

    const handleSaveUser = () => {
        const {onSaveUser} = route.params;
        if (
            firstNameText !== undefined &&
            lastNameText !== undefined &&
            phnText !== undefined &&
            hinText !== undefined
        ) {
            const addressInfo = {
                street: streetText,
                city: cityText,
                province: provText,
                postalCode: postalText
            }
            onSaveUser(addressInfo);
            const popAction = StackActions.pop(1);
            navigation.dispatch(popAction);
        }
    }

    return (
        <View>
            <TextInput
                placholder="First Name"
                onChangeText={text => setFirstNameText(text)}
                defaultValue={firstNameText}
            />
            <TextInput
                placholder="Last Name"
                onChangeText={text => setLastNameText(text)}
                defaultValue={lastNameText}
            />
            <TextInput
                placholder="Personal Health Number"
                onChangeText={text => setPhnText(text)}
                defaultValue={phnText}
            />
            <TextInput
                placholder="Health Insurance Number"
                onChangeText={text => setHinText(text)}
                defaultValue={hinText}
            />
        </View>
    );
}
