import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../context/UserContext';

const RequestQuote = () => {

  const [email, setEmail] = useState();
  const [description, setDescription] = useState();
  const { user } = useContext(UserContext);
  const navigation = useNavigation();

  function sendRequest() {
  }
  return (
    <View style={styles.container}>
      {!user?.currentProperties[0].verified ? (
        <View>
          <Text style={styles.noQuotes}>You must be verified at your address to request quotes. Don't worry, it's super easy to do!</Text>
          <Button
          title="Register Address"
          onPress={() => {
            navigation.navigate("Claim Property");
          }}
        />
        </View>
      ) : (
        <View>
          {console.log("user: ", user)}
          <Text>Find your provider</Text>
        </View>
      )}
      {/* <Text>Want a quote from your favorite provider? Enter their email address and a short description of the service you need below, and they'll receive a request to apply quotes to your property.</Text> */}

      {/* <View>
        <TextInput
          placeholder="Enter vendors email address"
          placeholderTextColor="#000"
          autoCapitalize='none'
          style={styles.verificationCode}
          onChangeText={(text) => setEmail(text)}
          clearButtonMode="while-editing"
        />
      </View>
      <View>
        <TextInput
          placeholder="Service description"
          placeholderTextColor="#000"
          autoCapitalize='none'
          style={styles.verificationCode}
          onChangeText={(text) => setDescription(text)}
          clearButtonMode="while-editing"
        />
      </View> */}


      {/* <View style={styles.buttonContainer}>
        <Button
          title="Request Quotes"
          onPress={sendRequest}
        />
      </View> */}
    </View>

  )
}

export default RequestQuote

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  buttonContainer: {
    marginTop: 25,
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
  noQuotes: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 18,
    textAlign: 'center'
  }

})