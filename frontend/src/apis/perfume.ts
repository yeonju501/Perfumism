import { AxiosResponse } from "axios";
import { request } from "./request";

interface PerfumeApiType {
	getPerfume: (perfumeId: string) => Promise<AxiosResponse>;
	getPerfumes: (currentPage: number) => Promise<AxiosResponse>;
	getPerfumesByAccord: (
		keyword: string,
		currentPage: number,
		sort: string,
		order: string,
	) => Promise<AxiosResponse>;
	isPerfumeLiked: (perfumeId: string | number) => Promise<AxiosResponse>;
	addFavoritePerfume: (perfumeId: string | number) => Promise<AxiosResponse>;
	deleteFavoritePerfume: (perfumeId: string | number) => Promise<AxiosResponse>;
	getBrandPerfumes: (brandName: string | undefined, currentPage: number) => Promise<AxiosResponse>;
}

const perfumeApi: PerfumeApiType = {
	getPerfume: (perfumeId) => request.get(`perfumes/${perfumeId}`),
	getPerfumes: (currentPage) =>
		request.get(`perfumes/?page=${currentPage}&size=10&sort=totalSurvey%2Cdesc`),
	getPerfumesByAccord: (keyword, currentPage, sort, order) =>
		request.get(
			`/perfumes/search?keyword=${keyword}&page=${currentPage}&size=10&sort=${sort}%2C${order}&type=accord`,
		),
	isPerfumeLiked: (perfumeId) => request.get(`auth/perfumes/likes/${perfumeId}`),
	addFavoritePerfume: (perfumeId) => request.post(`auth/perfumes/likes/${perfumeId}`),
	deleteFavoritePerfume: (perfumeId) => request.delete(`auth/perfumes/likes/${perfumeId}`),
	getBrandPerfumes: (brandName, currentPage) =>
		request.get(
			`/perfumes/search/?keyword=${brandName}&page=${currentPage}&size=10&sort=totalSurvey%2Cdesc&type=brand`,
		),
};

export default perfumeApi;
