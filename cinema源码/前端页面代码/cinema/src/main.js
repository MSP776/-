import {
	createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn'; //解决elementpLus一些组件是英文的问题
// 全屏滚动 vue-fullpage.js
import 'fullpage.js';
import VueFullpage from 'vue-fullpage.js'

import 'fullpage.js/dist/fullpage.min.css';



import {
	Swipe,
	SwipeItem,
	Image as VanImage,
	Lazyload,
	Button
} from 'vant';

import 'vant/lib/index.css';

const app = createApp(App)

app.use(store)
	.use(Lazyload)
	.use(Swipe)
	.use(SwipeItem)
	.use(VanImage)
	.use(router)
	.use(ElementPlus, {
		locale: zhCn
	})
	.use(VueFullpage)
	.use(Button)
	.mount('#app')
