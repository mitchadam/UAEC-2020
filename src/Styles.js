import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
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
    setAddressButton: {
      backgroundColor: '#4183e0',
      width: '80%',
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
  },
  regularText: {
      fontSize: 15,
      color: '#000'
  }
  });