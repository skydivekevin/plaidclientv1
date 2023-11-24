import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import React, { useState, useContext } from 'react';
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

  const getVendorsInRadius = () => {
    // Your logic here
    const data = {
      service: selectedService
    }
    Vendor.postJson('findInRadiusVendors', data)
    .then(response => {
      setVendors(response.data)
    })
  };

  const getList = () => {
    console.log("something: ", selectedService);
  };

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
      <Button
            title="Find 'em"
            onPress={() => {
              getVendorsInRadius();
            }}
          />
          {vendors.length > 0 ? (
            vendors.map(vendor => {
              return (
                <VendorTile vendor={vendor} key={vendor._id} />
              )
            })
          ) : null}
      </View>
    </View>
  );
};

const styles = {
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
  }
};

export default RequestQuote;