import { AxiosResponse } from "axios";
import { imageRequest, request } from "./request";

interface ProfileApiType {
	getFavorites: () => Promise<AxiosResponse>;
	getUserInfo: () => Promise<AxiosResponse>;
	setUserImage: (formData: FormData) => Promise<AxiosResponse>;
}

const profileApi: ProfileApiType = {
	getFavorites: () => request.get(`auth/perfumes/likes/my-favorite`),
	getUserInfo: () => request.get(`auth/members`),
	setUserImage: (formData) => imageRequest.post(`auth/members/img`, formData),
};

export default profileApi;
