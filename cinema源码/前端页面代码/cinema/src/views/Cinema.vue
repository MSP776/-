<template>
	<!-- 影院页面 -->
	<div class="Cinema-Box">
		<div class="Cinema-Box-HotFilm-Bigbox" v-if="Route.query.movieId!=null">
			<div class="Cinema-Box-HotFilm-Bigbox-leftBox">
				<van-image lazy-load :src="currentFilmData.big_image" />

			</div>
			<div class="Cinema-Box-HotFilm-Bigbox-rightBox">
				<div class="content-BOX">
					<div class="title">{{currentFilmData.title}}</div>
					<div class="actor"><span>主演：{{currentFilmData.actor}}</span></div>
					<div class="tiime"><span>上映时间：{{currentFilmData.time}}</span></div>
					<div class="middle-BOX-button">
						<van-button color="linear-gradient(to right, rgb(186 87 60), rgb(208 33 53))"
							@click="toMovieDetail(currentFilmData.movie_id)" style="color: #eaeaea;">查看更多电影详情
						</van-button>
					</div>
				</div>
			</div>
		</div>

		<div class="cinema-list-BOX">
			<div class="top-box"><span>影院列表</span></div>
			<div class="cinema-list-smallBox" v-for="(item,index) in cinemaList" :key="index">
				<div class="content-box">
					<div class="cinemaList-box-left">
						<div class="top-cinema-name">{{item.cinema_name}}</div>
						<div class="cinema-address">地址：{{item.specified_address}}</div>
						<div class="cinema-tags">
							<div class="cinema-tags-item">改签</div>
							<div class="cinema-tags-item">折扣卡</div>
							<div class="cinema-tags-item">IMAX厅</div>
						</div>
					</div>
					<div class="button-buy-right">
						<van-button color="linear-gradient(to right, rgb(186 87 60), rgb(208 33 53))"
							@click="toSelectTime(item.cinema_id,currentFilmData.movie_id)" style="color: #eaeaea;"
							v-if="Route.query.movieId!=null">选座购票</van-button>
						<van-button color="linear-gradient(to right, rgb(186 87 60), rgb(208 33 53))"
							style="color: #eaeaea;" @click="toSelectTime(item.cinema_id)"
							v-if="Route.query.movieId==null">选座购票</van-button>
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
		getCinemalist
	} from '../api/request.js'


	const Route = useRoute();
	const Router = useRouter();
	// console.log('Route', Route.query.id);
	let hotFilm = JSON.parse(localStorage.getItem("HotMovielistData"))
	let cinemaList = JSON.parse(localStorage.getItem("cinemaListData"))
	let currentFilmData = hotFilm.find(item => item.movie_id == Route.query.movieId)
	// console.log(currentFilmData);
	let toMovieDetail = (movieId) => {
		Router.push({
			path: '/hotfilm',
			query: {
				movieId
			}
		})
	}

	let toSelectTime = (cinemaId, movieId) => {
		Router.push({
			path: '/cinemas',
			query: {
				cinemaId,
				movieId
			}
		})
	}
</script>

<style scoped>
	body {
		background-color: #24282f;
	}

	.Cinema-Box {
		margin-top: 60px;

		.Cinema-Box-HotFilm-Bigbox {
			height: 50vh;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;

			.Cinema-Box-HotFilm-Bigbox-leftBox {
				padding: 0 20px;

				.van-image {
					width: 192px;
					height: 264px;
				}
			}

			.Cinema-Box-HotFilm-Bigbox-rightBox {
				padding: 0 20px;

				.content-BOX {
					color: #d0d0d0;

					.middle-BOX-button {
						padding-top: 10px;

						.van-button--normal:hover {
							box-shadow: 0 0 20px 2px rgba(255, 255, 255, 0.1);
						}
					}



					div {
						font-size: 14px;
						line-height: 36px;
					}

					.title {
						font-size: 22px;
						font-weight: 600;
					}

					.actor {}


				}


			}
		}

		.cinema-list-BOX {
			color: #fff;
			margin: 0 30px;

			.top-box {
				color: #e87e53;
				font-size: 18px;
				font-weight: 600;
			}

			.cinema-list-smallBox {
				border-bottom: 1px solid #605b5b;
				padding: 20px 0;

				.content-box {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.cinemaList-box-left {
						.top-cinema-name {
							margin-bottom: 10px;
							font-size: 16px;
							color: #c8bcbc;
						}

						.cinema-address {
							line-height: 14px;
							margin-bottom: 10px;
							color: #999;
							font-size: 14px;
						}

						.cinema-tags {
							display: flex;
							font-size: 12px;

							.cinema-tags-item {
								border: 0.7px solid #509fc9;
								color: #509fc9;
								border-radius: 3px;
								padding: 0 2px;
								margin-right: 8px;
							}
						}
					}

					.button-buy-right {


						.van-button--normal {
							border-radius: 20px;
							height: 35px;
						}

						.van-button--normal:hover {
							box-shadow: 0 2px 10px -2px #f03d37;
						}
					}
				}
			}


		}
	}
</style>
