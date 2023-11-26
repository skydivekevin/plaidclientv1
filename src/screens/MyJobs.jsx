import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useContext, useState } from "react";
import JobsContext from "../../context/JobsContext";
import UserContext from "../../context/UserContext";
import JobTile from "../components/JobTile";
import { Job } from "../../utils/httpUtils";
import { useFocusEffect } from "@react-navigation/native";

export default function MyJobs() {
  const { jobs, setJobs } = useContext(JobsContext);
  const { user, token } = useContext(UserContext);
  const [requestedJobs, setRequestedJobs] = useState([]);
  const [acceptedJobs, setAcceptedJobs] = useState([]);
  const [completedJobs, setCompletedJobs] = useState([]);

  useEffect(() => {
    getJobs();
  }, [user]);

  useFocusEffect(
    React.useCallback(() => {
      getJobs();
    }, [])
  );

  function getJobs() {
    Job(token).getJson("homeownerJobs")
      .then((response) => {
        setJobs(response.data);
        aggregateJobs(response.data);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
        }
      });
  }

  function aggregateJobs(jobsData) {
    const requested = jobsData.filter((job) => job.jobStatus === "REQUESTED");
    const accepted = jobsData.filter((job) => job.jobStatus === "ACCEPTED");
    const completed = jobsData.filter((job) => job.jobStatus === "COMPLETED");

    setRequestedJobs(requested);
    setAcceptedJobs(accepted);
    setCompletedJobs(completed);
  }

  function noJobs() {
    return (
      <Text>
        You don't currently have any jobs scheduled, view your quotes and
        schedule a service to book a job.
      </Text>
    );
  }

  function renderJobs() {
    return (
      <View style={styles.infoContainer}>
        <Text style={styles.subTitle}>Click on a job to see more details</Text>

        {requestedJobs.length > 0 ? (
          <View style={styles.includedServicesContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Requested Jobs</Text>
            </View>
            {requestedJobs.map((job) => {
              return (
                <View style={styles.jobTile} key={job._id}>
                  <JobTile job={job} />
                </View>
              );
            })}
          </View>
        ) : null}
        {acceptedJobs.length > 0 ? (
          <View style={styles.includedServicesContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Accepted Jobs</Text>
            </View>
            {acceptedJobs.map((job) => {
              return (
                <View style={styles.jobTile} key={job._id}>
                  <JobTile job={job} />
                </View>
              );
            })}
          </View>
        ) : null}
        {completedJobs.length > 0 ? (
          <View style={styles.includedServicesContainer}>
            <View style={styles.titleContainer}>
              {completedJobs.length > 0 ? (
                <Text style={styles.title}>Completed Jobs</Text>
              ) : (
                <Text style={styles.title}>No Completed Jobs</Text>
              )}
            </View>
            {completedJobs.map((job) => {
              return (
                <View style={styles.jobTile} key={job._id}>
                  <JobTile job={job} />
                </View>
              );
            })}
          </View>
        ) : null}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {jobs?.length > 0 ? renderJobs() : noJobs()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  title: {
    marginBottom: 10,
    fontSize: 30,
    borderBottomWidth: 1,
    textAlign: "center",
  },
  subTitle: {
    marginBottom: 10,
    marginTop: 20,
    textAlign: "center",
  },
  includedServicesContainer: {
    alignItems: "center",
    borderTop: 1,
    paddingTop: 30,
    width: "100%",
  },
  infoContainer: {
    width: "100%",
  },
  titleContainer: {
    borderBottomWidth: 1,
    width: "95%",
    marginBottom: 20
  },
  jobTile: {
    marginBottom: 5,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
  },
});
