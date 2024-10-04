import axios from "axios";
import useCurrentToken from '../hooks/useCurrentToken'


const baseUrl = 'http://127.0.0.1:5000/api'
// const {token} = useCurrentToken()

const axiosInstance = axios.create({
    baseURL: baseUrl
})

const axiosPrivate = axios.create({
    baseURL: baseUrl,
})

axiosPrivate.interceptors.request.use(
    (request) => {
        
        // const {token} = useCurrentToken()
        const token = localStorage.getItem('token');
        console.log(`xxxxx ${token}`)
        
        request.headers['Authorization'] = `Bearer ${token}`
        return request
    },
    (error) => {
        console.log(error)
        throw error;
    }
)

export { axiosInstance, axiosPrivate }