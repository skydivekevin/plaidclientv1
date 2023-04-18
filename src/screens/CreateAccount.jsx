import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import UserContext from '../../context/UserContext'

const url = 'http://localhost:8080/api/auth/register'

const CreateAccount = () => {

  const { setToken, setUser } = useContext(UserContext)
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const register = async () => {

    // validateInputs(data)

    const role = 'homeowner'

    axios({
      method: 'POST',
      url: url,
      data: {
        firstName,
        lastName,
        password,
        email,
        phoneNumber,
        role
      }
    })
    .then(response => {
      const token = response.data.token
      const user = response.data.user

      setToken(token)
      setUser(user)
      navigation.navigate('Dashboard')
    })
    .catch(function(error) {
      if (error) {
        console.log("error: ", error)
      }
    })
  }
  return (
    <View style={styles.appContainer}>
      <Text style={styles.screenTitle}>Create Account</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} placeholder="First Name" onChangeText={setFirstName}/>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} placeholder="Last Name" onChangeText={setLastName}/>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} placeholder="Phone Number" onChangeText={setPhoneNumber}/>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} placeholder="Email" onChangeText={setEmail}/>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} placeholder="Password" onChangeText={setPassword}/>
      </View>
      <View>
      <Button 
        title="Create Account"
        onPress={() => register()}
      />
      </View>
    </View>
  )
}

export default CreateAccount

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 30,
    paddingHorizontal: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
    width: '100%',
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: '80%',
    marginRight: 8,
    padding: 8,
    borderRadius: 10
  },
  screenTitle: {
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 50
  }
})