<template>
	<div class="BigBox">

		<div class="content-Box">

			<div class="left-box">
				<div class="top-ten-list">
					<h2 class="list-title">豆瓣评分电影排行榜</h2>
					<ol class="list-items">
						<li v-for="(item,index) in Leftlist">
							<div class="list-items-title" @click="toTopDetail(item.movie_id)">
								{{item.title}}
								<span style="padding-left: 20px; color: #ffb400;">{{item.score}}</span>
							</div>
						</li>
					</ol>
					<!-- <a class="more-link" href="#">查看更多...</a> -->
				</div>
			</div>
			<div class="right-box">
				<full-page ref="fullpage" :options="option">
					<section class="section">
						<div class="hotBox">
							<div class="hotBox-topbox">
								<div class="left">正在热映</div>
								<div class="right" @click="toMovie()" style="display: flex;color: #c5171f;">全部
									<van-image lazy-load :src="require('../assets/all.png')" width="20px"
										height="20px" />
								</div>
							</div>
							<div class="img-bigBox">
								<div class="img-box" v-for="(item,index) in Hotlist" :key="index">

									<div class="top" @click="toHotDetail(item.movie_id)">
										<van-image lazy-load :src="item.image" style="width: 150px;" />
										<div class="overMovie">
											<div class="text">{{item.title}}</div>
											<div class="score">{{item.score}}</div>
										</div>

									</div>


									<!-- 	<div class="bottom">
										<a class="text" href="/">购票</a>
									</div> -->
								</div>
							</div>
						</div>

					</section>
					<section class="section">
						<div class="hopeBox">
							<div class="hotBox-topbox">
								<div class="left" style="color: #2d98f3!important;">最受期待</div>
								<div class="right" @click="toMovie()" style="display: flex;color: #298dde!important;">
									全部
									<van-image lazy-load :src="require('../assets/all.png')" width="20px"
										height="20px" />
								</div>
							</div>
							<div class="img-bigBox">
								<div class="img-box" v-for="(item,index) in Hopelist" :key="index">
									<div class="top" @click="toHopeDetail(item.movie_id)">
										<van-image lazy-load :src="item.image" alt="" style="width: 150px;" />
										<div class="overMovie">
											<div class="text" style="text-align: center;">{{item.title}}</div>
										</div>

									</div>
									<!-- 	<div class="bottom">
										<a class="text" href="/">购票</a>
									</div> -->
								</div>
							</div>
						</div>

					</section>
					<section class="section">
						<div class="classicBox">
							<div class="hotBox-topbox">
								<div class="left" style="color: yellowgreen!important;">经典Top100</div>
								<div class="right" @click="toMovie()"
									style="display: flex;color: yellowgreen!important;">全部
									<van-image lazy-load :src="require('../assets/all.png')" width="20px"
										height="20px" />
								</div>

							</div>
							<div class="img-bigBox">
								<div class="img-box" v-for="(item,index) in Toplist" :key="index">
									<div class="top" @click="toTopDetail(item.movie_id)">
										<van-image lazy-load :src="item.image" alt="" style="width: 150px;" />
										<div class="overMovie">
											<div class="text">{{item.title}}</div>
											<div class="score">{{item.score}}</div>
										</div>

									</div>
									<!-- <div class="bottom">
										<a class="text" href="#">购票</a>
									</div> -->
								</div>
							</div>
						</div>

					</section>
				</full-page>



			</div>

		</div>
	</div>


</template>

<script>
	import axios from 'axios';
	import {
		reactive,
		toRefs,
		onMounted,
		ref
	} from 'vue';

	import {
		useRouter
	} from 'vue-router'

	import {
		getTopMovielist,
		getHotMovielist,
		getHopeMovielist,
		getCinemalist,
		getSchedulist
	} from '../api/request.js';


	export default {

		setup() {
			let Data = reactive({
				Movielist: [],
				Toplist: [],
				Hotlist: [],
				Hopelist: [],
				Leftlist: []
			});

			let option = reactive({
				// 这里是fullPage的配置项
				// 例如设置滚动速度为700毫秒
				scrollingSpeed: 500,
				licenseKey: "OPEN-SOURCE-GPLV3-LICENSE",
				//是否显示导航，默认为false
				navigation: true
			});

			let getTopData = () => {
				let value1 = JSON.parse(localStorage.getItem("TopMovielistData")) // 判断是否存在本地
				if (value1) {
					// console.log("中止");
					Data.Movielist = value1
					// console.log(Data.Movielist);
					for (var i = 0; i < 10; i++) {
						Data.Leftlist.push(Data.Movielist[i])
					}
					for (var i = 11; i < 19; i++) {
						Data.Toplist.push(Data.Movielist[i])
					}
					return
				}
				getTopMovielist().then(res => {
					// console.log("res", res);
					// 本地存储
					localStorage.setItem("TopMovielistData", JSON.stringify(res.data.MovieList))
					Data.Movielist = res.data.MovieList
					// console.log(Data.Movielist);
					for (var i = 0; i < 10; i++) {
						Data.Leftlist.push(Data.Movielist[i])
					}
					for (var i = 11; i < 19; i++) {
						Data.Toplist.push(Data.Movielist[i])
					}
				}).catch(err => {
					console.log('err', err);
				})
			}

			let getHotData = () => {
				let value2 = JSON.parse(localStorage.getItem("HotMovielistData")) // 判断是否存在本地
				if (value2) {
					// console.log("中止");
					Data.Movielist = value2
					// console.log(Data.Movielist);
					for (var i = 0; i < 8; i++) {
						Data.Hotlist.push(Data.Movielist[i])
					}
					return
				}
				getHotMovielist().then(res => {
					// console.log("res", res);
					// 本地存储
					localStorage.setItem("HotMovielistData", JSON.stringify(res.data.MovieList));
					Data.Movielist = res.data.MovieList
					// console.log(Data.Movielist);
					for (var i = 0; i < 8; i++) {
						Data.Hotlist.push(Data.Movielist[i])
					}
				}).catch(err => {
					console.log('err', err);
				})
			}

			let getHopeData = () => {
				let value3 = JSON.parse(localStorage.getItem("HopeMovielistData")) // 判断是否存在本地
				if (value3) {
					// console.log("中止");
					Data.Movielist = value3
					// console.log(Data.Movielist);
					for (var i = 0; i < 8; i++) {
						Data.Hopelist.push(Data.Movielist[i])
					}
					return
				}
				getHopeMovielist().then(res => {
					// console.log("res", res);
					// 本地存储
					localStorage.setItem("HopeMovielistData", JSON.stringify(res.data.MovieList))
					Data.Movielist = res.data.MovieList
					// console.log(Data.Movielist);
					for (var i = 0; i < 8; i++) {
						Data.Hopelist.push(Data.Movielist[i])
					}
				}).catch(err => {
					console.log('err', err);
				})
			}


			// let getData = () => {
			// 	// let value1 = JSON.parse(localStorage.getItem("TopMovielistData")) // 从本地获取
			// 	// let value2 = JSON.parse(localStorage.getItem("HotMovielistData"))
			// 	// let value3 = JSON.parse(localStorage.getItem("HopeMovielistData"))
			// 	// Data.Movielist = value1
			// 	// // console.log(Data.Movielist);
			// 	// for (var i = 0; i < 10; i++) {
			// 	// 	Data.Leftlist.push(Data.Movielist[i])
			// 	// }
			// 	// for (var i = 11; i < 19; i++) {
			// 	// 	Data.Toplist.push(Data.Movielist[i])
			// 	// }

			// 	// Data.Movielist = value2
			// 	// // console.log(Data.Movielist);
			// 	// for (var i = 0; i < 8; i++) {
			// 	// 	Data.Hotlist.push(Data.Movielist[i])
			// 	// }

			// 	// Data.Movielist = value3
			// 	// // console.log(Data.Movielist);
			// 	// for (var i = 0; i < 8; i++) {
			// 	// 	Data.Hopelist.push(Data.Movielist[i])
			// 	// }

			// }

			const Router = useRouter();

			let toMovie = () => {
				Router.push({
					path: '/movie'
				})
			}

			let toHotDetail = (movieId) => {
				Router.push({
					path: '/hotfilm',
					query: {
						movieId
					}
				})
			}

			let toHopeDetail = (movieId) => {
				Router.push({
					path: '/hopefilm',
					query: {
						movieId
					}
				})
			}

			let toTopDetail = (movieId) => {
				Router.push({
					path: '/topfilm',
					query: {
						movieId
					}
				})
			}


			onMounted(() => {
				getTopData();
				getHotData();
				getHopeData();
			})

			return {
				...toRefs(Data),
				option,
				toHotDetail,
				toHopeDetail,
				toTopDetail,
				toMovie
			}
		}
	}
</script>
<style scoped>
	.BigBox {
		text-align: center;
		margin-top: 30px;



		.content-Box {
			width: 100%;
			/* padding-top: 10px; */
			display: flex;
			justify-content: space-between;

			.right-box {
				width: 70%;
				border-left: 4px solid #17191b;
				padding-left: 15px;

				.hotBox,
				.hopeBox,
				.classicBox {
					/* padding-bottom: 10px; */

					.hotBox-topbox {
						display: flex;
						justify-content: space-between;
						color: red;
						font-size: 15px;
						font-weight: 600;
						width: 90%;
						padding-top: 10px;
						align-items: center;
					}

					.img-bigBox {
						display: flex;
						flex-wrap: wrap;

						.img-box:hover {
							box-shadow: 0 0 20px 2px rgba(255, 255, 255, 0.1);
						}

						.img-box {
							margin: 10px;
							width: calc(200px - 15px);

							.top {
								/* position: relative; */

								.overMovie {
									display: flex;
									flex-direction: row;
									justify-content: space-around;
									padding-top: 5px;

									.text {
										/* position: absolute;
										bottom: 13px; */
										color: #b0aeae;
										/* left: 22px; */
										white-space: nowrap;
										overflow: hidden;
										text-overflow: ellipsis;
										font-size: 14px;

									}

									.score {
										/* position: absolute; */
										/* right: 20px; */
										/* bottom: 13px; */
										color: #ffb400;
										font-weight: 600;
										font-size: 14px;
										padding-top: 2.5px;
									}
								}


							}

							.bottom {
								height: 40px;

								.text {
									line-height: 40px;
									align-items: center;
									color: #ef4238;
								}
							}

							.bottom:hover {
								background-color: #cccccc
							}



						}
					}
				}
			}

			.left-box {
				flex: 1;
				position: sticky;
				top: 125px;
				height: 60vh;
				padding-right: 10px;


				.top-ten-list {
					/* background-color: #e8eaed; */
					/* 浅灰背景 */
					padding: 20px;
					border-radius: 5px;
					box-shadow: 0 0 2px 4px rgba(246, 246, 246, 0.1);


					/* 轻微阴影 */
					.list-title {
						color: #e8eaed;

						font-size: larger;
						font-weight: 600;
						margin-bottom: 15px;
					}

					.list-items {
						/* list-style: decimal; */
						padding: 0;
						margin: 0;
						display: flex;
						flex-direction: column;

						:hover {
							box-shadow: 0 0 2px 4px rgba(246, 246, 246, 0.1);
							transition: all 0.3s ease;
						}

						li {
							margin-bottom: 10px;
							font-style: italic;

							.list-items-title {
								text-decoration: none;
								color: #0066cc;
								/* 蓝色链接 */
								font-size: 1em;
							}
						}


					}

					.more-link {
						position: fixed;
						left: 260px;
						padding-top: 38px;
						text-decoration: none;
						color: #ae9393;
						font-weight: bold;
						font-size: small;

					}


				}







			}
		}
	}
</style>
<style>
	.fp-warning,
	.fp-watermark {
		bottom: -50px;
	}
</style>
