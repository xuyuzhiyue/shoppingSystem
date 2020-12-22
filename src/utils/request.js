// 基于axios封装的的请求模块
import axios from 'axios'

// 创建一个实例
// 我们请求通过这个实例发请求，把需要的配置给这个实例进行处理
const request = axios.create({
    baseURL:'http://127.0.0.1:8800' //请求的基础路径
})
// 请求拦截器
request.interceptors.request.use(config=>{
    // 所有请求会经过这里 config当前请求的配置信息
    return config
},error=>{
    // 失败后会经过这里
    return Promise.reject(error)
})
// 导出模块
export default request