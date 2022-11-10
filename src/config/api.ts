import axios from 'axios';

const api = axios.create({
  baseURL: 'https://challenges.coode.sh/food/data/json',
});

export default api;
