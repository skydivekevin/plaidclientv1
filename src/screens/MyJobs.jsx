import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useContext, useState } from 'react';
import JobsContext from '../../context/JobsContext';
import UserContext from '../../context/UserContext';
import JobTile from "../components/JobTile";



import axios from 'axios';

const baseUrl = 'http://localhost:8080/api';

export default function MyJobs() {

  const { jobs, setJobs } = useContext(JobsContext)
  const { user, setUser } = useContext(UserContext)

  const [jobsState, setJobsState] = useState([])

  useEffect(() => {
    getJobs()
  }, [user])

  function getJobs() {
    console.log("getJobs")
    axios({
      method: 'GET',
      url: `${baseUrl}/jobs/homeownerJobs`,
    })
      .then((res) => {
        // console.log("res: ", res.data)
        setJobs(res.data)
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
    jobs.map(job => {
      <JobTile job={job} key={job._id} />
    })
  }

  return (
    <View style={styles.container}>
      {jobs && (
        jobs.map(job => {
          return <JobTile job={job} key={job._id} />
        })
      )}
      {!jobs && <Text>You don't currently have any jobs scheduled, view your quotes and schedule a service to book a job.</Text>}
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