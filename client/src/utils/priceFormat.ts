export const priceFormat = (sum: number) => {
	if (sum < 1000) {
		return sum
	} else if (sum < 10000 && sum >= 1000) {
		const news = sum.toString().split("")
		news.splice(1, 0, " ")
		return news.join("")
	} else if (sum < 100000 && sum >= 10000) {
		const news = sum.toString().split("")
		news.splice(2, 0, " ")
		return news.join("")
	} else if (sum >= 100000 && sum < 1000000) {
		const news = sum.toString().split("")
		news.splice(3, 0, " ")
		return news.join("")
	} else if (sum >= 1000000 && sum < 10000000) {
		const news = sum.toString().split("")
		news.splice(1, 0, " ")
		news.splice(5, 0, " ")
		return news.join("")
	} else if (sum >= 10000000 && sum < 100000000) {
		const news = sum.toString().split("")
		news.splice(2, 0, " ")
		news.splice(6, 0, " ")
		return news.join("")
	} else if (sum >= 100000000 && sum < 1000000000) {
		const news = sum.toString().split("")
		news.splice(3, 0, " ")
		news.splice(7, 0, " ")
		return news.join("")
	} else if (sum >= 1000000000 && sum < 10000000000) {
		const news = sum.toString().split("")
		news.splice(1, 0, " ")
		news.splice(5, 0, " ")
		news.splice(9, 0, " ")
		return news.join("")
	}
}
