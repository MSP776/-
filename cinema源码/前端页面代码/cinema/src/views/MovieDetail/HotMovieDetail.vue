<template>
	<div class="HotFilm-Bigbox">
		<div class="leftBox">
			<van-image lazy-load :src="currentFilmData.big_image" />
			<van-button color="linear-gradient(to right, rgb(186 87 60), rgb(208 33 53))"
				@click="toCinema(currentFilmData.movie_id)">特惠购票</van-button>
		</div>
		<div class="rightBox">
			<div class="middle-BOX">
				<div class="title">{{currentFilmData.title}}</div>
				<div class="actor"><span>主演：{{currentFilmData.actor}}</span></div>
				<div class="tiime"><span>上映时间：{{currentFilmData.time}}</span></div>
				<div class="detail"><span>剧情简介：{{currentFilmData.detail}}</span></div>
			</div>

		</div>
	</div>
</template>

<script setup>
	import {
		useRoute,
		useRouter
	} from 'vue-router';
	const Route = useRoute();
	const Router = useRouter();
	let hotFilm = JSON.parse(localStorage.getItem("HotMovielistData"))
	let currentFilmData = hotFilm.find(item => item.movie_id == Route.query.movieId)
	// console.log(currentFilmData);
	let toCinema = (movieId) => {
		Router.push({
			path: '/cinema',
			query: {
				movieId
			}
		})
	}
</script>

<style scoped>
	body {
		background-color: #24282f;
	}

	.HotFilm-Bigbox {
		height: 100vh;
		/* margin-top: 30px; */
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		.leftBox {
			/* width: 40%; */
			display: flex;
			flex-direction: column;
			justify-content: center;

			.van-image {
				width: 192px;
				height: 264px;
				/* margin-bottom: 5px; */

			}

			.van-button--normal:hover {
				box-shadow: 0 0 20px 2px rgba(255, 255, 255, 0.1);
			}


		}

		.rightBox {
			/* flex: 1; */
			width: 70%;
			margin-left: 20px;

			.middle-BOX {
				color: #d0d0d0;


				div {
					padding: 8px 18px;
					font-size: 14px;
				}

				.title {
					font-size: 26px;
					font-weight: 600;
				}

				.actor {}

				.detail {
					span {
						line-height: 26px;
					}
				}
			}


		}
	}
</style>
