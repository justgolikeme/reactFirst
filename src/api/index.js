//接口的使用定义在这里
import http from './axios'


//后端接口
export const getData=()=>{
    return http.request({
        url:'/home/getData',
        method:'get'
    })
}