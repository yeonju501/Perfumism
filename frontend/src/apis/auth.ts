import { Axios, AxiosResponse } from "axios";
import { request } from "./request";

interface UserApiType {
	signup: (userInfo: {
		email: string;
		password: string;
		username: string;
	}) => Promise<AxiosResponse>;
	isExist: (name: string, value: string) => Promise<AxiosResponse<{ result: boolean }>>;
	signin: (userInfo: { email: string; password: string }) => Promise<AxiosResponse>;
	reissue: (refreshToken: string) => Promise<AxiosResponse>;
	findPassword: (email: string) => Promise<AxiosResponse<{ code: string }>>;
}

const authApi: UserApiType = {
	signup: (userInfo) => request.post("members/join", userInfo),
	isExist: (name, value) => request.post(`members/exist-${name}`, value),
	signin: (userInfo) => request.post("members/login", userInfo),
	reissue: (refreshToken) => request.post("members/reissue", { refresh_token: refreshToken }),
	findPassword: (email) => request.post("/members/find-pw", email),
};

export default authApi;
