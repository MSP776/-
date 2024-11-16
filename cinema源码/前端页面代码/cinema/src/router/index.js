import {
	createRouter,
	createWebHashHistory
} from 'vue-router'

import {
	createWebHistory
} from 'vue-router' // 本地
import {
	Toast
} from 'vant';


const routes = [{
		path: '/',
		name: 'home',
		component: () => import( /* webpackChunkName: "about" */ '../views/HomeView.vue')
	},
	{
		path: '/movie',
		name: 'movie',
		// redirect: "/hot",
		component: () => import( /* webpackChunkName: "about" */ '../views/Movie.vue')
	},
	{
		path: '/my',
		name: 'my',
		component: () => import( /* webpackChunkName: "about" */ '../views/My.vue')
	},
	{
		path: '/cinema',
		name: 'cinema',
		component: () => import( /* webpackChunkName: "about" */ '../views/Cinema.vue')
	},
	{
		path: '/cinemas',
		name: 'cinemas',
		component: () => import( /* webpackChunkName: "about" */ '../views/SelectTime.vue')
	},
	{
		path: '/hotfilm',
		name: 'hotfilm',
		component: () => import( /* webpackChunkName: "about" */ '../views/MovieDetail/HotMovieDetail.vue')
	},
	{
		path: '/hopefilm',
		name: 'hopefilm',
		component: () => import( /* webpackChunkName: "about" */ '../views/MovieDetail/HopeMovieDetail.vue')
	},
	{
		path: '/topfilm',
		name: 'topfilm',
		component: () => import( /* webpackChunkName: "about" */ '../views/MovieDetail/TopMovieDetail.vue')
	},
	{
		path: '/seat',
		name: 'seat',
		component: () => import( /* webpackChunkName: "about" */ '../views/Seat.vue')
	},
	{
		path: '/order',
		name: 'order',
		component: () => import( /* webpackChunkName: "about" */ '../views/Submitorder.vue')
	},
	{
		path: '/login',
		name: 'login',
		component: () => import( /* webpackChunkName: "about" */ '../views/user/login')
	},
	{
		path: '/register',
		name: 'register',
		component: () => import( /* webpackChunkName: "about" */ '../views/user/register')
	}


]

const router = createRouter({
	// history: createWebHashHistory(process.env.BASE_URL), // 部署用这个
	history: createWebHistory(process.env.BASE_URL), // 本地用这个
	routes
})

router.beforeEach((to, from, next) => {
	if ((to.fullPath == '/order' || to.fullPath == '/my') && !sessionStorage.getItem('token')) {
		router.push('/login')
		Toast('请先登录');
	}
	next();
})
export default router
