import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const components = {
  login: () => import('@/views/login'),
  layout: () => import('@/views/layout'),
  welcome: () => import('@/views/layout/welcome'),
  adminList: () => import('@/views/adminUser/adminList'),
  addAdmin: () => import('@/views/adminUser/addAdmin'),
  editAdmin: () => import('@/views/adminUser/editAdmin'),
  editPass: () => import('@/views/adminUser/editPass'),
  addNews: () => import('@/views/news/addNews'),
  newsList: () => import('@/views/news/newsList'),
  addCategory: () => import('@/views/category/addCategory'),
  categoryList: () => import('@/views/category/categoryList'),
  swiperList: () => import('@/views/swiper/swiperList'),
  addSwiper: () => import('@/views/swiper/addSwiper'),
  topicList: () => import('@/views/topic/topicList')
}

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: components.login
    },
    {
      path: '/layout',
      name: 'login',
      component: components.layout,
      redirect: 'layout/welcome',
      children: [
        {
          path: 'welcome',
          name: 'welcome',
          component: components.welcome
        },
        {
          path: 'adminList',
          mate: {
            title: '管理员列表'
          },
          name: 'adminList',
          component: components.adminList
        },
        {
          path: 'addAdmin',
          mate: {
            title: '添加管理员'
          },
          name: 'addAdmin',
          component: components.addAdmin
        },
        {
          path: 'editAdmin',
          mate: {
            title: '修改个人信息'
          },
          name: 'editAdmin',
          component: components.editAdmin
        },
        {
          path: 'editPass',
          mate: {
            title: '修改密码'
          },
          name: 'editPass',
          component: components.editPass
        },
        {
          path: 'addNews',
          mate: {
            title: '添加新闻'
          },
          name: 'addNews',
          component: components.addNews
        },
        {
          path: 'editNews/id=:id',
          mate: {
            title: '更新新闻'
          },
          name: 'editNews',
          component: components.addNews
        },
        {
          path: 'newsList',
          mate: {
            title: '新闻列表'
          },
          name: 'newsList',
          component: components.newsList
        },
        {
          path: 'addCategory',
          mate: {
            title: '添加分类'
          },
          name: 'addCategory',
          component: components.addCategory
        },
        {
          path: 'categoryList',
          mate: {
            title: '分类列表'
          },
          name: 'categoryList',
          component: components.categoryList
        },
        {
          path: 'updateCategory/id=:id',
          mate: {
            title: '更新分类'
          },
          name: 'updateCategory',
          component: components.addCategory
        },
        {
          path: 'swiperList',
          mate: {
            title: '轮播图列表'
          },
          name: 'swiperList',
          component: components.swiperList
        },
        {
          path: 'addSwiper',
          mate: {
            title: '添加列表'
          },
          name: 'addSwiper',
          component: components.addSwiper
        },
        {
          path: 'editSwiper/id=:id',
          mate: {
            title: '添加列表'
          },
          name: 'editSwiper',
          component: components.addSwiper
        },
        {
          path: 'topicList',
          mate: {
            title: '评论列表'
          },
          name: 'topicList',
          component: components.topicList
        }
      ]
    }
  ]
})
