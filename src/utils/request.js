// 基于axios封装的的请求模块
import axios from 'axios'
import JSONbig from 'json-bigint'
 
// 创建一个实例
// 我们请求通过这个实例发请求，把需要的配置给这个实例进行处理
const request = axios.create({
    baseURL:'http://127.0.0.1:8800', //请求的基础路径

    
    // 定义后端返回的原始数据的处理
    // 参数data就是后端返回的原始数据（未经处理的JSON格式）
    transformResponse:[function (data){
        // 后端饭hi的数据可能不是JSON 格式字符串
        // 如果不是的话 那么JSONbig.parse 调用机会报错
        // 所以我们使用 try-catch 来捕获异常，处理异常的发送
        try{
            // 如果转换成功，则直接把结果返回
            return JSONbig.parse(data)
        }catch (err) {
            // 如果转换失败，则进入这里
            // 我们在这里把数据原封不动返回给请求
            return data
        }
    }]
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