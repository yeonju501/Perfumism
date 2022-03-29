import { AxiosResponse } from "axios";
import { request } from "./request";

interface ProfileApiType {
	getFavorites: () => Promise<AxiosResponse>;
	getUserInfo: () => Promise<AxiosResponse>;
}

const profileApi: ProfileApiType = {
	getFavorites: () => request.get(`auth/perfumes/likes/my-favorite`),
	getUserInfo: () => request.get(`auth/members`),
};

export default profileApi;
