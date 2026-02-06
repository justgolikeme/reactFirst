//二次封装axios的逻辑定义在这里
//通过axios创建实例
import axios from 'axios'

//定义baseurl
const baseUrl='/api'

//axois二次封装的核心
//面向对象的方法
class HttpRequest{
    constructor(baseUrl){
        this.baseUrl = baseUrl
    }
    getInsideConfig(){
        const config = {
            baseURL: this.baseUrl,
            header: {}
        }
        return config
    }

    interception(instance){
        // 添加请求拦截器
        instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            // 2xx 范围内的状态码都会触发该函数。
            // 对响应数据做点什么
            return response;
        }, function (error) {
            // 超出 2xx 范围的状态码都会触发该函数。
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }

    request(options){
        //对象重组
        options = {...this.getInsideConfig(),...options}
        //创建axios的实例
        const instance = axios.create()
        //实例拦截器的绑定
        this.interception(instance)
        return instance(options)
    }
}

export default new HttpRequest(baseUrl)