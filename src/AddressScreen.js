import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackActions } from '@react-navigation/native';
import styles from './Styles'

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
            <View style={addressStyles.row}>
                <Text style={styles.regularText}>Street Number</Text>
                <TextInput
                    height='40%'
                    width='65%'
                    selectionColor='#4183e0'
                    underlineColorAndroid='#4183e0'
                    placeholder="Street"
                    onChangeText={streetText => setStreetText(streetText)}
                    defaultValue={streetText}
                />
            </View>
            <View style={addressStyles.row}>
                <Text style={styles.regularText}>City Name</Text>
                <TextInput
                    height='40%'
                    width='65%'
                    selectionColor='#4183e0'
                    underlineColorAndroid='#4183e0'
                    placeholder="City"
                    onChangeText={cityText => setCityText(cityText)}
                    defaultValue={cityText}
                />
            </View>
            <View style={addressStyles.row}>
                <Text style={styles.regularText}>Province</Text>
                <TextInput
                    height='40%'
                    width='65%'
                    selectionColor='#4183e0'
                    underlineColorAndroid='#4183e0'
                    placeholder="Province"
                    onChangeText={provText => setProvText(provText)}
                    defaultValue={provText}
                />
            </View>
            <View style={addressStyles.row}>
                <Text style={styles.regularText}>Postal Code</Text>
                <TextInput
                    height='40%'
                    width='65%'
                    selectionColor='#4183e0'
                    underlineColorAndroid='#4183e0'
                    placeholder="Postal Code"
                    onChangeText={postalText => setPostalText(postalText)}
                    defaultValue={postalText}
                />
            </View>
            <TouchableOpacity
                style={styles.setAddressButton}
                onPress={() => handleSaveAddress(navigation)}
            >
                <Text style={styles.btnText}>Save Address</Text>
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
