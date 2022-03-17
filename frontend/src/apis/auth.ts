import { AxiosResponse } from "axios";
import { request } from "./request";

interface UserApiType {
	signup: (userInfo: {
		email: string;
		password: string;
		username: string;
	}) => Promise<AxiosResponse>;
	isExist: (name: string, value: string) => Promise<AxiosResponse<{ result: boolean }>>;
	login: (userInfo: { email: string; password: string }) => Promise<AxiosResponse>;
}

const authApi: UserApiType = {
	signup: (userInfo) => request.post("members/join", userInfo),
	isExist: (name, value) => request.post(`members/exist-${name}`, value),
	login: (userInfo) => request.post("/auth/login", userInfo),
};

export default authApi;
