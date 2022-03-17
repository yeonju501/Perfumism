import axios, { AxiosInstance } from "axios";

const setInterceptors = (instance: AxiosInstance) => {
	instance.interceptors.request.use(
		(config) => {
			config.headers = { ...config.headers };
			return config;
		},
		(error) => Promise.reject(console.log(error)),
	);

	instance.interceptors.response.use(
		(response) => {
			// console.log(response);
			return response;
		},
		(error) => Promise.reject(console.log(error.response)),
	);
	return instance;
};

const createInstance = () => {
	const instance = axios.create({
		baseURL: process.env.REACT_APP_MAIN_URL,
		timeout: 3000,
		headers: { "Content-Type": "application/json" },
	});
	return setInterceptors(instance);
};

export const request = createInstance();
