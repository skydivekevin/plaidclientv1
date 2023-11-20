import React, { useContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import UserContext from '../../context/UserContext';
import { Auth } from '../../utils/httpUtils';
import PropertyContext from '../../context/PropertyContext';

export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorLoggingIn, setErrorLoggingIn] = useState(null)
  const { token, setToken, setUser } = useContext(UserContext)
  const { setPropertyIdContext } = useContext(PropertyContext)

  useEffect(() => {
    evaluateAndRedirect()
  }, [token])

  const evaluateAndRedirect = () => {
    if (token) {
      navigation.navigate("Dashboard")
    }
  }

  const handleLogin = () => {
    /////////////////////////////////////DELETE; FOR DEV ONLY/////////////////////////////////////
    const email = "Kevin.com";
    const password = "Password";
    /////////////////////////////////////DELETE; FOR DEV ONLY/////////////////////////////////////
    const data = {
      email,
      password
    }

    Auth.postJson('login', data)
      .then(response => {
        const token = response.data.token
        const user = response.data.user
        setUser(user)
        // if statement below is to enable removing the autocomplete component from the claim property screen; more hassle than it's worth.
        // The claim address component is hidden from view if they already have a property associated with their account
        // if (user.currentProperties.length === 0) {
        //   setPropertyIdContext(user.currentProperties[0]._id)
        // }

        setToken(token)
      })
      .catch(function (error) {
        if (error.response) {
          console.log("error: ", error.response)
          setErrorLoggingIn(true);
        }
      })
      .catch(function (error) {
        if (error.response) {
          console.log("error: ", error.response)
          setErrorLoggingIn(true);
        }
      })
  }

  const goToCreateAccount = () => {
    navigation.navigate("Create Account")
  }

  return (
    <View style={styles.appContainer}>
      <View>
        <Image source={require('../../assets/logo.jpeg')} style={styles.logo} />
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
          {errorLoggingIn ? <Text>There was an error logging in</Text> : null}
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
    paddingTop: 90,
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
