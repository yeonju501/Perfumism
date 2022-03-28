import { Axios, AxiosResponse } from "axios";
import { request } from "./request";

interface AlertApiType {
	getAllNotifications: () => Promise<AxiosResponse>;
	getUnreadNotifications: () => Promise<AxiosResponse>;
	getNumberOfUnread: () => Promise<AxiosResponse>;
}

const alertApi: AlertApiType = {
	getAllNotifications: () => request.get("auth/notifications"),
	getUnreadNotifications: () => request.get("auth/notifications/unread"),
	getNumberOfUnread: () => request.get("auth/notifications/count-unread"),
};

export default alertApi;
