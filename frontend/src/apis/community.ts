import { AxiosResponse } from "axios";
import { request, imageRequest } from "./request";

interface CommunityApiType {
	getCommunityList: () => Promise<AxiosResponse>;
}

const communityApi: CommunityApiType = {
	getCommunityList: () => request.get(`auth/articles/`),
};

export default communityApi;
