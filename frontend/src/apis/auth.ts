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
	reissue: (refreshToken: string) => Promise<AxiosResponse>;
}

const authApi: UserApiType = {
	signup: (userInfo) => request.post("members/join", userInfo),
	isExist: (name, value) => request.post(`members/exist-${name}`, value),
	signin: (userInfo) => request.post("members/login", userInfo),
	reissue: (refreshToken) => request.post("members/reissue", refreshToken),
};

export default authApi;
