import axios, { AxiosInstance } from "axios";
import cookie from "react-cookies";
import authApi from "./auth";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

const setInterceptors = (instance: AxiosInstance) => {
	instance.interceptors.request.use(
		(config) => {
			return config;
		},
		(error) => Promise.reject(console.log(error.response)),
	);

	instance.interceptors.response.use(
		(response) => {
			if (response.data.access_token) setHeadersAuthroization(response.data.access_token);
			return response;
		},
		(error) => {
			const refreshToken = cookie.load("refreshToken");
			if (refreshToken && error.response.status === 401) return authApi.reissue(refreshToken);
			Promise.reject(toast.error(error.response.data.error_message));
		},
	);
	return instance;
};

const setHeadersAuthroization = (token: string) => {
	axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
