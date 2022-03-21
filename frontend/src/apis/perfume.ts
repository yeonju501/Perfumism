import { AxiosResponse } from "axios";
import { request } from "./request";

interface PerfumeApiType {
	getPerfume: (perfumeId: string) => Promise<AxiosResponse>;
	isPerfumeLiked: (perfumeId: string) => Promise<AxiosResponse>;
}

const perfumeApi: PerfumeApiType = {
	getPerfume: (perfumeId) => request.get(`perfumes/${perfumeId}`),
	isPerfumeLiked: (perfumeId) => request.get(`auth/perfumes/perfumes/likes/${perfumeId}`),
};

export default perfumeApi;
