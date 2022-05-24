import axios from 'axios';

//创建axios实例
const httpSerice = axios.create({
	baseURL: '',
	timeout: 5000,
})

export function get(url, params = {}) {
	return new Promise((resolve, reject) => {
		httpSerice({
			url,
			metho: "get",
			params,
		}).then(res => {
			if (res.status === 200) {
				resolve(res.data);
			} else {
				resolve(null);
			}
		}).catch(err => {
			reject(err);
		})
	})
}
