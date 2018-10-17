import Vue from 'vue'
import Router from 'vue-router'
import StudyHome from '@/components/StudyHome'
import CourseSearch from '@/components/CourseSearch'
import CourseDetailContainer from '@/components/CourseDetailContainer'
import ArticleHome from '@/components/ArticleHome'
import ArticleDetailContainer from '@/components/ArticleDetailContainer'
import CareerDiv from '@/components/CareerDiv'
import CareerSearch from '@/components/CareerSearch'
import CareerDetail from '@/components/CareerDetail'

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
      path: '/coursedetail',
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
      path: '/allcareer',
      name: 'careersearch',
      component: CareerSearch
    },
    {
      path: '/career',
      name: 'careerdiv',
      component: CareerDiv
    },
    {
      path: '/careerdetail',
      name: 'careerdetail',
      component: CareerDetail
    }
  ]
})
