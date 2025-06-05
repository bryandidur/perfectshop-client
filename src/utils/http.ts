import Axios from 'axios';

export default Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {Accept: 'application/json'},
});
