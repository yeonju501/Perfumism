import { AxiosResponse } from "axios";
import { request } from "./request";

interface UserApiType {
	signup: (userInfo: {
		email: string;
		password: string;
		username: string;
	}) => Promise<AxiosResponse>;
	isExist: (name: string, value: string) => Promise<AxiosResponse<{ result: boolean }>>;
	signin: (userInfo: { email: string; password: string }) => Promise<AxiosResponse>;
	reissue: (data: { index: number; access_token: string }) => Promise<AxiosResponse>;
	findPassword: (email: string) => Promise<AxiosResponse<{ code: string }>>;
}

const authApi: UserApiType = {
	signup: (userInfo) => request.post("members/join", userInfo),
	isExist: (name, value) => request.post(`members/exist-${name}`, value),
	signin: (userInfo) => request.post("members/login", userInfo),
	reissue: (data) => request.post("members/reissue", data),
	findPassword: (email) => request.post("members/find-pw", email),
};

export default authApi;
