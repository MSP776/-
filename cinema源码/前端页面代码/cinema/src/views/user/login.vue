<template>
	<div class="BOX">

		<el-form :model="loginForm" class="Middle-box">
			<h2 style="text-align: center;font-size: 2em;font-weight: 600;color:rgb(172 51 42);">Sign in</h2>
			<el-form-item>
				<el-input placeholder="用户名" v-model="loginForm.username" type="text" prop="username"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input placeholder="密码" v-model="loginForm.password" type="password" prop="password"></el-input>
			</el-form-item>

			<el-form-item>
				<el-input placeholder="验证码" v-model="captchaInput"></el-input>

				<!-- <div v-html="captchaUrl" @click="Captcha"></div> -->
			</el-form-item>
			<el-form-item v-html="captchaUrl" @click="Captcha" style="margin-top: 10px;"></el-form-item>
			<div class="bottom-box">
				<el-form-item>
					<el-button @click="submitForm('loginForm')" type="success">登录</el-button>
					<el-button @click="toRegister" type="danger">注册</el-button>
				</el-form-item>
			</div>

		</el-form>
	</div>

</template>

<script>
	import {
		useRouter
	} from 'vue-router';
	import {
		Toast
	} from 'vant';
	import {
		reactive,
		toRefs,
		onMounted
	} from 'vue';
	import {
		Login,
		getCaptcha
	} from '../../api/request.js'
	export default {
		setup() {
			let router = useRouter();
			//数据
			let testData = reactive({
				loginForm: {
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
					Login(testData.loginForm).then(res => {
						if (res.data.status == 200) {
							Toast('登陆成功');
							sessionStorage.setItem('token', res.data.token)
							sessionStorage.setItem('userid', res.data.userid)
							// console.log(res.data);

							router.push("/my")
						}

						if (res.data.status == 400)
							Toast('用户名或密码不能为空');
						if (res.data.status == 404)
							Toast('用户名或密码错误');
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


			let toRegister = () => {
				router.push('/register')
			}

			onMounted(() => {
				Captcha();
			})

			return {
				...toRefs(testData),
				submitForm,
				Captcha,
				toRegister
			}
		}

	}
</script>

<style scoped>
	.BOX {
		background: #24282f;
		/* background: url('../assets/2.jpg'); */
		/* background-repeat: no-repeat; */
		/* background-size: 100% 100%; */
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;

		.Middle-box {
			background: rgb(110 110 134 / 25%);
			box-shadow: 0 25px 50px rgb(89 86 124 / 20%);
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
