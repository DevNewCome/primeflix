//https://api.themoviedb.org/3/movie/550?api_key=1728816a402a07893f04b1af16b895cd//

import axios from 'axios';
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3'
})

export default api;