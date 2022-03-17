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
