// module.exports = {
//     devServer:{
//         // 配置反向代理
//         proxy:{
//             '/v':{
//                 target:'http://127.0.0.1:8800', //目的地址
//                 ws:true ,//是否启用websockets
//                 changeOrigin:true, //开启代理：在本地会创建一个虚拟服务器 然后发送请求的数据，同时接受请求的数据，这样服务端和和服务端进行数据的交互就不会有跨域的问题
//                 pathRewrite:{'^/v':'/'}
//             }
//         }
//     }
// }