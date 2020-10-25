import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackActions } from '@react-navigation/native';
import { styles } from './App'

export const AddressScreen = ({route, navigation}) => {

    const [streetText, setStreetText] = useState();
    const [cityText, setCityText] = useState();
    const [provText, setProvText] = useState();
    const [postalText, setPostalText] = useState();

    const handleSaveAddress = () => {
        const {onAddressSave} = route.params;
        if (
            streetText !== undefined &&
            cityText !== undefined &&
            provText !== undefined &&
            postalText !== undefined
        ) {
            const addressInfo = {
                street: streetText,
                city: cityText,
                province: provText,
                postalCode: postalText
            }
            onAddressSave(addressInfo);
            const popAction = StackActions.pop(1);
            navigation.dispatch(popAction);
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Street"
                onChangeText={streetText => setStreetText(streetText)}
                defaultValue={streetText}
            />
            <TextInput
                placeholder="City"
                onChangeText={cityText => setCityText(cityText)}
                defaultValue={cityText}
            />
            <TextInput
                placeholder="Prov"
                onChangeText={provText => setProvText(provText)}
                defaultValue={provText}
            />
            <TextInput
                placeholder="Postal Code"
                onChangeText={postalText => setPostalText(postalText)}
                defaultValue={postalText}
            />
            <TouchableOpacity
                style={styles.setAddressButton}
                onPress={() => handleSaveAddress(navigation)}
            >
                <Text style={styles.btnText}>Save Address</Text>
            </TouchableOpacity>
        </View>
    );
}