import { AxiosResponse } from "axios";
import { request, imageRequest } from "./request";

const communityApi = {
	getCommunityList: () => request.get(`auth/articles/`),
};

export default communityApi;
