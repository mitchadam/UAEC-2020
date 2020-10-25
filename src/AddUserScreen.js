import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import {FirebaseProvider} from './Firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

import styles from './Styles'

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
        <View style={styles.container}>
            <View style={addressStyles.row}>
                <Text style={styles.regularText}>First Name</Text>
                <TextInput
                    height='40%'
                    width='65%'
                    selectionColor='#4183e0'
                    underlineColorAndroid='#4183e0'
                    placholder="First Name"
                    onChangeText={text => setFirstNameText(text)}
                    defaultValue={firstNameText}
                />
            </View>
            <View style={addressStyles.row}>
                <Text style={styles.regularText}>Last Name</Text>
                <TextInput
                    height='40%'
                    width='65%'
                    selectionColor='#4183e0'
                    underlineColorAndroid='#4183e0'
                    placholder="Last Name"
                    onChangeText={text => setLastNameText(text)}
                    defaultValue={lastNameText}
                />
            </View>
            <View style={addressStyles.row}>
                <Text style={styles.regularText}>Health Number</Text>
                <TextInput
                    height='40%'
                    width='65%'
                    selectionColor='#4183e0'
                    underlineColorAndroid='#4183e0'
                    placholder="Personal Health Number"
                    onChangeText={text => setPhnText(text)}
                    defaultValue={phnText}
                />
            </View>
            <View style={addressStyles.row}>
                <Text style={styles.regularText}>Insurance Number</Text>
                <TextInput
                    height='40%'
                    width='65%'
                    selectionColor='#4183e0'
                    underlineColorAndroid='#4183e0'
                    placholder="Health Insurance Number"
                    onChangeText={text => setHinText(text)}
                    defaultValue={hinText}
                />
            </View>
            <TouchableOpacity
                style={styles.setAddressButton}
                onPress={() => handleSaveUser()}
            >
                <Text style={styles.btnText}>Save User</Text>
            </TouchableOpacity>
        </View>
    );
}


const addressStyles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});
