// 用户相关的请求模块
import request from "@/utils/request";
export const login =(data) => {
    return  request({
        method: "POST",
        url: "/manageUsers",
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
