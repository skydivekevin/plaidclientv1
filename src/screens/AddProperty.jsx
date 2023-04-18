import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import QuotesContext from '../../context/QuotesContext';
import UserContext from '../../context/UserContext';
import Autocomplete from '../components/Autocomplete';

const baseUrl = 'http://localhost:8080/api';

const AddProperty = () => {

  const navigation = useNavigation();

  const { user } = useContext(UserContext)

  return (
    <View>
      <Autocomplete />
    </View>
  )
}

export default AddProperty

const styles = StyleSheet.create({})