import { AxiosResponse } from "axios";
import { request } from "./request";

interface AlertApiType {
	getAllNotifications: () => Promise<AxiosResponse>;
	getUnreadNotifications: () => Promise<AxiosResponse>;
	getNumOfUnread: () => Promise<AxiosResponse>;
}

const alertApi: AlertApiType = {
	getAllNotifications: () => request.get("auth/notifications"),
	getUnreadNotifications: () => request.get("auth/notifications/unread"),
	getNumOfUnread: () => request.get("auth/notifications/count-unread"),
};

export default alertApi;
