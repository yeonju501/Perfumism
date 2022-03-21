import { AxiosResponse } from "axios";
import { request } from "./request";

interface PerfumeApiType {
	getPerfume: (perfumeId: string) => Promise<AxiosResponse>;
	isPerfumeLiked: (perfumeId: string) => Promise<AxiosResponse>;
	addFavoritePerfume: (perfumeId: string) => Promise<AxiosResponse>;
	deleteFavoritePerfume: (perfumeId: string) => Promise<AxiosResponse>;
}

const perfumeApi: PerfumeApiType = {
	getPerfume: (perfumeId) => request.get(`perfumes/${perfumeId}`),
	isPerfumeLiked: (perfumeId) => request.get(`auth/perfumes/likes/${perfumeId}`),
	addFavoritePerfume: (perfumeId) => request.post(`auth/perfumes/likes/${perfumeId}`),
	deleteFavoritePerfume: (perfumeId) => request.delete(`auth/perfumes/likes/${perfumeId}`),
};

export default perfumeApi;
