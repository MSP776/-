<template>
	<!-- 电影页面 -->
	<div class="Movie-bigBox">
		<full-page ref="fullpage" :options="option">
			<div class="section">
				<div class="Movie-bigBox-Box">
					<div class="Movie-bigBox-smallBox" v-for="(item,index) in HotData" :key="index">
						<div class="movie-item" @click="toHotDetail(item.movie_id)">
							<van-image lazy-load :src="item.image" alt=""
								style="width: 136px; height: 187px;border-radius: 10px;" />
						</div>
						<div class="movie-item-title">
							{{item.title}}
						</div>
						<div class="movie-item-score">
							{{item.score}}
						</div>
					</div>
				</div>
				<div class="pageButton">
					<button @click="HotprevPage" :disabled="HotcurrentPage === 1">上一页</button>
					<button @click="HotnextPage" :disabled="HotcurrentPage === HotpageCount">下一页</button>
				</div>
			</div>
			<div class="section">
				<div class="Movie-bigBox-Box">
					<div class="Movie-bigBox-smallBox" v-for="(item,index) in HopeData" :key="index">
						<div class="movie-item" @click="toHopeDetail(item.movie_id)">
							<van-image lazy-load :src="item.image" alt=""
								style="width: 136px; height: 187px;border-radius: 10px;" />
						</div>
						<div class="movie-item-title">
							{{item.title}}
						</div>
						<div class="movie-item-time"
							style="font-size: 14px;color: rgb(194 144 144);font-style: italic;">
							{{item.time}}
						</div>
					</div>
				</div>
				<div class="pageButton">
					<button @click="HopeprevPage" :disabled="HopecurrentPage === 1">上一页</button>
					<button @click="HopenextPage" :disabled="HopecurrentPage === HopepageCount">下一页</button>
				</div>
			</div>
			<div class="section">
				<div class="Movie-bigBox-Box">
					<div class="Movie-bigBox-smallBox" v-for="(item,index) in TopData" :key="index">
						<div class="movie-item" @click="toTopDetail(item.movie_id)">
							<van-image lazy-load :src="item.image" alt=""
								style="width: 136px; height: 187px;border-radius: 10px;" />
						</div>
						<div class="movie-item-title">
							{{item.title}}
						</div>
						<div class="movie-item-score">
							{{item.score}}
						</div>
					</div>
				</div>
				<div class="pageButton">
					<button @click="TopprevPage" :disabled="TopcurrentPage === 1">上一页</button>
					<button @click="TopnextPage" :disabled="TopcurrentPage === ToppageCount">下一页</button>
				</div>
			</div>
		</full-page>
	</div>

</template>
<script setup>
	import {
		ref,
		computed,
		onMounted
	} from 'vue'
	import {
		usePagination
	} from "../page.js"
	import {
		useRouter
	} from 'vue-router'

	const option = ({
		// 这里是fullPage的配置项
		// 例如设置滚动速度为700毫秒
		scrollingSpeed: 500,
		licenseKey: "OPEN-SOURCE-GPLV3-LICENSE",
		//是否显示导航，默认为false
		navigation: true,
		navigationPosition: 'left',
		navigationTooltips: ["正在热映", "即将上演", "经典影片"],
		// 是否显示当前页面小圆点导航的提示信息，不需要鼠标移上
		showActiveTooltip: true,
	})

	let hotData = JSON.parse(localStorage.getItem("HotMovielistData")) // hot电影
	let hopeData = JSON.parse(localStorage.getItem("HopeMovielistData")) // hope电影
	let classicData = JSON.parse(localStorage.getItem("TopMovielistData")) // top电影

	const Router = useRouter();
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



	const {
		currentPage: HotcurrentPage,
		paginatedData: HotData,
		pageCount: HotpageCount,
		nextPage: HotnextPage,
		prevPage: HotprevPage
	} = usePagination(hotData, 10)

	const {
		currentPage: HopecurrentPage,
		paginatedData: HopeData,
		pageCount: HopepageCount,
		nextPage: HopenextPage,
		prevPage: HopeprevPage
	} = usePagination(hopeData, 10)

	const {
		currentPage: TopcurrentPage,
		paginatedData: TopData,
		pageCount: ToppageCount,
		nextPage: TopnextPage,
		prevPage: TopprevPage
	} = usePagination(classicData, 10)
</script>
<style scoped>
	.Movie-bigBox {
		.Movie-bigBox-Box {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			/* padding: 18px 0 38px 38px; */
			padding-top: 60px;
			padding-left: 30px;
			margin-left: 150px;
			border-left: 4px solid #17191b;

			.Movie-bigBox-smallBox {
				display: flex;
				flex-direction: column;
				padding: 5px 18px;
				width: 160px;
				/* height: 100%; */
				text-align: center;

				.movie-item {
					.van-image:hover {
						box-shadow: 0 0 20px 2px rgba(255, 255, 255, 0.2);
					}


				}

				.movie-item-title {
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					color: #b0aeae;
					padding-bottom: 5px;

					a {
						/* color: #606060; */
						color: #b0aeae
					}
				}

				.movie-item-score {
					color: #FFB400;
					font-style: italic;
					font-size: 20px
				}
			}
		}

		.pageButton {
			display: flex;
			justify-content: center;

			button {
				margin: 0 5px;
				height: 25px;
				font-size: 13px;
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
