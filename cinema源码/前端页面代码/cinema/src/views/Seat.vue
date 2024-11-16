<template>
	<!-- 选座 -->
	<div class="Seat-Bigbox">
		<div class="main-clearfix">
			<div class="hall">
				<div class="seat-example">
					<div class="selectable-example example">
						<van-image lazy-load :src="require('../assets/seat-unselected.png')" />
						<span class="example-text">可选座位</span>
					</div>
					<div class="sold-example example">
						<van-image lazy-load :src="require('../assets/seat-sold.png')" />
						<span class="example-text">已售座位</span>
					</div>
					<div class="selected-example example">
						<van-image lazy-load :src="require('../assets/seat-selected.png')" />
						<span class="example-text">已选座位</span>
					</div>
					<div class="couple-example example">
						<van-image lazy-load :src="require('../assets/seat-love.png')" />
						<span class="example-text">情侣座位</span>
					</div>
				</div>
				<div class="seats-block">
					<div class="screen">
						<van-image lazy-load :src="require('../assets/screen.png')" />
						<span>银幕中央</span>
					</div>
					<div class="seats">
						<div class="seat" v-for="seat in seats" :key="seat.row+'-'+seat.col" @click="selectSeat(seat)">
							<van-image lazy-load :src="require('../assets/seat-unselected.png')"
								v-if="!seat.isSelected&&!seat.isSold" />
							<van-image lazy-load :src="require('../assets/seat-selected.png')"
								v-if="seat.isSelected && !seat.isSold" />
							<van-image lazy-load :src="require('../assets/seat-sold.png')" v-if="seat.isSold" />
						</div>

					</div>
					<!-- <div class="selected-info">
						<div v-for="seat in selectedSeats" :key="seat.row+'-'+seat.col">
							选了{{ seat.row }}排{{ seat.col }}座，价格{{ seat.price }}
						</div>
					</div> -->
				</div>
			</div>
			<div class="side">
				<div class="movie-info">
					<van-image lazy-load :src="movieinfoBox[0].image" />
					<div class="content">
						<p class="name">{{movieinfoBox[0].title}}</p>
						<div class="info-item">
							<span class="key">评分：</span>
							<span class="value"
								style="color: #ffb400; font-size: 16px;">{{movieinfoBox[0].score}}</span>
						</div>
						<div class="info-item">
							<span class="key">上映时间：</span>
							<span class="value">{{movieinfoBox[0].time}}</span>
						</div>
					</div>
				</div>
				<div class="show-info">
					<div class="info-items">
						<span class="key">影院 : </span>
						<span class="value">{{cinemaName}}</span>
					</div>
					<div class="info-items">
						<span class="key">影厅 : </span>
						<span class="value">{{showinfoBox[0].hall_name}}</span>
					</div>
					<div class="info-items">
						<span class="key">版本 : </span>
						<span class="value">{{showinfoBox[0].language}}</span>
					</div>
					<div class="info-items">
						<span class="key">场次 : </span>
						<span class="value" style="color: #d44945;">{{showinfoBox[0].show_date}}
							{{showinfoBox[0].beginTime}}</span>
					</div>
					<div class="info-items">
						<span class="key">票价 : </span>
						<span class="value">￥{{showinfoBox[0].price}}/张</span>
					</div>
				</div>
				<div class="ticket-info">
					<div class="no-ticket" v-if="selectedSeats==0">
						<span class="buy-limit">座位：一次最多选4个座位</span>
						<span class="no-selected">请<span style="color: #d44945;">点击左侧</span>座位图选择座位</span>
					</div>
					<div class="has-ticket" v-if="selectedSeats!=0">
						<span class="text">座位：</span>
						<div class="ticket-container">
							<span class="ticket" v-for="(item,index) in selectedSeats" :key="index">
								{{item.row}}排{{item.col}}座
							</span>
						</div>
					</div>
					<div class="total-price">
						<span>总价：</span>
						<span class="price">{{total_price}}</span>
					</div>
				</div>
				<div class="confirm-order">
					<van-button color="linear-gradient(to right, rgb(186 87 60), rgb(208 33 53))" class="confirm-btn"
						style="color: #eaeaea;" disabled v-if="selectedSeats==0">选座购票
					</van-button>
					<van-button color="linear-gradient(to right, rgb(186 87 60), rgb(208 33 53))" class="confirm-btn"
						style="color: #eaeaea;" v-if="selectedSeats!=0" @click="toSubmitOrder()">选座购票
					</van-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		reactive,
		toRefs
	} from 'vue';
	import {
		useRoute,
		useRouter
	} from 'vue-router';
	import {
		Dialog
	} from "vant";

	export default {
		setup() {
			let Route = useRoute();
			let Router = useRouter();
			// const VanDialog = Dialog.Component;
			// console.log(Route.query.scheduleId);
			// 响应式数据
			const state = reactive({
				seats: [], // 座位数组
				selectedSeats: [], // 已选座位
				maxSeats: 4, // 最多选择座位数
				soldSeats: (((JSON.parse(localStorage.getItem("schedulelistData"))).filter(item => item
					.schedule_id == Route.query.scheduleId))[0].seat_info), // 获取已售座位
				movieinfoBox: (JSON.parse(localStorage.getItem("HotMovielistData"))).filter(item => item
					.movie_id == Route.query.movieId),
				showinfoBox: (JSON.parse(localStorage.getItem("schedulelistData"))).filter(item => item
					.schedule_id == Route.query.scheduleId),
				cinemaName: ((JSON.parse(localStorage.getItem("cinemaListData"))).filter(item => item
					.cinema_id == Route.query.cinemaId))[0].cinema_name,
				total_price: 0
			});
			// 初始化座位
			const initSeats = () => {
				if (state.soldSeats) { // 存在已售座位
					let arrays = ((state.soldSeats).match(/\[(.*?)\]/g)).map(item => {
						return JSON.parse(item);
					});
					for (let i = 0; i < 7; i++) {
						for (let j = 0; j < 12; j++) {
							if ((arrays.filter(item => item.every((val, index) => val === [i + 1, j + 1][index])))
								.length >
								0) {
								state.seats.push({
									row: i + 1,
									col: j + 1,
									price: state.showinfoBox[0].price,
									isSelected: false,
									isSold: true
								});
							} else {
								state.seats.push({
									row: i + 1,
									col: j + 1,
									price: state.showinfoBox[0].price,
									isSelected: false,
									isSold: false
								});
							}

						}
					}

				} else { // 座位均未售出
					for (let i = 0; i < 7; i++) {
						for (let j = 0; j < 12; j++) {
							state.seats.push({
								row: i + 1,
								col: j + 1,
								price: state.showinfoBox[0].price,
								isSelected: false,
								isSold: false
							});
						}

					}
				}



				// console.log(state.seats);
			};


			const selectSeat = (seat) => {
				if (!seat.isSold) {
					if (!seat.isSelected) { // 选择座位
						if (state.selectedSeats.length >= state.maxSeats) { // 选择超出四个座位
							Dialog.alert({
								message: '一次最多购买4张票',
								theme: 'round-button',
							}).then(() => {
								// on close
							});
						} else {
							seat.isSelected = true;
							state.selectedSeats.push(seat);
							state.total_price = state.total_price + state.seats[0].price // 计算总price
							// console.log(state.selectedSeats);
						}

					} else { // 取消选择
						seat.isSelected = false;
						state.selectedSeats = state.selectedSeats.filter(item => item != seat)
						state.total_price = state.total_price - state.seats[0].price // 计算总price
					}
				}
			};

			// 初始化座位
			initSeats();

			const toSubmitOrder = () => {
				sessionStorage.setItem("selectSeats", JSON.stringify(state.selectedSeats))
				const params = {
					scheduleId: Route.query.scheduleId,
					cinemaId: Route.query.cinemaId,
					movieId: Route.query.movieId,
					movieName: state.movieinfoBox[0].title,
					showData: state.showinfoBox[0].show_date,
					beginTime: state.showinfoBox[0].beginTime,
					cinemaName: state.cinemaName,
					hallName: state.showinfoBox[0].hall_name,
					totalPrice: state.total_price,
					image: state.movieinfoBox[0].image

				}
				Router.push({
					name: 'order',
					state: {
						params,
					}
				})
			}

			// 将响应式数据转换为引用
			return {
				...toRefs(state),
				selectSeat,
				toSubmitOrder
			};
		}
	};
</script>

<style scoped>
	.Seat-Bigbox {
		height: 100vh;
		background-color: #24282f;
		margin-top: 60px;
		padding: 0 20px;

		.main-clearfix {
			display: flex;
			flex-direction: row;


			.hall {
				/* padding-top: 20px; */
				width: 70%;

				.seat-example {
					padding: 30px 0;
					display: flex;
					flex-direction: row;
					justify-content: center;

					.example-text {
						font-size: 16px;
						color: #828282;
						padding: 0 8px;
					}

					.example {
						padding: 0 20px;
						display: flex;
						justify-content: center;
					}

					.selectable-example {}

					.sold-example {}

					.selected-example {}

					.couple-example {}
				}

				.seats-block {
					display: flex;
					flex-direction: column;
					align-items: center;

					.screen {
						padding-bottom: 50px;
						display: flex;
						flex-direction: column;
						align-items: center;
						color: #aca6a6;
						font-size: 16px;

						span {
							padding-top: 20px;
						}
					}

					.seats {
						/* flex: 1; */
						width: 55%;
						display: grid;
						grid-template-columns: repeat(12, 0.1fr);


						.seat {
							/* border: 1px solid #ddd; */
							padding: 2px;
							text-align: center;
							cursor: pointer;
						}
					}
				}
			}

			.side {
				flex: 1;
				padding: 30px 0;

				.movie-info {
					display: flex;
					/* align-items: center; */

					.van-image {
						width: 115px;
						height: 158px;
					}

					.content {
						padding-left: 20px;

						.name {
							font-size: 20px;
							font-weight: 700;
							color: #bcbbbb;
						}

						.info-item {
							font-size: 12px;
							padding: 3px 0;

							.key {
								color: #999999;
							}

							.value {
								color: #cccccc;
							}
						}
					}
				}

				.show-info {
					padding-top: 10px;

					.info-items {
						font-size: 14px;
						padding: 5px 0;

						.key {
							color: #999999;
						}

						.value {
							color: #cccccc;
							padding-left: 5px;
						}
					}
				}

				.ticket-info {
					padding: 20px 0 10px;
					border-top: 1px solid #463f3f;
					border-bottom: 1px solid #463f3f;

					.no-ticket {
						display: flex;
						flex-direction: column;
						font-size: 14px;
						margin-bottom: 10px;

						.buy-limit {
							color: #999999;

						}

						.no-selected {
							padding: 20px 0;
							text-align: center;
							color: #cccccc;
						}
					}

					.has-ticket {
						display: flex;
						align-items: center;
						margin-bottom: 20px;

						.text {
							color: #999999;
							font-size: 14px;
						}

						.ticket-container {
							.ticket {
								background: url("../assets/seat-buy.png") no-repeat;
								display: inline-block;
								width: 60px;
								line-height: 30px;
								font-size: 12px;
								text-align: center;
								color: #d44945;
								margin: 0 4px;
							}
						}
					}

					.total-price {
						display: flex;
						align-items: center;

						span {
							color: #999999;
							font-size: 14px;
						}

						.price {
							color: #d44945;
							font-size: 24px;
						}

						.price:before {
							content: "\FFE5";
							font-size: 14px;
						}
					}
				}

				.confirm-order {
					margin-top: 20px;
					display: flex;
					flex-direction: column;
					align-items: center;

					.confirm-btn {

						width: 50%;
						font-size: 14px;
						border-radius: 20px;
						height: 35px;

					}
				}
			}
		}
	}

	.seats-block {}
</style>
