import { AxiosResponse } from "axios";
import { request, imageRequest } from "./request";

interface CommunityApiType {
	getCommunityList: (currentPage: number) => Promise<AxiosResponse>;
	getSubjectCommunityList: (currentPage: number, subject: string) => Promise<AxiosResponse>;
	getCommunityDetail: (articleId: string | undefined) => Promise<AxiosResponse>;
	createCommunity: (formData: FormData) => Promise<AxiosResponse>;
	deleteCommunity: (articleId: number) => Promise<AxiosResponse>;
	updateCommunity: (articleId: number, formData: FormData) => Promise<AxiosResponse>;
}

const communityApi: CommunityApiType = {
	getCommunityList: (currentPage) => request.get(`auth/articles/?page=${currentPage}`),
	getSubjectCommunityList: (currentPage, subject) =>
		request.get(`auth/articles/${subject}/?page=${currentPage}`),
	getCommunityDetail: (articleId) => request.get(`auth/articles/detail/${articleId}`),
	createCommunity: (formData) => imageRequest.post(`auth/articles`, formData),
	deleteCommunity: (articleId) => request.delete(`auth/articles/detail/${articleId}`),
	updateCommunity: (articleId, formData) =>
		imageRequest.put(`auth/articles/detail/${articleId}`, formData),
};

export default communityApi;
