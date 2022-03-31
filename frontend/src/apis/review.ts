import { AxiosResponse } from "axios";
import { request } from "./request";

interface ReviewApiType {
	createReview: (
		review: { grade: number; content: string | undefined },
		perfumeId: string,
	) => Promise<AxiosResponse>;
	getReviews: (perfumeId: string, currentPage: number) => Promise<AxiosResponse>;
	updateReviews: (reviewId: number) => Promise<AxiosResponse>;
	deleteReview: (reviewId: number) => Promise<AxiosResponse>;
	getLatestReviews: () => Promise<AxiosResponse<{ reviews: [] }>>;
	isReviewLiked: (reviewId: number | string) => Promise<AxiosResponse>;
}

const reviewApi: ReviewApiType = {
	createReview: (review, perfumeId) => request.post(`auth/reviews/perfumes/${perfumeId}`, review),
	getReviews: (perfumeId, currentPage) =>
		request.get(`reviews/perfumes/${perfumeId}?page=${currentPage}&size=5`),
	updateReviews: (reviewId) => request.put(`auth/reviews/${reviewId}`),
	deleteReview: (reviewId) => request.delete(`auth/reviews/${reviewId}`),
	getLatestReviews: () => request.get("reviews/latest"),
	isReviewLiked: (reviewId) => request.get(`auth/reviews/likes/${reviewId}`),
};

export default reviewApi;
