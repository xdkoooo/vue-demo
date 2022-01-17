import axios from 'axios';
import router from '../router';
import { Toast } from 'vant';

const tip = msg => {
    Toast({
        message: msg,
        duration: 1000,
        forbidClick: true
    });
}

const toLogin = () => {
    router.replace({
        path: '/login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    })
}

const errorHandle = (status, other) => {
    switch(status) {
        case 401:
            toLogin();
            break;
        case 403: 
            tip('登录过期，请重新登录');
            localStorage.removeItem('token')
            setTimeout(() => {
                toLogin()
            }, 1000)
            break;
        case 404: 
            tip('请求的资源不存在')
            break;
        default: 
            console.log(other);
    }   
}

var instance = axios.create({ timeout: 1000 * 12 });
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencode;charset=UTF-8';

instance.interceptors.request.use(    
    config => {        
        // 每次发送请求之前判断vuex中是否存在token        
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
        // const token = store.state.token;        
        // token && (config.headers.Authorization = token);        
        return config;    
    },    
    error => {        
        return Promise.error(error);    
    }
)

instance.interceptors.response.use(
    res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
    error => {
        const { response } = error;
        if (response) {
            errorHandle(response.status, response.data.message);
            return Promise.reject(response);
        } else {
            if (!window.navigator.onLine) {
                // 断网了
            } else {
                return Promise.reject(error);
            }
        } 
    }
)

export default instance;
