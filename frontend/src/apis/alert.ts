import { AxiosResponse } from "axios";
import { request } from "./request";

interface AlertApiType {
	getAllNotifications: () => Promise<AxiosResponse>;
	getUnreadNotifications: () => Promise<AxiosResponse>;
}

const alertApi: AlertApiType = {
	getAllNotifications: () => request.get("auth/notifications"),
	getUnreadNotifications: () => request.get("auth/notifications/unread"),
};

export default alertApi;
