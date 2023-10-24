import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Auth } from '../../utils/httpUtils';

const More = () => {
  const navigation = useNavigation();

  function handleLogout() {
    Auth.getJson('logout')
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