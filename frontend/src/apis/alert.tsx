import { AxiosResponse } from "axios";
import { request } from "./request";

interface AlertApiType {
	getAllNotifications: () => Promise<AxiosResponse>;
}

const alertApi: AlertApiType = {
	getAllNotifications: () => request.get("auth/notification"),
};

export default alertApi;
