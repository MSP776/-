import axios from 'axios'
// 全局配置 axios 请求的根路径, 可以不写.
// axios.defaults.baseURL = '';
// 把 axios 挂载到 Vue 原型上. 今后,在每个 .vue 组件中发起请求,直接调用 this.$http 即可.
// Vue.prototype.axios = axios 
const http = axios.create({
	baseURL: 'http://localhost:3000/api',
	timeout: 5000, //响应时间


})
export default http;
