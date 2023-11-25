
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Animated, ScrollView } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../context/UserContext';
import { services } from '../../utils/enums';
import { mapEnumToSpecialist } from '../../utils/utils';
import DropDownPicker from 'react-native-dropdown-picker';
import { Vendor } from '../../utils/httpUtils';
import VendorTile from '../components/VendorTile';

const RequestQuote = () => {
  const [email, setEmail] = useState();
  const [description, setDescription] = useState();
  const { user } = useContext(UserContext);
  const navigation = useNavigation();
  const [selectedService, setSelectedService] = useState('');
  const [servicesList, setServicesList] = useState(services);
  const [open, setOpen] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (showMessage) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }
  }, [showMessage]);

  useEffect(() => {
    setShowMessage(false)
    getVendorsInRadius()
  }, [selectedService])

  const getVendorsInRadius = () => {
    const data = {
      service: selectedService
    }
    Vendor.postJson('findInRadiusVendors', data)
    .then(response => {
      setVendors(response.data)
    })
  };

  const requestServices = (vendor) => {
    console.log("request services", vendor)
    servicesRequested()
  }

  const servicesRequested = () => {
    setShowMessage(true);
    // setTimeout(() => {
    //   setShowMessage(false);
    // }, 5000);
  }

  const sendRequest = () => {
    console.log("send request")
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
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Find a </Text>
          <DropDownPicker
            open={open}
            items={servicesList.map(service => ({ label: mapEnumToSpecialist(service), value: service }))}
            setOpen={setOpen}
            value={selectedService}
            placeholder="Select a service"
            containerStyle={{ height: 40, width: 200 }}
            style={{ backgroundColor: '#fafafa' }}
            itemStyle={{ justifyContent: 'flex-start' }}
            dropDownStyle={{ backgroundColor: '#fafafa' }}
            setValue={setSelectedService}
            
          />
        </View>
      )}
      <View style={styles.button}>
        <Text style={styles.instructions}>Click on Vendor to request quotes</Text>
        {vendors.length > 0 ? (
          vendors.map(vendor => {
            return (
              <TouchableOpacity onPress={() => requestServices(vendor._id)} key={vendor._id}>
                <VendorTile vendor={vendor} />
              </TouchableOpacity>
            )
          })
        ) : null}
      </View>
      <Animated.View style={[styles.messageContainer, { opacity: fadeAnim }]}>
        <Text style={styles.messageText}>Quote Request Successful</Text>
      </Animated.View>
      <View>
      <View style={styles.emailRequest}>
      <Text style={styles.invite}>Want a quote from your favorite provider? Invite them to Plaid today!</Text>
        <TextInput
          placeholder="Enter vendors email address"
          placeholderTextColor="#000"
          autoCapitalize='none'
          style={styles.verificationCode}
          onChangeText={(text) => setEmail(text)}
          clearButtonMode="while-editing"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Send Invite"
          onPress={sendRequest}
        />
      </View>
      </View>
    </View>
  );
};

export default RequestQuote;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginRight: 10,
  },
  noQuotes: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    paddingTop: 20,
    zIndex: -1
  },
  messageContainer: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  messageText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1
  },
  label: {
    fontSize: 18,
    marginRight: 10,
  },
  noQuotes: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    paddingTop: 20,
    // zIndex: -1
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
  emailRequest: {
    marginTop: 100,
  },
  invite: {
    textAlign: 'center',
    fontSize: 18
  },
  instructions: {
    textAlign: 'center',
    margin: 15
  }
});