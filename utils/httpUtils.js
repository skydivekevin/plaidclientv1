import axios from "axios";

//local server
const baseUrl = "http://localhost:8080/api";

//prod server
// const baseUrl = "http://18.234.149.45/api";

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

export const Auth = general(`${baseUrl}/auth`);
export const Job = general(`${baseUrl}/jobs`);
export const Property = general(`${baseUrl}/properties`);
export const Quote = general(`${baseUrl}/quotes`);
export const Utils = general(`${baseUrl}/utils`);
export const Vendor = general(`${baseUrl}/vendors`);

export const GoogleAutocomplete = google(`https://maps.googleapis.com/maps/api/place/autocomplete/json?`)