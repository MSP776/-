import http from './http.js'


export const getTopMovielist = () => {
	// 获取电影列表
	return http({
		url: '/top',
		method: 'get'
	})
}

export const getHotMovielist = () => {
	// 获取电影列表
	return http({
		url: '/hot',
		method: 'get'
	})
}

export const getHopeMovielist = () => {
	// 获取电影列表
	return http({
		url: '/hope',
		method: 'get'
	})
}

export const getCinemalist = () => {
	// 获取影院列表
	return http({
		url: '/cinemalist',
		method: 'get'
	})
}

export const getSchedulist = () => {
	// 获取影院排场列表
	return http({
		url: '/schedulelist',
		method: 'get'
	})
}

export const updateTodoData = (data) => {
	//  插入座位
	return http({
		url: '/updateseat',
		method: 'post',
		data: data,
		headers: {
			'Content-Type': 'application/json',
		}
	})
}

export const Login = (data) => {
	// 登录
	return http({
		url: '/login',
		method: 'post',
		data: data,
		headers: {
			'Content-Type': 'application/json',
		}

	})
}


export const Register = (data) => {
	// 登录
	return http({
		url: '/register',
		method: 'post',
		data: data,
		headers: {
			'Content-Type': 'application/json',
		}

	})
}

export const getCaptcha = () => {
	//  验证码
	return http({
		url: '/captcha',
		method: 'get'
	})
}


export const addOrder = (data) => {
	// 插值
	return http({
		url: '/add',
		method: 'post',
		data: data,
		headers: {
			"Content-Type": "application/json;charset=utf-8"
		},
	})
}

export const getOrderData = (params) => {
	// 
	return http({
		url: '/order',
		method: 'get',
		params: params,
		headers: {
			'Content-Type': 'application/json',
		}

	})
}
