<template>
	<!-- 选择观影时间页面 -->
	<div class="Select-BigBox">
		<div class="Select-BigBox-topBox">
			<div class="left-box">
				<van-image lazy-load :src="require('../assets/cinema.png')" />
			</div>
			<div class="right-box">
				<div class="top-cinema-name">{{currentCinemaData.cinema_name}}</div>
				<div class="cinema-address">地址：{{currentCinemaData.specified_address}}</div>
				<div class="phone">电话：{{currentCinemaData.cinema_phone}}</div>
				<div class="cinema-tags">
					<span>影院服务</span>
					<div class="cinema-tags-item">
						<span class="tag">退</span>
						<p class="desc">未取票用户放映前30分钟可退票</p>
					</div>
					<div class="cinema-tags-item">
						<span class="tag">改签</span>
						<p class="desc">未取票用户放映前30分钟可改签</p>
					</div>
					<div class="cinema-tags-item">
						<span class="tag">儿童优惠</span>
						<p class="desc">1.3米以下儿童仅限普通厅免票无座，一位成人限带一名儿童</p>
					</div>
				</div>
			</div>
		</div>


		<div class="Select-BigBox-content-Box">
			<swiper :initialSlide="sliderIndex" @swiper="setSwiperRef" @slideChange="onSlideChange"
				:effect="'coverflow'" :navigation="true" :grabCursor="true" :centeredSlides="true"
				:slidesPerView="'auto'" :coverflowEffect="{
			      rotate: 50,
			      stretch: 0,
			      depth: 100,
			      modifier: 1,
			      slideShadows: true,
			    }" :modules="modules" class="mySwiper">
				<swiper-slide v-for="(item,index) in hotFilm" :key="index" @click="setActiveSlide(index)">
					<van-image :src="item.big_image" />
				</swiper-slide>

			</swiper>

			<div class="show-list">
				<div class="movie-info">
					<div class="movie-info-top">
						<span id="top-title">{{state.currentMovieData.title}}</span>
						<span id="top-score">{{state.currentMovieData.score}}</span>
					</div>
					<div class="movie-info-bottom">
						<div id="LEFT">
							<span class="key">上映时间：</span>
							<span class="value">{{state.currentMovieData.time}}</span>
						</div>
						<div id="RIGHT">
							<span class="key">主演：</span>
							<span class="value">{{state.currentMovieData.actor}}</span>
						</div>

					</div>
				</div>
				<div class="show-date">
					<span class="show-data-left">观影时间：</span>
					<span class="data-item" v-for="(item,index) in state.uniqueDateList" :key="index"
						:class="{active: state.dataIndex == index}" @click="changeActive(index)">{{item}}</span>
					<!-- 					<span class="data-item" :class="{active: state.dataIndex == '1'}"
						@click="changeActive('1')">明天1月2</span> -->
				</div>
				<div class="plist-container">
					<table class="plist" v-if="state.currentScheduleBox.length>0">
						<thead>
							<tr>
								<th>放映时间</th>
								<th>语言版本</th>
								<th>放映厅</th>
								<th>售价（元）</th>
								<th>选座购票</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in state.currentScheduleBox" :key="index">
								<td>
									<span class="begin-time">{{item.beginTime}}</span>
									<br>
									<span class="end-time">{{item.endTime}}散场</span>
								</td>
								<td><span class="lang">{{item.language}}</span></td>
								<td><span class="hall">{{item.hall_name}}</span></td>
								<td><span class="sell-price">{{item.price}}</span></td>
								<td>
									<van-button color="linear-gradient(to right, rgb(186 87 60), rgb(208 33 53))"
										class="buy-btn normal"
										@click="toSeat(item.schedule_id,Route.query.cinemaId,state.currentMovieData.movie_id)"
										style="color: #eaeaea;">选座购票
									</van-button>
								</td>
							</tr>
						</tbody>
					</table>

					<div class="finished-all-shows" v-if="state.currentScheduleBox.length === 0">
						<span class="finish-img"></span>
						<br>
						<span class="finish-text">暂未放映</span>
					</div>

				</div>
			</div>




		</div>

	</div>
</template>

<script setup>
	import {
		useRoute,
		useRouter
	} from 'vue-router';
	import {
		register
	} from 'swiper/element/bundle';
	import {
		Swiper,
		SwiperSlide
	} from 'swiper/vue';
	import 'swiper/css';
	import 'swiper/css/effect-coverflow';
	import 'swiper/css/navigation';
	import {
		EffectCoverflow,
		Navigation
	} from 'swiper/modules';

	import {
		reactive
	} from 'vue';
	register();
	const modules = [EffectCoverflow, Navigation];
	const Route = useRoute();
	let sliderIndex = Route.query.movieId ? Number(Route.query.movieId - 1) : 0; // 接收跳转过来的movieId
	const Router = useRouter();
	let cinemaList = JSON.parse(localStorage.getItem("cinemaListData"));
	let currentCinemaData = cinemaList.find(item => item.cinema_id == Route.query.cinemaId) // 查找对应的电影院信息
	let hotFilm = JSON.parse(localStorage.getItem("HotMovielistData"))
	let BigscheduleList = JSON.parse(localStorage.getItem("schedulelistData"))
	let scheduleList = BigscheduleList.filter(item => item.cinema_id == Route.query.cinemaId) // 当前影院排场表 all
	const state = reactive({
		// scheduleId:
		movieId: Route.query.movieId,
		currentMovieData: hotFilm[sliderIndex],
		dataIndex: 0,
		currentMovie_schedule: scheduleList.filter(item => item.movie_id == hotFilm[sliderIndex]
			.movie_id), // 当前影院当前电影的排场表
		uniqueDateList: [...new Set((scheduleList.filter(item => item.movie_id == hotFilm[sliderIndex].movie_id))
			.map(
				datalist => datalist
				.show_date))], // 获取一部电影排场日期（唯一）
		currentScheduleBox: (scheduleList.filter(item => item.movie_id == hotFilm[sliderIndex].movie_id)).filter(
			item => item
			.show_date == [...new Set((scheduleList.filter(item => item.movie_id == hotFilm[sliderIndex]
				.movie_id)).map(
				datalist => datalist
				.show_date))][0]) //  当前影院当前电影当天的排场
	})
	// console.log(state.currentScheduleBox);
	// 设置活动幻灯片
	let swiperRef = null;
	const setSwiperRef = (swiper) => { // 获取swiper实例
		swiperRef = swiper;
	};
	const setActiveSlide = (index) => { // 跳转幻灯片
		swiperRef.slideTo(index, 0);

	};
	const onSlideChange = (swiperRef) => { // 监听幻灯片下标
		state.currentMovieData = hotFilm[swiperRef.activeIndex]
		state.currentMovie_schedule = scheduleList.filter(item => item.movie_id == state.currentMovieData.movie_id)
		// console.log(state.currentMovie_schedule);
		state.uniqueDateList = [...new Set((state.currentMovie_schedule)
			.map(
				datalist => datalist
				.show_date))];
		// console.log(state.uniqueDateList);

		changeActive(0) // 置于当天	
	}

	const changeActive = (index) => { // 切换购票日期
		state.dataIndex = index;
		// console.log(state.uniqueDateList[index]);
		state.currentScheduleBox = (state.currentMovie_schedule).filter(item => item.show_date == state.uniqueDateList[
			index])
	};

	let toSeat = (scheduleId, cinemaId, movieId) => {
		Router.push({
			path: '/seat',
			query: {
				scheduleId,
				cinemaId,
				movieId
			}
		})
	}
</script>

<style scoped>
	.Select-BigBox {
		/* height: 220vh; */
		margin-top: 60px;
		background-color: #24282f;
		padding: 0 20px;

		.Select-BigBox-topBox {
			/* background: #392f59 url('../assets/back.png') no-repeat 50%; */

			display: flex;
			justify-content: center;
			padding-top: 20px;

			.left-box {
				margin-right: 50px;
				padding-top: 10px;

				.van-image {
					border: 4px solid #fff;
					width: 200px;
					height: 200px;
				}
			}

			.right-box {
				margin-left: 20px;
				color: #e7e7e7;
				/* padding-top: 20px; */

				.top-cinema-name {
					margin-bottom: 10px;
					font-size: 16px;
					/* color: #c8bcbc; */
				}

				.cinema-address {
					line-height: 14px;
					margin-bottom: 10px;
					/* color: #999; */
					font-size: 14px;
				}

				.phone {
					font-size: 14px;
				}

				.cinema-tags {
					padding-top: 20px;

					.cinema-tags-item {
						/* display: flex; */
						font-size: 12px;

						.tag {
							border: 1px solid hsla(0, 0%, 100%, .6);
							/* border: 0.7px solid #509fc9; */
							border-radius: 2px;
							display: inline-block;
							min-width: 60px;
							text-align: center;
						}

						.desc {
							display: inline-block;
							margin-left: 10px;
						}
					}
				}
			}
		}

		.Select-BigBox-content-Box {


			.swiper {
				width: 100%;
				padding-top: 30px;
				padding-bottom: 50px;

				.swiper-slide {
					background-position: center;
					background-size: cover;
					width: 280px;

					padding-left: 50px;


					.van-image {
						display: block;
						width: 180px;
						height: 250px;
						border-radius: 5px;
					}


				}

			}

			.show-list {
				.movie-info {
					border-bottom: 1px solid #5e5959;

					.movie-info-top {
						display: flex;
						align-items: center;

						#top-title {
							color: #cccccc;
							font-size: 26px;

						}

						#top-score {
							color: #ffb400;
							font-size: 24px;
							padding-left: 20px;
						}

						#top-score:after {
							content: "分";
							font-size: 12px;
						}

					}

					.movie-info-bottom {
						display: flex;
						font-size: 14px;
						padding: 20px 0;

						#LEFT {
							padding-right: 50px;
						}

						.key {

							color: #999999;
						}

						.value {
							color: #cccccc;
						}
					}
				}

				.show-date {
					font-size: 14px;
					padding: 30px 0;

					.show-data-left {
						color: #999;

					}

					.data-item {
						color: #cccccc;
						padding: 2px 10px;
						margin-left: 12px;
						border-radius: 100px;
					}

					.data-item.active {
						background-color: #c02b26;
					}
				}

				.plist-container {


					.plist {
						width: 100%;
						/* color: #fff; */

						thead {
							font-size: 16px;
							color: #c6c6c6;

							tr {


								th {}
							}
						}

						tbody {
							tr {
								height: 82px;

								td {
									text-align: center;
									width: 20%;

									.begin-time {
										font-size: 18px;
										font-weight: 700;
										color: #c6c6c6;
									}

									.end-time {
										font-size: 12px;
										color: #999999;
									}

									.lang {
										color: #a8a8a8;
										font-size: 14px;
									}

									.hall {
										color: #a8a8a8;
										font-size: 14px;
									}

									.sell-price {
										color: #e03a34;
										font-size: 16px;
										font-family: mtsi-font;
										font-weight: 600;
									}

									.sell-price:before {
										content: "\FFE5";
										font-size: 12px;
									}

									.buy-btn {
										font-size: 14px;
										border-radius: 20px;
										height: 35px;
									}

									.buy-btn:hover,
									.buy-btn:focus {
										box-shadow: 0 2px 10px -2px #f03d37;
									}
								}
							}
						}
					}

					.finished-all-shows {
						width: 100%;
						padding: 50px 0;
						/* background-color: #f9f9f9; */
						text-align: center;

						.finish-img {
							background: url('../assets/finish.png') no-repeat;
							display: inline-block;
							width: 90px;
							height: 100px;
							margin-bottom: 10px;
						}

						.finish-text {
							font-size: 20px;
							color: #999;
						}
					}
				}
			}
		}


	}



	.swiper-slide-active {
		.van-image {
			border: 3px solid #cc938d;
		}
	}
</style>
<style>
	.swiper-3d {

		.swiper-button-prev,
		.swiper-button-next {
			color: #fff;
		}

		.swiper-wrapper {
			.swiper-slide {
				.swiper-slide-shadow-coverflow {
					background-image: none !important;
					/* 移除阴影效果 */
				}
			}
		}
	}
</style>
