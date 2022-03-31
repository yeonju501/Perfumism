import { AxiosResponse } from "axios";
import { request } from "./request";

interface ReviewApiType {
	createReview: (
		review: { grade: number; content: string | undefined },
		perfumeId: string,
	) => Promise<AxiosResponse>;
	getReviews: (perfumeId: string, currentPage: number) => Promise<AxiosResponse>;
	updateReview: (
		review: { grade: number; content: string | undefined },
		reviewId: number | undefined,
	) => Promise<AxiosResponse>;
	deleteReview: (reviewId: number) => Promise<AxiosResponse>;
	getLatestReviews: () => Promise<AxiosResponse<{ reviews: [] }>>;
	isReviewLiked: (reviewId: number | string) => Promise<AxiosResponse>;
	addReviewLike: (reviewId: number) => Promise<AxiosResponse>;
}

const reviewApi: ReviewApiType = {
	createReview: (review, perfumeId) => request.post(`auth/reviews/perfumes/${perfumeId}`, review),
	getReviews: (perfumeId, currentPage) =>
		request.get(`reviews/perfumes/${perfumeId}?page=${currentPage}&size=5`),
	updateReview: (review, reviewId) => request.put(`auth/reviews/${reviewId}`, review),
	deleteReview: (reviewId) => request.delete(`auth/reviews/${reviewId}`),
	getLatestReviews: () => request.get("reviews/latest"),
	isReviewLiked: (reviewId) => request.get(`auth/reviews/likes/${reviewId}`),
	addReviewLike: (reviewId) => request.post(`auth/reviews/likes/${reviewId}`),
};

export default reviewApi;
