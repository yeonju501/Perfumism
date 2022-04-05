import { AxiosResponse } from "axios";
import { request } from "./request";

interface ReviewApiType {
	searchPerfume: (keyword: string, currentPage: number) => Promise<AxiosResponse<{ perfumes: [] }>>;
}

const searchApi: ReviewApiType = {
	searchPerfume: (keyword, currentPage) =>
		request.get(`perfumes/search-all?keyword=${keyword}&page=${currentPage}&size=100`),
};

export default searchApi;
