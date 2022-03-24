import { AxiosResponse } from "axios";
import { request } from "./request";

interface ReviewApiType {
	searchName: (keyword: string) => Promise<AxiosResponse<{ perfumes: [] }>>;
	searchBrand: (keyword: string) => Promise<AxiosResponse<{ perfumes: [] }>>;
	searchAccord: (keyword: string) => Promise<AxiosResponse<{ perfumes: [] }>>;
}

const searchApi: ReviewApiType = {
	searchName: (keyword) =>
		request.get(`perfumes/search?keyword=${keyword}page=0&size=20&type=name`),
	searchBrand: (keyword) =>
		request.get(`perfumes/search?keyword=${keyword}page=0&size=20&type=brand`),
	searchAccord: (keyword) =>
		request.get(`perfumes/search?keyword=${keyword}page=0&size=20&type=Accord`),
};

export default searchApi;
