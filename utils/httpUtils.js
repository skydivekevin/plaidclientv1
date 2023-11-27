import axios from "axios";

//local server
// const baseUrl = "http://localhost:8080/api";

//prod server
const baseUrl = "http://18.234.149.45/api";
const errorHandler = (error) => {
  console.error("API Request Error:", error);
  return {
    error: "An error occurred while processing your request.",
    response: error.response || null,
  };
};

const general = (apiPath, token) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const instance = axios.create({
    baseURL: apiPath,
    headers: headers,
  });

  return {
    getJson: (path, data) => {
      return instance
        .get(path, { params: data })
        .then((response) => {
          return { data: response.data, response };
        })
        .catch((error) => {
          return errorHandler(error);
        });
    },
    postJson: (path, data) => {
      return instance
        .post(path, data)
        .then((response) => {
          return { data: response.data, response };
        })
        .catch((error) => {
          return errorHandler(error);
        });
    },
    putJson: (path, data) => {
      return instance
        .put(path, data)
        .then((response) => {
          return { data: response.data, response };
        })
        .catch((error) => {
          return errorHandler(error);
        });
    },
    deleteJson: (path, data) => {
      return instance
        .delete(path, { params: data })
        .then((response) => {
          return { data: response.data, response };
        })
        .catch((error) => {
          return errorHandler(error);
        });
    },
  };
};

const google = (apiPath) => {
  return {
    getJson: (key, location) => {
      return axios
        .get(`${apiPath}key=${key}&input=${location}`)
        .then((res) => {
          return { data: res.data, response: res };
        })
        .catch((error) => {
          return errorHandler(error);
        });
    },
  };
};

export const Auth = (token) => general(`${baseUrl}/auth`, token);
export const Job = (token) => general(`${baseUrl}/jobs`, token);
export const Property = (token) => general(`${baseUrl}/properties`, token);
export const Quote = (token) => general(`${baseUrl}/quotes`, token);
export const Utils = general(`${baseUrl}/utils`);
export const Vendor = (token) => general(`${baseUrl}/vendors`, token);

export const GoogleAutocomplete = google(`https://maps.googleapis.com/maps/api/place/autocomplete/json?`)