import { AxiosResponse } from "axios";
import { request } from "./request";

interface RecommendApiType {
	createSurveyRecommend: (
		a1: number,
		a2: number,
		a3: number,
		a4: number,
		a5: number,
	) => Promise<AxiosResponse>;
}

const recommendApi: RecommendApiType = {
	createSurveyRecommend: (a1, a2, a3, a4, a5) =>
		request.get(`algorithms/survey/${a1}/${a2}/${a3}/${a4}/${a5}`),
};

export default recommendApi;
