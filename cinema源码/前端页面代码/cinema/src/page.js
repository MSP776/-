// 分页

import {
	ref,
	computed
} from 'vue'

export function usePagination(data, itemsPerPage) { // 传入数据和每页显示的数据条数
	let currentPage = ref(1)

	const paginatedData = computed(() => {
		const start = (currentPage.value - 1) * itemsPerPage
		const end = start + itemsPerPage
		return data.slice(start, end)
	})

	const pageCount = computed(() => {
		return Math.ceil(data.length / itemsPerPage)
	})

	const nextPage = () => {
		if (currentPage.value < pageCount.value) {
			currentPage.value++
		}
	}

	const prevPage = () => {
		if (currentPage.value > 1) {
			currentPage.value--
		}
	}

	return {
		currentPage,
		paginatedData,
		pageCount,
		nextPage,
		prevPage
	}
}
