import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import React, { useState } from 'react'

const RequestQuote = () => {

  const [email, setEmail] = useState();
  const [description, setDescription] = useState();

  function sendRequest() {
  }
  return (
    <View style={styles.container}>
      <Text>Want a quote from your favorite provider? Enter their email address and a short description of the service you need below, and they'll receive a request to apply quotes to your property.</Text>

      <View>
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
      </View>


      <View style={styles.buttonContainer}>
        <Button
          title="Request Quotes"
          onPress={sendRequest}
        />
      </View>
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
    zIndex: 1
  },
  buttonContainer: {
    marginTop: 25,
    zIndex: -1
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

})