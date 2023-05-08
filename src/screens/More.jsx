import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const baseUrl = 'http://localhost:8080/api';

const More = () => {
  const navigation = useNavigation();

  function handleLogout() {
    axios({
      method: 'GET',
      url: `${baseUrl}/auth/logout`
    })
      .then(res => {
        navigation.navigate("Plaid")
      })
      .catch(function (error) {
        if (error.response) {
          console.log("error: ", error.response)
        }
      })
  }
  return (
    <View>
      <Text>More</Text>
      <Button
        title="Add property"
        onPress={() => {
          navigation.navigate("Claim Property")
        }}
      />
      <Button
        title="Logout"
        onPress={() => {
          handleLogout()
        }}
      />

    </View>
  )
}

export default More

const styles = StyleSheet.create({})