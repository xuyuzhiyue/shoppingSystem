// 用户相关的请求模块
import request from "@/utils/request";
export const login =(data) => {
    return  request({
        method: "POST",
        url: "/manageUsers",
        data
    })
}

// 获取用户信息
export const getUserMessage =(data) => {
    return  request({
        method: "POST",
        url: "/manageUsers",
        data
    })
}
