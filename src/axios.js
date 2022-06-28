import axios from 'axios'

axios.defaults.baseURL = 'https://wookie.codesubmit.io'
axios.interceptors.request.use(
  config => {
      config.headers.Authorization = 'Bearer WookieIP2022'
      return config
    }, 
  err => Promise.reject(err) 
)

export default axios