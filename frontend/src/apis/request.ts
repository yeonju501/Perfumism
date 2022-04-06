import axios, { AxiosInstance } from "axios";
import cookie from "react-cookies";
import authApi from "./auth";
import errorMessage from "store/error";

axios.defaults.withCredentials = true;

const setInterceptors = (instance: AxiosInstance, isReissue?: boolean) => {
	instance.interceptors.request.use(
		(config) => {
			if (isReissue) return config;
			const token = cookie.load("access_token");
			if (config.headers && token) config.headers.Authorization = `Bearer ${token}`;
			return config;
		},
		(error) => Promise.reject(error),
	);
	instance.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			const index = cookie.load("index");
			const access_token = cookie.load("access_token");
			if (error.response.data.error_code === "A01") {
				authApi.reissue({ index, access_token });
				return instance.request(error.config);
			}
			if (error.response.data.error_code === "A08") {
				return authApi.logout();
			}
			return errorMessage(error.response.data.error_code);
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

const imageCreateInstance = () => {
	const instance = axios.create({
		baseURL: process.env.REACT_APP_MAIN_URL,
		timeout: 10000,
		headers: { "Content-Type": "multipart/form-data" },
	});
	return setInterceptors(instance);
};

const djangoCreateInstance = () => {
	const instance = axios.create({
		baseURL: process.env.REACT_APP_SUB_URL,
		timeout: 10000,
	});
	return instance;
};

const authCreateInstance = () => {
	const instance = axios.create({
		baseURL: process.env.REACT_APP_MAIN_URL,
		timeout: 10000,
		headers: { "Content-Type": "application/json" },
	});
	return setInterceptors(instance, true);
};

export const authRequest = authCreateInstance();
export const request = createInstance();
export const djangoRequest = djangoCreateInstance();
export const imageRequest = imageCreateInstance();
