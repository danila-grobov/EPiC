import axios from 'axios';
axios.interceptors.response.use(res => {
    console.log(res.status);
    return res;
}, error => {
    if(error.response) {
        const {status, data} = error.response;
        if(status === 303) {
            window.location = data;
        }
    }
    return Promise.reject();
})
export default axios;