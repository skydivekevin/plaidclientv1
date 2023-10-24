import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useContext, useState } from 'react';
import JobsContext from '../../context/JobsContext';
import UserContext from '../../context/UserContext';
import JobTile from "../components/JobTile";
import { Job } from '../../utils/httpUtils';

export default function MyJobs() {
  const { jobs, setJobs } = useContext(JobsContext)
  const { user } = useContext(UserContext)

  useEffect(() => {
    getJobs()
  }, [user])

  function getJobs() {
    Job.getJson('homeownerJobs')
      .then((res) => {
        setJobs(res.data)
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data)
        }
      })
  }

  function noJobs() {
    return <Text>You don't currently have any jobs scheduled, view your quotes and schedule a service to book a job.</Text>
  }

  function renderJobs() {
    return (
      <>
        <Text>Jobs Summary</Text>
        <Text>Click on a job to see more details</Text>

        {jobs.map(job => {
          return <JobTile job={job} key={job._id} />
        })}
      </>
    )
  }

  return (
    <View style={styles.container}>
      {jobs.length > 0 ?
        renderJobs()
        :
        noJobs()
      }
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