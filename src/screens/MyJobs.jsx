import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useContext, useState } from 'react';
import JobsContext from '../../context/JobsContext';
import Job from "../components/Job";



import axios from 'axios';

const baseUrl = 'http://localhost:8080/api';

export default function MyJobs() {

  const { jobs, setJobs } = useContext(JobsContext)

  const [jobsState, setJobsState] = useState([])

  useEffect(() => {
    getJobs()
  }, [])

  function getJobs() {
    console.log("getJobs")
    axios({
      method: 'GET',
      url: `${baseUrl}/jobs/homeownerJobs`,
    })
      .then((res) => {
        console.log("res: ", res.data)
        setJobs(res.data)
        setJobsState(res.data)
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data)
        }
      })
  }

  function noJobs() {
    console.log("noJobs")
    return (<Text>No jobs loser</Text>)
  }

  function renderJobs() {
    console.log("renderJobs")
    jobs.map(job => {
      <Job job={job} key={job._id} />
    })

  }

  return (
    <View style={styles.container}>
      {jobsState && (
        jobs.map(job => {
          return < Job job={job} key={job._id} />
        })
      )}
      {!jobsState && noJobs()}
      {/* <Text>You don't currently have any jobs scheduled, view your quotes and schedule a service to book a job.</Text> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})