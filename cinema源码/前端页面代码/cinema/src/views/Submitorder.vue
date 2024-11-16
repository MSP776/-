<template>
	<div class="submitBigbox">
		<div class="warning">
			请仔细核对场次信息，出票后将
			<span class="attention">无法退票和改签</span>
		</div>
		<div class="order-table-box">
			<table class="order-table">
				<thead>
					<tr>
						<th>影片</th>
						<th>时间</th>
						<th>影院</th>
						<th>座位</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="movie-name">《{{movieName}}》</td>
						<td class="showtime"> {{showData}} {{beginTime}}</td>
						<td class="cinema-name">{{cinemaName}}</td>
						<td class="seat-box">
							<span class="hall">{{hallName}}</span>
							<div class="seats">
								<span class="seat" v-for="(seat,index) in selectedSeats" :key="index">
									<span class="front">{{seat.row}}</span>排<span class="front">{{seat.col}}</span>座
								</span>

							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>


	</div>
	<div class="confirm-buy">
		<div class="buy-box">
			<span class="pay">实际支付：<span class="price">{{totalPrice}}</span></span>
			<van-button color="linear-gradient(to right, rgb(186 87 60), rgb(208 33 53))" class="confirm-btn"
				style="color: #eaeaea;" @click="confirmPay()">确认支付
			</van-button>
		</div>

	</div>
</template>

<script setup>
	import {
		useRoute,
		useRouter
	} from 'vue-router';
	import {
		Dialog,
		Toast
	} from "vant";
	import {
		updateTodoData,
		addOrder
	} from '../api/request.js';

	import {
		watch
	} from 'vue'
	import Color from 'element-plus/es/components/color-picker/src/utils/color';

	let Route = useRoute();
	let Router = useRouter();
	let scheduleId = history.state.params.scheduleId
	let cinemaId = history.state.params.cinemaId
	let movieId = history.state.params.movieId
	let movieName = history.state.params.movieName
	let showData = history.state.params.showData
	let beginTime = history.state.params.beginTime
	let cinemaName = history.state.params.cinemaName
	let hallName = history.state.params.hallName
	let totalPrice = history.state.params.totalPrice
	let image = history.state.params.image
	let selectedSeats = (JSON.parse(sessionStorage.getItem("selectSeats")))
	let userid = sessionStorage.getItem("userid")

	// console.log(selectedSeats);



	const confirmPay = () => {
		let seats = ""
		selectedSeats.map(seat => {
			seats = seats + '[' + seat.row + ',' + seat.col + "]";
		});
		Dialog.confirm({
				// title: '标题',
				message: '确认支付吗',
			})
			.then(() => {
				Toast.success('购票成功');
				addOrder({
					userid,
					image,
					movieName,
					cinemaName,
					hallName,
					seats,
					showData,
					beginTime,
					totalPrice
				}).then(res => {
					// console.log(res.data);
				})



				const updatePromises = selectedSeats.map(seat => {
					const soldSeats = [seat.row, seat.col];
					// console.log(soldSeats);
					return updateTodoData({
						soldSeats,
						scheduleId
					});
				});

				Promise.all(updatePromises)
					.then(responses => {
						console.log('All updates completed:', responses);
						sessionStorage.removeItem("selectSeats");
						localStorage.removeItem("schedulelistData");
						Router.push("/");
					})
					.catch(err => {
						console.log('An error occurred:', err);
						// Handle any error from all promises
					});

			})
			.catch(() => {
				Toast.fail('支付取消');

			});

	}
</script>

<style scoped>
	body {
		background-color: #24282f;

	}

	.submitBigbox {
		/* margin-top: 60px; */
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;

		.warning {
			color: #c6c6c6;
			font-size: 12px;
			padding: 10px 10px 20px 20px;


			.attention {
				color: #ffb400;
				font-size: 14px;
			}
		}

		.order-table-box {
			padding: 0 10px;

			.order-table {
				width: 100%;
				color: #c6c6c6;

				thead {
					font-size: 16px;
					background: #4c4c4c;

					tr {


						th {}
					}
				}

				tbody {
					background: #666666;

					tr {
						height: 82px;

						td {
							text-align: center;
							width: 20%;
						}

						.showtime {
							color: #f27b62;
						}

						.seat-box {

							.hall {
								padding-bottom: 20px;
								font-weight: 600;
							}

							.seats {
								padding-top: 10px;
								font-size: 12px;

								.seat {
									border: 1px solid #e5e5e5;
									padding: 5px 2px;
									text-align: center;

									.front {
										font-size: 14px;
										padding: 0 3px;
									}
								}
							}
						}

					}
				}
			}
		}


	}

	.confirm-buy {
		position: relative;

		.buy-box {


			.pay {
				color: #c6c6c6;
				position: absolute;
				right: 40px;
				bottom: 160px;


				.price {
					color: #f27b62;
					font-size: 26px;
				}

				.price:before {
					content: "\FFE5";
					font-size: 18px;
				}
			}

			.confirm-btn {
				position: absolute;
				right: 15px;
				bottom: 110px;
				width: 15%;
				font-size: 14px;
				border-radius: 20px;
				height: 35px;

			}
		}

	}
</style>
