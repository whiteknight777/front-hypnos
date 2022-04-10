import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;
const Axios = axios.create({
    baseURL,
    responseType: 'json',
    timeout: 3000,
    withCredentials: true,
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    }
});

/*
  The below is required if you want your API to return
  server message errors. Otherwise, you'll just get
  generic status errors.

  If you use the interceptor below, then make sure you
  return an err message from your express route:

  res.status(404).json({ err: "You are not authorized to do that." })
*/
Axios.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

export default Axios;
