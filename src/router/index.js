import Vue from 'vue'
import Router from 'vue-router'
import { getToken } from '@/utils/auth'

Vue.use(Router)

const LayoutComponent = () => import('@/views/layout/layout')
const LoginComponent = () => import('@/views/login/index')
const articleListComponent = () => import('@/views/article/list')
const articleAddComponent = () => import('@/views/article/create')
const articleEditComponent = () => import('@/views/article/edit')
const videoListComponent = () => import('@/views/video/list')
const JobListComponent = () => import('@/views/job/list')
const TagListComponent = () => import('@/views/tag/list')
const ConfigListComponent = () => import('@/views/config/list')
const LiveVideoComponent = () => import('@/views/config/liveVideoConfig')
const PartnerListComponent = () => import('@/views/config/partner')

// 首页
const dashboardRoute = {
  path: '/',
  redirect: 'article',
  name: 'dashboard',
  hidden: true
}

/**
 * 登录路由
 * @type {{path: string, component: function(), hidden: boolean}}
 */
const loginRoute = {
  path: '/login',
  name: 'login',
  component: LoginComponent,
  hidden: true
}

/**
 * 文章列表
 * @type {{path: string, component: function(), name: string}}
 */
const articleListRoute = {
  path: '/article/list',
  component: articleListComponent,
  name: 'articleList',
  meta: {
    title: '文章列表'
  }
}

/**
 * 添加文章
 * @type {{path: string, component: function(), name: string, meta: {title: string}}}
 */
const articleAddRoute = {
  path: '/article/add',
  component: articleAddComponent,
  name: 'articleAdd',
  meta: {
    title: '创建文章'
  }
}

/**
 * 编辑文章
 * @type {{path: string, component: function(), name: string, meta: {title: string}}}
 */
const articleEditRoute = {
  path: '/article/edit/:id(\\d+)',
  component: articleEditComponent,
  name: 'articleEdit',
  hidden: true,
  meta: {
    title: '修改文章'
  }
}

/**
 * 文章管理
 * @type {{path: string, component: function(), name: string, redirect: string, children: *[]}}
 */
const articleRoute = {
  path: '/article',
  component: LayoutComponent,
  name: 'article',
  redirect: '/article/list',
  meta: {
    title: '文章管理'
  },
  children: [
    articleAddRoute,
    articleListRoute,
    articleEditRoute
  ]
}

/**
 * 视频列表
 * @type {{path: string, component: function(), name: string}}
 */
const videoListRoute = {
  path: '/video/list',
  component: videoListComponent,
  name: 'videoList',
  meta: {
    title: '视频列表'
  }
}

/**
 * 视频管理
 * @type {{path: string, component: function(), name: string, redirect: string, children: *[]}}
 */
const videoRoute = {
  path: '/video',
  component: LayoutComponent,
  name: 'video',
  redirect: '/video/list',
  meta: {
    title: '视频管理'
  },
  children: [
    videoListRoute
  ]
}

const jobListRoute = {
  path: '/job/list',
  component: JobListComponent,
  name: 'jobList',
  meta: {
    title: '岗位列表'
  }
}

/**
 * 职位管理
 * @type {{path: string, component: function(), name: string, redirect: string, meta: {title: string}, children: Array}}
 */
const jobRoute = {
  path: '/job',
  component: LayoutComponent,
  name: 'job',
  redirect: '/job/list',
  meta: {
    title: '岗位管理'
  },
  children: [
    jobListRoute
  ]
}

const tagListRoute = {
  path: '/tag/list',
  component: TagListComponent,
  name: 'tagList',
  meta: {
    title: '标签列表'
  }
}

const tagRoute = {
  path: '/tag',
  component: LayoutComponent,
  name: 'tag',
  redirect: '/tag/list',
  meta: {
    title: '标签管理'
  },
  children: [
    tagListRoute
  ]
}

const configListRoute = {
  path: '/config/list',
  component: ConfigListComponent,
  name: 'configList',
  meta: {
    title: '配置列表'
  }
}

const liveVideoRoute = {
  path: '/config/liveVideo',
  component: LiveVideoComponent,
  name: 'liveVideo',
  meta: {
    title: '直播配置'
  }
}

const partnerListRoute = {
  path: '/config/partner',
  component: PartnerListComponent,
  name: 'partnerList',
  meta: {
    title: '合作伙伴配置'
  }
}

const configRoute = {
  path: '/config',
  component: LayoutComponent,
  name: 'config',
  redirect: '/config/liveVideo',
  meta: {
    title: '配置管理'
  },
  children: [
    liveVideoRoute,
    partnerListRoute,
    configListRoute
  ]
}

export const routes = [
  dashboardRoute,
  loginRoute,
  articleRoute,
  videoRoute,
  jobRoute,
  tagRoute,
  configRoute
]

const router = new Router({
  routes
})

// 全局路由拦截器，鉴权
router.beforeEach((to, from, next) => {
  if (to.name !== 'login') {
    // 在这里鉴权。没有权限跳转到login页面
    const token = getToken()
    console.log(token)
    if (!token) {
      next({
        name: 'login'
      })
    }
  }
  next()
})

export default router
