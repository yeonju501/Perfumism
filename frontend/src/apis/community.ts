import { AxiosResponse } from "axios";
import { request, imageRequest } from "./request";

interface CommunityApiType {
	getCommunityList: (currentPage: number) => Promise<AxiosResponse>;
	getCommunityDetail: (articleId: string | undefined) => Promise<AxiosResponse>;
	createCommunity: (formData: FormData) => Promise<AxiosResponse>;
	deleteCommunity: (articleId: string | undefined) => Promise<AxiosResponse>;
}

const communityApi: CommunityApiType = {
	getCommunityList: (currentPage) => request.get(`auth/articles/?page=${currentPage}`),
	getCommunityDetail: (articleId) => request.get(`auth/articles/detail/${articleId}`),
	createCommunity: (formData) => imageRequest.post(`auth/articles`, formData),
	deleteCommunity: (articleId) => request.delete(`auth/articles/detail/${articleId}`),
};

export default communityApi;
