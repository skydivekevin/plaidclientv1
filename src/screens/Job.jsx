import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Job as JobRoute, Vendor } from '../../utils/httpUtils';
import { useFocusEffect } from '@react-navigation/native';
import { mapJobStatus } from '../../utils/utils';
import UserContext from '../../context/UserContext';
import { useContext } from 'react';

const Job = ({ route, navigation }) => {
  const jobId = route.params.jobId;
  const [data, setData] = useState();
  const { token } = useContext(UserContext);

  useFocusEffect(
    React.useCallback(() => {
      getJob()
    }, [])
  );

  async function getJob() {
    const data = {
      jobId
    }
    JobRoute(token).getJson('getJob', data)
      .then(response => {
        setData(response.data)
        // setLogo(response.data.vendor.logo)
      })
      .catch(error => {
        if (error.message) {
          console.log(error.message)
        }
      })
  }

  return (
    <View>
      {data && (
        <>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              {data.vendor.logo ? <Image source={{ uri: `${data.vendor.logo}`, }} style={styles.image} /> : <Text>No Logo Available</Text>}
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.providerInfo}>Provider: {data.vendor.companyName}</Text>
              <Text style={styles.providerInfo}>Provider Phone: {data.vendor.phoneNumber}</Text>
              <Text style={styles.providerInfo}>Provider Email: {data.vendor.email}</Text>
              <Text style={styles.providerInfo}>Total Price: ${data.job.totalPrice}</Text>
              <Text style={styles.providerInfo}>Job Status: {mapJobStatus(data.job.jobStatus)}</Text>
              {data.job.jobStatus === "COMPLETED" && <Text style={styles.providerInfo}>Job Completed On: {data.job.dateCompleted}</Text>}
              {data.job.jobStatus === "ACCEPTED" && <Text style={styles.providerInfo}>Job accepted, schedule now</Text>}
              {data.job.jobStatus === "SCHEDULED" && <Text style={styles.providerInfo}>Job scheduled for: {data.job.scheduledDate}</Text>}
              {data.job.jobStatus === "COMPLETED" && data.job.paymentStatus === "DUE" && <Text style={styles.providerInfo}>Payment due, Click here to pay</Text>}
            </View>
          </View>
          <View style={styles.includedServicesContainer}>
            <Text style={styles.includedServicesTitle}>Included services</Text>
          </View>
          {data.services.map(service => {
            return (
              <View style={styles.includedServices} key={service._id}>
                <Text style={styles.serviceTitle}>{service.serviceTitle} for ${service.servicePrice}</Text>
                <Text>{service.serviceDescription}</Text>
              </View>
            )
          })}
        </>
      )}
    </View>
  )
}

export default Job

const styles = StyleSheet.create({
  includedServices: {
    margin: 10,
    paddingTop: 20,
    borderTop: 1,
    borderTopWidth: 1,
    paddingLeft: 10,
    paddingRight: 10
  },
  includedServicesContainer: {
    alignItems: 'center',
  },
  includedServicesTitle: {
    marginBottom: 10,
    fontSize: 30
  },
  container: {
    // marginLeft: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  providerInfo: {
    fontSize: 20,
    marginBottom: 5
  },
  imageContainer: {
    alignItems: 'center',
    maxWidth: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 100,
  },
  infoContainer: {
    marginLeft: 20,
    marginTop: 20
  },
  serviceTitle: {
    fontSize: 20,
    marginBottom: 10
  }
})