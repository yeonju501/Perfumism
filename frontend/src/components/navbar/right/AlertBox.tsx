import { alertApi } from "apis";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Notifications from "./Notifications";

export interface NotificationProp {
	notification_id: number;
	type: string;
	article_id: number;
	article_title: string;
	comment_id: number;
	comment_content: string;
	created_at: string;
	read_at: string;
}
interface Button {
	selected: boolean;
}

function AlertBox() {
	const [notifications, setNotifications] = useState<Array<NotificationProp>>([]);
	const [isAll, setIsAll] = useState(true);

	useEffect(() => {
		getNotifications();
	}, [isAll]);

	const getNotifications = async () => {
		if (isAll) {
			const allNotifications = await alertApi.getAllNotifications();
			return setNotifications(allNotifications.data);
		}
		const unreadNotifications = await alertApi.getUnreadNotifications();
		return setNotifications(unreadNotifications.data);
	};

	return (
		<Container>
			<Title>Notifications</Title>
			<SelectedButton onClick={() => setIsAll(!isAll)} selected={isAll}>
				All
			</SelectedButton>
			<SelectedButton onClick={() => setIsAll(!isAll)} selected={!isAll}>
				Unread
			</SelectedButton>
			<Notifications notifications={notifications} />
		</Container>
	);
}

export default AlertBox;

const Container = styled.div`
	width: 36rem;
	height: 40rem;
	overflow-y: scroll;
	position: absolute;
	border: 1px solid #000;
	border-radius: 0.4rem;
	right: -8rem;
	margin-top: 1rem;
	z-index: 10;
	background-color: #fff;
	padding: 1.5rem;
`;

const Title = styled.h1`
	font-size: 2.5rem;
	margin: 0;
	margin-bottom: 0.5rem;
`;

const SelectedButton = styled.button<Button>`
	padding: 1rem;
	font-weight: 800;
	font-size: 1.6rem;
	color: ${(props) => (props.selected ? "#000" : "gray")};
	margin-right: 1rem;
	margin-bottom: 1.5rem;
	border: none;
	border-radius: 0.4rem;
	cursor: pointer;
`;
