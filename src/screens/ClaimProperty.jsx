import { StyleSheet, View, Button, TextInput } from 'react-native';
import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../context/UserContext';
import Autocomplete from '../components/Autocomplete';
import PropertyContext from '../../context/PropertyContext';
import { Property } from '../../utils/httpUtils';

const ClaimProperty = () => {
  const navigation = useNavigation();
  const { user, setUser, token } = useContext(UserContext)
  const { propertyIdContext, propertyContext } = useContext(PropertyContext)
  const [verificationCode, setVerificationCode] = useState();

  function claimProperty() {
    let data;
    if (verificationCode) {
      data = {
        propertyId: propertyIdContext,
        verificationCode: verificationCode
      };
    }

    if (!verificationCode) {
      data = {
        propertyId: propertyIdContext,
      }
    }

    Property(token).postJson('claimProperty', data)
      .then(response => {
        setUser(response.data)
        navigation.navigate("Dashboard")
      })
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.autocomplete}>
        <Autocomplete />

      </View>
      <View style={styles.verificationTextBox}>
        <TextInput
          placeholder="Enter verification code"
          placeholderTextColor="#000"
          autoCapitalize='none'
          style={styles.verificationCode}
          onChangeText={(text) => setVerificationCode(text)}
          clearButtonMode="while-editing"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Claim Property"
          onPress={claimProperty}
          style={styles.button}
        />
        <Button
          title="Request Verification Code"
          onPress={claimProperty}
          style={styles.button}
        />
      </View>
    </View>
  )
}

export default ClaimProperty;

const styles = StyleSheet.create({
  appContainer: {
    paddingHorizontal: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
  },
  inputContainer: {
    marginTop: 25,

  },
  autocomplete: {
    marginTop: 25
  },
  verificationCode: {
    marginTop: 25,
    width: 340,
    height: 50,
    fontSize: 18,
    borderRadius: 8,
    borderColor: '#aaa',
    color: '#000',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    paddingLeft: 15,
  },
  verificationTextBox: {
    zIndex: -1
  },
  buttonContainer: {
    marginTop: 25,
    zIndex: -1
  }
})