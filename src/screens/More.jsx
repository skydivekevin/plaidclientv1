import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const More = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>More</Text>
      <Button 
          title="Add property"
          onPress={() => {
            navigation.navigate("Claim Property")
          }}
        />

    </View>
  )
}

export default More

const styles = StyleSheet.create({})