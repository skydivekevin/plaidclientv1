import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import UserContext from '../../context/UserContext';

const baseUrl = 'http://localhost:8080/api'

export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorLoggingIn, setErrorLoggingIn] = useState(null)

  const { token, setToken, setUser } = useContext(UserContext)

  useEffect(() => {
    evaluateAndRedirect()
  },[token])

  const evaluateAndRedirect = () => {
    if (token) {
      navigation.navigate("Dashboard")
    }
  }

  // const evaluateAndRedirect = () => {
  //   if (token) {
  //     navigation.navigate("MainApp")
  //   }
  // }

  const handleLogin = () => {




    

    /////////////////////////////////////DELETE; FOR DEV ONLY/////////////////////////////////////
    const email = "Plaid.com";
    const password = "Password";
    /////////////////////////////////////DELETE; FOR DEV ONLY/////////////////////////////////////





      axios({
      method: 'POST',
      url: `${baseUrl}/auth/login`,
      data: { email, password }
    })
    .then(res => {
      const token = res.data.token
      const user = res.data.user
      setUser(user)
      setToken(token)
    })
    .catch(setErrorLoggingIn(true))
  }

  const goToCreateAccount = () => {
    navigation.navigate("Create Account")
  }

  return (
    <View style={styles.appContainer}>
      <View>
        <Image source={require('../../assets/logo.jpeg')} style={styles.logo}/>
      </View>
      <View style={styles.nameAndPhrase}>
        <Text style={styles.name}>Plaid</Text>
        <Text style={styles.phrase}>Welcome to Plaid!</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.textInput} 
          placeholder="Email"
          onChangeText={setEmail}
          />
      </View>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.textInput} 
          placeholder="Password"
          onChangeText={setPassword}
          /> 
      </View>
      <View>
        <Text>
        {errorLoggingIn ? <Text>There was an error logging in</Text> : null } 
        </Text>
      </View>
      <View>
      <Button 
        title="Login"
        onPress={() => {
          handleLogin()
        }}
      />
      <Button 
      title="Create Account"
      onPress={() => {
        goToCreateAccount()
      }}
      />
      </View>
    </View>
  );
}

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
    padding: 24,
    width: '100%'
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: '80%',
    marginRight: 8,
    padding: 8,
    borderRadius: 10
  },
  nameAndPhrase: {
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 50
  },
  name: {
    fontSize: 70
  },
  phrase: {
    fontSize: 20
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 30
  }
});
