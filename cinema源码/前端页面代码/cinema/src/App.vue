<template>
	<div id="app">
		<!-- 菜单栏 activeIndex 更新激活的菜单项  horizontal  横着摆放菜单项-->
		<el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
			<el-menu-item index="1">
				<router-link to="/">首页</router-link>
			</el-menu-item>
			<el-menu-item index="2">
				<router-link to="/movie">电影</router-link>
			</el-menu-item>
			<el-menu-item index="3">
				<router-link to="/cinema">影院</router-link>
			</el-menu-item>
			<el-menu-item index="4">
				<router-link to="/my">我的</router-link>
			</el-menu-item>
			<!-- 更多菜单项... -->
		</el-menu>

		<!-- 路由视图 -->
		<router-view />
	</div>
</template>
<script>
	import {
		ref,
		onMounted,
		onBeforeMount,
		watch
	} from 'vue'
	import {
		useRoute
	} from 'vue-router'
	import {
		getTopMovielist,
		getHotMovielist,
		getHopeMovielist,
		getCinemalist,
		getSchedulist
	} from './api/request.js';

	export default {
		setup() {
			const route = useRoute()
			const activeIndex = ref('1')

			// 当组件挂载时，根据当前路由来设置活跃菜单项
			// onMounted(() => {
			// 	if (route.path === '/') {
			// 		activeIndex.value = '1'
			// 	} else if (route.path === '/movie') {
			// 		activeIndex.value = '2'
			// 	} else if (route.path === '/cinema') {
			// 		activeIndex.value = '3'
			// 	} else if (route.path === '/my') {
			// 		activeIndex.value = '4'
			// 	}
			// 	// ...根据需要添加更多的条件
			// })

			// 监听路由变化
			watch(() => route.path, (newPath) => {
				if (newPath === '/') {
					activeIndex.value = '1';
					getScheduData()
				} else if (newPath === '/movie') {
					activeIndex.value = '2'
				} else if (newPath === '/cinema') {
					activeIndex.value = '3'
				} else if (newPath === '/my') {
					activeIndex.value = '4'
				} else {
					activeIndex.value = ''
				}
				// ...根据需要添加更多的条件
			})

			const handleSelect = (index, indexPath) => {
				activeIndex.value = index
			}

			// let getTopData = () => {
			// 	let value = JSON.parse(localStorage.getItem("TopMovielistData")) // 判断是否存在本地
			// 	if (value) {
			// 		console.log("中止");
			// 		return
			// 	}
			// 	getTopMovielist().then(res => {
			// 		console.log("res", res);
			// 		// 本地存储
			// 		localStorage.setItem("TopMovielistData", JSON.stringify(res.data.MovieList))
			// 	}).catch(err => {
			// 		console.log('err', err);
			// 	})
			// }

			// let getHotData = () => {
			// 	let value1 = JSON.parse(localStorage.getItem("HotMovielistData")) // 判断是否存在本地
			// 	if (value1) {
			// 		console.log("中止");
			// 		return
			// 	}
			// 	getHotMovielist().then(res => {
			// 		console.log("res", res);
			// 		// 本地存储
			// 		localStorage.setItem("HotMovielistData", JSON.stringify(res.data.MovieList))
			// 	}).catch(err => {
			// 		console.log('err', err);
			// 	})
			// }

			// let getHopeData = () => {
			// 	let value2 = JSON.parse(localStorage.getItem("HopeMovielistData")) // 判断是否存在本地
			// 	if (value2) {
			// 		console.log("中止");
			// 		return
			// 	}
			// 	getHopeMovielist().then(res => {
			// 		console.log("res", res);
			// 		// 本地存储
			// 		localStorage.setItem("HopeMovielistData", JSON.stringify(res.data.MovieList))
			// 	}).catch(err => {
			// 		console.log('err', err);
			// 	})
			// }

			let getCinemaData = () => {
				let value4 = JSON.parse(localStorage.getItem("cinemaListData")) // 判断是否存在本地
				if (value4) {
					// console.log("中止");
					return
				} else {
					getCinemalist().then(res => {
						// console.log(res);
						localStorage.setItem("cinemaListData", JSON.stringify(res.data.CinemaList))
					}).catch(err => {
						console.log(error);
					})
				}
			}

			let getScheduData = () => {
				let value5 = JSON.parse(localStorage.getItem("schedulelistData")) // 判断是否存在本地
				if (value5) {
					// console.log("中止");
					return
				} else {
					getSchedulist().then(res => {
						// console.log(res.data);
						localStorage.setItem("schedulelistData", JSON.stringify(res.data.schedulelist))
					}).catch(err => {
						console.log(err.data);
					})
				}
			}

			onBeforeMount(() => {
				// getTopData();
				// getHotData();
				// getHopeData();
				getCinemaData();
				getScheduData();
			})



			return {
				activeIndex,
				handleSelect
			}
		}
	}
</script>
<style>
	#app {
		background-color: #24282f;
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		.el-menu {
			background-color: #171d25;
			position: fixed;
			/* 固定位置 */
			top: 0;
			/* 距离顶部0 */
			left: 0;
			/* 距离左边0 */
			right: 0;
			/* 距离右边0 */
			z-index: 1000;
			/* 确保菜单栏在其他内容上面 */
		}

		.el-menu-item {
			font-size: 15px;
			color: #dcdedf;
		}


	}

	#fp-nav ul li a.active span,
	#fp-nav ul li:hover a.active span,
	.fp-slidesNav ul li a.active span,
	.fp-slidesNav ul li:hover a.active span {
		background-color: rgb(255, 255, 255);
		box-shadow: rgb(255, 255, 255) 0px 0px 80px inset, rgb(208, 243, 255) 10px 0px 80px inset, rgb(208, 243, 255) -10px 0px 80px inset, rgb(208, 243, 255) 10px 0px 180px inset, rgb(208, 243, 255) -10px 0px 180px inset, rgb(208, 243, 255) 0px 0px 50px, rgb(208, 243, 255) 10px 0px 50px, rgb(208, 243, 255) -10px 0px 50px;
	}

	#fp-nav ul li .fp-tooltip.fp-left {
		left: 31px;
		top: -4px;
	}
</style>
