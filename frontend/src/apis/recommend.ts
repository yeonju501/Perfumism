import { AxiosResponse } from "axios";
import { request } from "./request";

interface RecommendApiType {
	createSurveyRecommend: () => Promise<AxiosResponse>;
}

const recommendApi: RecommendApiType = {
	createSurveyRecommend: () => request.get(`설문추천api`),
};

export default recommendApi;
