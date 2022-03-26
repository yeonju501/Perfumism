import { AxiosResponse } from "axios";
import { request } from "./request";

interface ReviewApiType {
	searchPerfume: (keyword: string) => Promise<AxiosResponse<{ perfumes: [] }>>;
}

const searchApi: ReviewApiType = {
	searchPerfume: (keyword) => request.get(`perfumes/search-all?${keyword}=gucci&page=0&size=10`),
};

export default searchApi;
