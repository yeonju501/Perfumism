import { AxiosResponse } from "axios";
import { request, imageRequest } from "./request";

interface CommunityApiType {
	getCommunityList: (currentPage: number) => Promise<AxiosResponse>;
	getSubjectCommunityList: (currentPage: number, subject: string) => Promise<AxiosResponse>;
	getCommunityDetail: (articleId: string | undefined) => Promise<AxiosResponse>;
	createCommunity: (formData: FormData) => Promise<AxiosResponse>;
	deleteCommunity: (articleId: number) => Promise<AxiosResponse>;
	updateCommunity: (articleId: number, formData: FormData) => Promise<AxiosResponse>;
	createComment: (articleId: number, comment: { content: string }) => Promise<AxiosResponse>;
	getComments: (articleId: number, currentPage: number) => Promise<AxiosResponse>;
	updateComment: (
		articleId: number,
		commentId: number,
		comment: { content: string },
	) => Promise<AxiosResponse>;
	deleteComment: (articleId: number, commentId: number) => Promise<AxiosResponse>;
	createReply: (articleId: number, commentId: number) => Promise<AxiosResponse>;
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
	createComment: (articleId: number, comment: { content: string }) =>
		request.post(`auth/comments/${articleId}`, comment),
	getComments: (articleId: number, currentPage: number) =>
		request.get(`auth/comments/${articleId}?page=${currentPage}&size=10`),
	updateComment: (articleId: number, commentId: number, comment: { content: string }) =>
		request.put(`auth/comments/${articleId}/update/${commentId}`, comment),
	deleteComment: (articleId: number, commentId: number) =>
		request.delete(`auth/comments/${articleId}/delete/${commentId}`),
	createReply: (articleId: number, commentId: number) =>
		request.post(`auth/comments/${articleId}/reply/${commentId}`),
};

export default communityApi;
