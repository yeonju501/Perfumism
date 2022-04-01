import styled from "styled-components";
import { NotificationProp } from "./AlertBox";
import { alertApi } from "apis";

interface Prop {
	notification: NotificationProp;
}

interface NotificationProps {
	isRead: string;
}

function AlertContent({ notification }: Prop) {
	const readNotification = (notificationId: number, articleId: number) => {
		alertApi.readNotification(notificationId);
		location.replace(`/community/${articleId}`);
	};

	return (
		<Notification
			isRead={notification.read_at}
			onClick={() => readNotification(notification.notification_id, notification.article_id)}
		>
			{notification.type === "comment"
				? `${notification.article_title}`
				: `${notification.comment_content}`}
			에 새로운 댓글이 달렸습니다
		</Notification>
	);
}

export default AlertContent;

const Notification = styled.p<NotificationProps>`
	display: block;
	text-decoration: none;
	color: ${({ isRead }) => (isRead ? "gray" : "black")};
	margin-bottom: 1rem;
	font-size: 1.5rem;
	font-weight: ${({ isRead }) => (isRead ? "100" : "700")};
	cursor: pointer;
`;
