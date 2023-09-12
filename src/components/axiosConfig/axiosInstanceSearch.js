import axios from "axios";

const axiosInstanceSearch = axios.create({
  baseURL:
    "https://api.themoviedb.org/3/search/movie?api_key=9bde527a522be317284baefbb6e3bd30",
  headers: {
    accept: "application/json",
  },
  params: {
    api_key: "9bde527a522be317284baefbb6e3bd30",
  },
});

export default axiosInstanceSearch;
