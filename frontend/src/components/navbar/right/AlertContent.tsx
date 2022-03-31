import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { NotificationProp } from "./AlertBox";
import { alertApi } from "apis";

interface Prop {
	notification: NotificationProp;
}

function AlertContent({ notification }: Prop) {
	const navigate = useNavigate();
	const readNotification = (notificationId: number, articleId: number) => {
		alertApi.readNotification(notificationId);
		navigate(`/${articleId}`);
	};

	return (
		<Notification
			onClick={() => readNotification(notification.notification_id, notification.article_id)}
		>
			{notification.type === "comment"
				? `${notification.comment_content}`
				: `${notification.article_title}`}
			에 새로운 댓글이 달렸습니다
		</Notification>
	);
}

export default AlertContent;

const Notification = styled.p`
	margin: 0 auto;
	display: block;
	text-decoration: none;
	color: #000;
	margin-bottom: 1rem;
`;
