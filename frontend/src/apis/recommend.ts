import { AxiosResponse } from "axios";
import { request } from "./request";

interface RecommendApiType {
	createSurveyRecommend: (answer: {
		a1: string;
		a2: string;
		a3: string;
		a4: string;
		a5: string;
	}) => Promise<AxiosResponse>;
}

const recommendApi: RecommendApiType = {
	createSurveyRecommend: (answer) => request.post(`설문추천api`, answer),
};

export default recommendApi;
