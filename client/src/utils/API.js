/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const APIKEY = process.env.REACT_APP_OMDB_KEY;

export default {
  search: function (query) {
    return axios.get("https://www.omdbapi.com/?apikey=" + APIKEY + "&s=" + query);
  },
  
  info: function (query) {
    return axios.get("https://www.omdbapi.com/?apikey=" + APIKEY + "&t=" + query);
  },

  save: function (movieData) {
    return axios.post("/api/movies", movieData);
  },

  get: function () {
    return axios.get("/api/movies");
  },

  delete: function (id) {
    return axios.delete("/api/movies/" + id);
  },
};
