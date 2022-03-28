import axios, { AxiosInstance } from "axios";
import cookie from "react-cookies";
import authApi from "./auth";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

const setInterceptors = (instance: AxiosInstance, isReissue?: boolean) => {
	instance.interceptors.request.use(
		(config) => {
			console.log(config);
			if (isReissue) return config;
			const token = cookie.load("access_token");
			if (config.headers && token) config.headers.Authorization = `Bearer ${token}`;
			return config;
		},
		(error) => Promise.reject(error),
	);
	instance.interceptors.response.use(
		(response) => {
			console.log(response);
			return response;
		},
		(error) => {
			const index = cookie.load("index");
			const access_token = cookie.load("access_token");
			if (error.response.status === 403) {
				authApi.reissue({ index, access_token }).then(() => instance.request(error.config));
			}
			console.log(error.response);
			toast.error(error.response.data.error_message);
			return Promise.reject(error);
		},
	);
	return instance;
};

const createInstance = () => {
	const instance = axios.create({
		baseURL: process.env.REACT_APP_MAIN_URL,
		timeout: 10000,
		headers: { "Content-Type": "application/json" },
	});
	return setInterceptors(instance);
};

const authCreateInstance = () => {
	const instance = axios.create({
		baseURL: process.env.REACT_APP_MAIN_URL,
		timeout: 10000,
		headers: { "Content-Type": "application/json" },
	});
	return setInterceptors(instance, true);
};

export const request = createInstance();
export const authRequest = authCreateInstance();
