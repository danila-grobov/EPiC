import axios from 'axios';
axios.interceptors.response.use(res => {
    return res;
}, error => {
    const {status, data} = error.response;
    if(status === 303) {
        window.location = data;
    }
})
export default axios;