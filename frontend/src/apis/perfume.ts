import { AxiosResponse } from "axios";
import { request } from "./request";

interface PerfumeApiType {
	getPerfume: (perfumeId: string) => Promise<AxiosResponse>;
	getPerfumes: (currentPage: number) => Promise<AxiosResponse>;
	isPerfumeLiked: (perfumeId: string | number) => Promise<AxiosResponse>;
	addFavoritePerfume: (perfumeId: string | number) => Promise<AxiosResponse>;
	deleteFavoritePerfume: (perfumeId: string | number) => Promise<AxiosResponse>;
}

const perfumeApi: PerfumeApiType = {
	getPerfume: (perfumeId) => request.get(`perfumes/${perfumeId}`),
	getPerfumes: (currentPage) => request.get(`perfumes/?page=${currentPage}&size=5`),
	isPerfumeLiked: (perfumeId) => request.get(`auth/perfumes/likes/${perfumeId}`),
	addFavoritePerfume: (perfumeId) => request.post(`auth/perfumes/likes/${perfumeId}`),
	deleteFavoritePerfume: (perfumeId) => request.delete(`auth/perfumes/likes/${perfumeId}`),
};

export default perfumeApi;
