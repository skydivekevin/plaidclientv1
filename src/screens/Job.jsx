import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import axios from 'axios';

const baseUrl = 'http://localhost:8080/api';
const Job = ({ route, navigation }) => {
  const jobId = route.params.jobId

  const [data, setData] = useState()

  useEffect(() => {
    getJob()
  }, [])

  async function getJob() {
    axios({
      method: 'GET',
      url: `${baseUrl}/jobs/getJob/${jobId}`,
    })
      .then(res => {
        console.log("res: ", res.data)
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
      {/* {console.log("job: ", data)} */}
      {data && (
        <>
          {console.log("data: ", data.quotes)}
          <Text>{data.job.vendorName}</Text>
          <Text>Total price for job: {data.job.totalPrice}</Text>
          <Text>Included services: </Text>
          {data.quotes.map(quote => {
            return (
              <View key={quote._id}>
                <Text>{quote.description} for {quote.price}</Text>
              </View>
            )
          })}
        </>
      )}
    </View>
  )
}

export default Job

const styles = StyleSheet.create({})

// const CompanyQuotes = ({ route, navigation }) => {
//   const vendorId = route.params.vendorId