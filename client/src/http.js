import axios from 'axios';
import { Loading } from 'element-ui';
import { Message } from 'element-ui';
import router from './router/index.js';



let loading;
function startLoading() {
    loading=Loading.service({
        lock: true,
        text: 'loading...',
        background: 'rgba(0,0,0,0,7)'

    });
}

function endLoading() {
    loading.close();
}
//request intercept
//when we receive the request, we start the loading animation
axios.interceptors.request.use(config => {
    startLoading();
    if (localStorage.eleToken){
        //set the same header
        config.headers.Authorization = localStorage.eleToken;
    }
    return config;
}, error => {
    return Promise.reject(error)
});
//response intercept
//when we are going to respond, we end the loading animation
axios.interceptors.response.use(response => {
    endLoading();
    return response;

}, error => {
    endLoading();
    Message.error(error.response.data);

    const { status } = error.response;
    if (status == 401) {
        Message.error("Token In valid, please login again");
        localStorage.removeItem("eleToken");
        router.push('/login');

    } 
    return Promise.reject(error); 
})

export default axios;