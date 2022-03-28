import styled from "styled-components";
import { Link } from "react-router-dom";
import { NotificationProp } from "./AlertBox";
import { alertApi } from "apis";

interface Prop {
	notifications: Array<NotificationProp>;
}

function Notifications({ notifications }: Prop) {
	const readNotification = (id: number) => {
		alertApi.readNotification(id);
	};

	return (
		<>
			{notifications.length > 0 ? (
				notifications.map((notification) => {
					const link = `/${notification.article_id}`;
					<Notification to={link} key={notification.notification_id}>
						<NoAlert>
							{notification.type === "comment"
								? notification.comment_content
								: notification.article_title}
							에 새로운 댓글이 달렸습니다
						</NoAlert>
					</Notification>;
				})
			) : (
				<NoAlert>알림이 없습니다</NoAlert>
			)}
		</>
	);
}

export default Notifications;

const Notification = styled(Link)`
	margin: 0 auto;
	display: block;
	text-decoration: none;
	color: #000;
	margin-bottom: 1rem;
`;

const NoAlert = styled.p`
	text-align: center;
	font-size: 1.5rem;
`;
