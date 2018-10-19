import Vue from 'vue'
import Router from 'vue-router'
import StudyHome from '@/components/StudyHome'
import CourseSearch from '@/components/CourseSearch'
import CourseDetailContainer from '@/components/CourseDetailContainer'
import ArticleHome from '@/components/ArticleHome'
import ArticleDetailContainer from '@/components/ArticleDetailContainer'
import CareerHome from '@/components/CareerHome'
import CareerDetail from '@/components/CareerDetail'
import PersonalCenterContainer from '@/components/PersonalCenterContainer'
import PersonalSettingContainer from '@/components/PersonalSettingContainer'

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
      path: '/person',
      name: 'personalcentercontainer',
      component: PersonalCenterContainer
    },
    {
      path: '/setting',
      name: '/personalsettingcontainer',
      component: PersonalSettingContainer
    }
  ]
})
