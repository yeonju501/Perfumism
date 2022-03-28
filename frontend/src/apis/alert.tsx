import { AxiosResponse } from "axios";
import { request } from "./request";

interface AlertApiType {
	signup: () => Promise<AxiosResponse>;
}

const alertApi: AlertApiType = {
	signup: () => request.get("auth/notification"),
};

export default alertApi;
