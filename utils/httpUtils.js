import axios from "axios";

const baseUrl = "http://localhost:8080/api";

const errorHandler = (error) => {
  console.error("API Request Error:", error);
  return {
    error: "An error occurred while processing your request.",
  };
};

const general = (apiPath) => {

  return {
    getJson: (path, data) => {
      return axios.get(`${apiPath}/${path}`, {params: data})
      .then(response => {
        return response
      })
      .catch(error => {
        return errorHandler(error)
      })
    },
    postJson: (path, data) => {
      return axios.post(`${apiPath}/${path}`, data)
      .then(response => {
        return response
      })
      .catch(error => {
        return errorHandler(error)
      })
    },
    putJson: (path, data) => {
      return axios.put(`${apiPath}/${path}`, data)
      .then(response => {
        return response
      })
      .catch(error => {
        return errorHandler(error)
      })
    },

    deleteJson: (path, data) => {
      return axios.delete(`${apiPath}/${path}`, {params: data})
      .then(response => {
        return response
      })
      .catch(error => {
        return errorHandler(error)
      });
    },
  };
}

const google = (apiPath) => {
  return {
    getJson: (key, location) => {
      return axios.get(`${apiPath}key=${key}&input=${location}`)
      .then(res => {
        return res
      })
      .catch(error => {
        return errorHandler(error)
      })
    }
  }
}

// export const Vendor = general(`${baseUrl}/vendors`);
export const Property = general(`${baseUrl}/properties`);
export const Utils = general(`${baseUrl}/utils`);
export const Quote = general(`${baseUrl}/quotes`);
export const Job = general(`${baseUrl}/jobs`);

export const GoogleAutocomplete = google(`https://maps.googleapis.com/maps/api/place/autocomplete/json?`)
