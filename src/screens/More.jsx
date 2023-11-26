import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Auth } from '../../utils/httpUtils';
import UserContext from '../../context/UserContext';

const More = () => {
  const { user, token } = useContext(UserContext);
  const navigation = useNavigation();

  function handleLogout() {
    Auth(token).getJson('logout')
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
      {user?.currentProperties?.length === 0 &&
        <Button
          title="Add property"
          onPress={() => {
            navigation.navigate("Claim Property")
          }}
        />
      }
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