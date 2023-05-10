import React, { useState } from 'react';

const JobsContext = React.createContext();

export const JobsProvider = (props) => {

  const [jobs, setJobs] = useState([]);

  return (
    <JobsContext.Provider value={{
      jobs, setJobs
    }}>
      {props.children}
    </JobsContext.Provider>
  )
}
export default JobsContext;