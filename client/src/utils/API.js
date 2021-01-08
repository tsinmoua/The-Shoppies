/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const APIKEY = process.env.REACT_APP_OMDB_KEY;

export default {
  search: function (query) {
    return axios.get("http://www.omdbapi.com/?apikey=" + APIKEY + "&s=" + query);
  },

  save: function (movieData) {
    return axios.post("/api/movie", movieData);
  },

  get: function () {
    return axios.get("/api/movie");
  },

  delete: function (id) {
    return axios.delete("/api/movie/" + id);
  },
};
