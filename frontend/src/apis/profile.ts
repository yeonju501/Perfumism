import { AxiosResponse } from "axios";
import { request } from "./request";

interface ProfileApiType {
	getFavorites: () => Promise<AxiosResponse>;
}

const profileApi: ProfileApiType = {
	getFavorites: () => request.get(`auth/perfumes/likes/my-favorite`),
};

export default profileApi;
