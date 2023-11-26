import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Auth } from '../../utils/httpUtils';
import UserContext from '../../context/UserContext'

const CreateAccount = () => {

  const { setToken, setUser } = useContext(UserContext)
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const register = async () => {
    const data = {
      firstName,
      lastName,
      password,
      email,
      phone,
    }

    Auth().postJson('register', data)
      .then(response => {
        const token = response.data.token
        const user = response.data.user

        setToken(token)
        setUser(user)
        navigation.navigate('Dashboard')
      })
      .catch(function (error) {
        if (error) {
          console.log("error: ", error)
        }
      })
  }

  return (
    <View style={styles.appContainer}>
      <Text style={styles.screenTitle}>Create Account</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} placeholder="First Name" onChangeText={setFirstName} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} placeholder="Last Name" onChangeText={setLastName} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} placeholder="Phone Number" onChangeText={setPhone} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} placeholder="Email" onChangeText={setEmail} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} placeholder="Password" onChangeText={setPassword} />
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