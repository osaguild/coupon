import Vue from 'vue'
import Router from 'vue-router'
import Search from './components/SearchPage.vue'
import List from './components/ListPage.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', redirect: '/search' },
        { path: '/search', component: Search },
        { path: '/list', component: List }
    ]
})