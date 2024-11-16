<template>
	<div class="MyBox">
		<div class="order-container">
			<div class="profile-title">我的订单</div>
			<div class="no-order" v-if="orderList==0">暂时没有订单噢</div>
			<div class="order-box" v-if="orderList">
				<div class="order-body" v-for="(item,index) in orderList " :key="index">
					<div class="poster">
						<van-image lazy-load :src="item.image" width="80px" height="110px" />
					</div>
					<div class="order-content">
						<div class="movie-name">《{{item.movie_name}}》</div>
						<div class="cinema-name">{{item.cinema_name}}</div>
						<div class="hall-ticket">
							<span>{{item.hall_name}}&nbsp;</span>
							<div class="seat">
								<span
									v-for="(seat,index) in ((item.seats).match(/\[\d+,\d+\]/g).map(item => JSON.parse(item)))">
									{{seat[0]}}排{{seat[1]}}座
								</span>
							</div>


						</div>
						<div class="show-time">{{item.date_time}} {{item.begin_time}}</div>
					</div>
					<div class="order-price">{{item.price}}</div>
					<div class="order-status">已完成</div>
				</div>


			</div>
		</div>
	</div>
</template>

<script>
	import {
		getOrderData
	} from '../api/request.js'
	import {
		reactive,
		onMounted,
		toRefs
	} from 'vue';

	export default {
		setup() {
			let state = reactive({
				orderList: []
			})

			let getOrderList = () => {
				let userid = sessionStorage.getItem("userid")
				getOrderData({
					userid
				}).then(res => {
					state.orderList = res.data.orderList
					// console.log(state.orderList);
					if (state.orderList > 0) {
						let arr = (state.orderList[0].seats).match(/\[\d+,\d+\]/g).map(item => JSON.parse(
							item));
					}


				})
			}

			onMounted(() => {
				getOrderList()
			})

			return {
				...toRefs(state)
			};
		}
	};
</script>

<style scoped>
	.MyBox {
		height: 90vh;
		margin-top: 60px;
		margin-left: 20px;
		margin-right: 20px;

		.order-container {
			color: #fff;
			padding-top: 20px;
			display: flex;
			flex-direction: column;
			/* align-items: center; */
			width: 100%;


			.profile-title {
				font-size: 18px;
				color: orangered;
				font-weight: 600;
				/* padding: 10px 40px; */
			}

			.no-order {
				padding-top: 20px;
				color: #a6a6a6;
				font-size: 18px;
			}

			.order-box {
				/* border: 1px solid #fff; */
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				/* justify-content: space-between; */

				.order-body {
					width: 50%;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;
					/* width: 79%; */
					padding: 20px 0 0 0;
					color: #999;

					.poster {
						/* padding: 0 20px; */

					}

					.order-content {

						/* padding: 0 20px; */
						font-size: 14px;

						.movie-name {
							padding-bottom: 8px;
							font-size: 18px;
							color: #c4c4c4;
							font-weight: 600;
						}

						.cinema-name {
							padding-bottom: 8px;
						}

						.hall-ticket {
							padding-bottom: 8px;
							display: flex;


							.seat {
								/* width: 50%; */
							}

							span {
								/* padding: 0 5px; */
							}
						}

						.show-time {
							color: #c45858;
						}
					}
				}
			}

			.order-price {
				padding: 0 20px;
			}

			.order-price:before {
				content: "\FFE5";
			}

			.order-status {
				padding: 0 20px;
			}
		}

	}
</style>
