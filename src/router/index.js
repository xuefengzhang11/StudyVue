import Vue from 'vue'
import Router from 'vue-router'

// 主页面组件
import StudyHome from '@/components/homepagevue/StudyHome'

// 课程模块组件
import CourseSearch from '@/components/course/CourseSearch'
import CourseDetailContainer from '@/components/course/CourseDetailContainer'

// 文章模块组件
import ArticleHome from '@/components/article/ArticleHome'
import ArticleDetailContainer from '@/components/article/ArticleDetailContainer'

// 职业计划模块组件
import CareerHome from '@/components/career/CareerHome'
import CareerDetail from '@/components/career/CareerDetail'

// 个人中心模块组件
import PersonalCenterContainer from '@/components/personalcenter/PersonalCenterContainer'
// 个人设置模块组件
import PersonalSettingContainer from '@/components/personalsetting/PersonalSettingContainer'
// 导入节详情页视频组件
import SectionDetail from '@/components/course/SectionDetail'

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
    }
  ]
})
