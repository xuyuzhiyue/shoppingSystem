// 管理员登录相关的请求模块
import request from "@/utils/request";
export const login =(data) => {
    return  request({
        method: "POST",
        url: "/manageUsers",
        data
    })
}

// 获取管理员所有相关的请求模块
export const userAllData =(data) => {
    return  request({
        url: "/manageUsers"
    })
}

// 注销管理员信息
export const userDelData =(data,id) => {
    return  request({
        url: `/manageUsers/${id}`,
        method:"PUT",
        data
    })
}

// 获取所有的商品信息
export const getUserMessage =() => {
    return  request({
        url: "/goodsDetail"
    })
}

  //   获取字段goodsType对的商品名字信息进行搜索
export const SearchGoodsType =(data) => {
    return  request({
        method: "POST",
        url: "/SearchGoodsType",
        data
    })
}

  //   根据商品时间获取商品的所有信息
export const dateSearchGoodsType =(data) => {
    return  request({
        method: "POST",
        url: "/dateSearch",
        data
    })
}

// 根据goods_id删除商品
export const deleteGoods =(id) => {
    return  request({
        method: "DELETE",
        url: `/goodsDetail/${id}`,
    })
}

// 添加商品
export const insertGoodsDetail =(data) => {
    return  request({
        method: "POST",
        url: '/goodsDetail',
        data
    })
}

// 查询轮播图商品
export const RotationChart =() => {
    return  request({
        url: '/rotationChart'
    })
}
// 根据goods_id删除轮播图商品
export const deleteRotationChart =(id) => {
    return  request({
        method: "DELETE",
        url: `/rotationChart/${id}`,
    })
}
// 添加轮播图商品
export const addRotationChart =(data) => {
    return  request({
        method: "post",
        url: `/rotationChart`,
        data
    })
}

// 查询综合商品
export const Comprehensive =() => {
    return  request({
        url: '/comprehensive'
    })
}
// 根据goods_id删除综合商品
export const deleteComprehensive =(id) => {
    return  request({
        method: "DELETE",
        url: `/comprehensive/${id}`,
    })
}
// 添加综合商品
export const addComprehensive =(data) => {
    return  request({
        method: "POST",
        url: '/comprehensive',
        data
    })
}


// 查询商品类型
export const Allgoods =() => {
    return  request({
        url: '/allgoodsType'
    })
}
// 根据cat_id删除商品类型
export const deleteAllgoods =(id) => {
    return  request({
        method: "DELETE",
        url: `/allgoodsType/${id}`,
    })
}
//添加商品类型
export const addAllgoodsType =(data) => {
    return  request({
        method: "POST",
        url: '/allgoodsType',
        data
    })
}

