import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/views/layout'
import Article from '@/views/article' 

Vue.use(VueRouter)

// 路由配置表
const routes = [
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path:'/',
    // 这个路由layout没有意义
    // name:'layout',
    component:Layout,
    children:[
      {
        path:'',
        name:'home',
        component:Home
      },{
        path:'/article',
        name:'article',
        component:Article
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

// 路由导航守卫 所有的页面的导航都会经过这里
// to  要去的路由信息
// from  来自哪里的路由信息
// next 运行通过
router.beforeEach((to,from,next)=>{
  // 要访问的页面不是登陆页面 校验登录状态
  // 如果没有登录，则跳转到登陆页面
  // 如果登陆了，则运行通过
  if(to.path !== '/login'){
    
  const user = JSON.parse(window.localStorage.getItem('user'))
    if(user){
      next()
    }else{
      next('/login')
    }
  }else{
    // 登陆页面，正常通过
    next()
  }
})

export default router
