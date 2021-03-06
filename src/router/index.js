import Vue from 'vue'
import Router from 'vue-router'

// 主页面组件
import StudyHome from '@/components/homepagevue/StudyHome'

// 课程模块组件
import CourseSearch from '@/components/course/CourseSearch'
import CourseDetailContainer from '@/components/course/CourseDetailContainer'
import SectionDetail from '@/components/course/SectionDetail'

// 文章模块组件
import ArticleHome from '@/components/article/ArticleHome'
import ArticleDetailContainer from '@/components/article/ArticleDetailContainer'
import WriteArticle from '@/components/article/WriteArticle'

// 职业计划模块组件
import CareerHome from '@/components/career/CareerHome'
import CareerDetail from '@/components/career/CareerDetail'

// 个人中心模块组件
import PersonalCenterContainer from '@/components/personalcenter/PersonalCenterContainer'
// 关于我们
import AboutMe from '@/components/personalsetting/AboutMe'
// 个人设置模块组件
import PersonalSettingContainer from '@/components/personalsetting/PersonalSettingContainer'
// 购物车组件
import Cart from '@/components/publicvue/Cart'
// 订单组件
import PersonalOrderContainer from '@/components/personalcenter/PersonalOrderContainer'

// 轮播图
import Carousel from '@/components/homepagevue/Carousel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'studyhome',
      component: StudyHome
    },
    {
      path: '/course',
      name: 'coursesearch',
      component: CourseSearch
    },
    {
      path: '/coursedetail/:courseid',
      name: 'coursedetail',
      component: CourseDetailContainer
    },
    {
      path: '/article',
      name: 'articlehome',
      component: ArticleHome
    },
    {
      path: '/articleDetail/:artid',
      name: 'articledetailcontainer',
      component: ArticleDetailContainer
    },
    {
      path: '/career',
      name: 'careerhome',
      component: CareerHome
    },
    {
      path: '/careerdetail',
      name: 'careerdetail',
      component: CareerDetail
    },
    {
      path: '/personal',
      name: 'personal',
      component: PersonalCenterContainer
    },
    {
      path: '/setting',
      name: '/personalsettingcontainer',
      component: PersonalSettingContainer
    },
    {
      path: '/sectiondetail',
      name: 'sectiondetail',
      component: SectionDetail
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/order',
      name: 'order',
      component: PersonalOrderContainer
    },
    {
      path: '/writearticle',
      name: 'writearticle',
      component: WriteArticle
    },
    // 轮播图
    {
      path: '/lunbotu',
      name: 'lunbotu',
      component: Carousel
    },
    {
      path: '/aboutme',
      name: 'aboutme',
      component: AboutMe
    }
  ]
})
