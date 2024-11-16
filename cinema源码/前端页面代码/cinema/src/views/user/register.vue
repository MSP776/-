<template>
	<div class="BOX">

		<el-form :model="registerForm" class="Middle-box">
			<h2 style="text-align: center;font-size: 2em;font-weight: 600;color: rgb(172 51 42);">Register</h2>
			<el-form-item>
				<el-input placeholder="用户名" v-model="registerForm.username" type="text" prop="username"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input placeholder="密码" v-model="registerForm.password" type="password" prop="password"></el-input>
			</el-form-item>

			<el-form-item>
				<el-input placeholder="验证码" v-model="captchaInput"></el-input>

				<!-- <div v-html="captchaUrl" @click="Captcha"></div> -->
			</el-form-item>
			<el-form-item v-html="captchaUrl" @click="Captcha" style="margin-top: 10px;"></el-form-item>
			<div class="bottom-box">
				<el-form-item>
					<el-button @click="toLogin" type="info">返回</el-button>
					<el-button @click="submitForm('registerForm')" type="primary">注册</el-button>
				</el-form-item>
			</div>

		</el-form>
	</div>

</template>

<script>
	import router from '@/router/index.js';
	import {
		Toast
	} from 'vant';
	import {
		reactive,
		toRefs,
		onMounted
	} from 'vue';
	import {
		Register,
		getCaptcha
	} from '../../api/request.js'
	export default {
		setup() {
			//数据
			let testData = reactive({
				registerForm: {
					username: '',
					password: '',
				},
				captchaUrl: null,
				captchaText: null,
				captchaInput: null

			});

			let submitForm = () => {
				if (!testData.captchaInput || testData.captchaInput != testData.captchaText)
					Toast('验证码输入有误');
				else
					Register(testData.registerForm).then(res => {
						if (res.data.status == 200) {
							Toast('注册成功');
							router.push('/login')
						}
						if (res.data.status == 400)
							Toast('用户名和密码长度至少为4位');
						if (res.data.status == 404)
							Toast('注册失败');
						if (res.data.status == 304)
							Toast('用户名已存在');
					})
			}

			// 获取验证码
			let Captcha = () => {
				getCaptcha().then(res => {
					testData.captchaUrl = res.data.image.data
					testData.captchaText = res.data.image.text
					console.log(testData.captchaText);
				})
			}


			let toLogin = () => {
				router.push('/login');
			}

			onMounted(() => {
				Captcha();
			})

			return {
				...toRefs(testData),
				submitForm,
				Captcha,
				toLogin


			}
		}

	}
</script>

<style scoped>
	.BOX {
		/* background: url('../assets/2.jpg'); */
		background-color: #24282f;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;

		.Middle-box {
			background: rgb(44 44 44 / 25%);
			box-shadow: 0 25px 50px rgb(92 81 81 / 20%);
			width: 500px;

			.bottom-box {
				display: flex;
				justify-content: center;
			}
		}
	}

	input {
		background: transparent;
		border: 0px;
	}


	.el-form-item {
		display: flex;
		--font-size: 14px;
		margin-bottom: 18px;
		width: 50%;
		justify-content: center;
		align-items: center;
		margin-left: 25%;
	}
</style>
