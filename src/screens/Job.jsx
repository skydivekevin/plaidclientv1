import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Job as JobRoute } from '../../utils/httpUtils';

const Job = ({ route, navigation }) => {
  const jobId = route.params.jobId
  const [data, setData] = useState()

  useEffect(() => {
    getJob()
  }, [])

  async function getJob() {
    const data = {
      jobId
    }

    JobRoute.getJson('getJob', data)
      .then(res => {
        setData(res.data)
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
          <Text>Provider: {data.job.vendorName}</Text>
          <Text>Total price for job: ${data.job.totalPrice}</Text>
          <Text style={styles.includedServicesTitle}>Included services: </Text>
          {data.quotes.map(quote => {
            return (
              <View style={styles.includedServices} key={quote._id}>
                <Text>{quote.description} for ${quote.price}</Text>
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
    // margin: 10,
    borderTop: 1,
    borderTopWidth: 1,
    padding: 10
  },
  includedServicesTitle: {
    marginBottom: 10
  }
})