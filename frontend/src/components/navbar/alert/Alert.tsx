import { faBell, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { alertApi } from "apis";
import { useState, useEffect } from "react";
import styled from "styled-components";
import AlertBox from "./AlertBox";
import IconStyled from "../IconStyled";
import cookie from "react-cookies";

function Alert() {
	const [isOn, setIsOn] = useState(false);
	const [numOfUnread, setNumOfUnread] = useState(0);
	const token = cookie.load("access_token");

	useEffect(() => {
		getNumOfUnread();
	}, [numOfUnread]);

	const getNumOfUnread = async () => {
		const num = await alertApi.getNumOfUnread();
		setNumOfUnread(num.data.unread_count);
	};

	return token ? (
		<Container>
			<IconStyled img={faBell} handleClick={() => setIsOn(!isOn)} />
			{numOfUnread ? (
				numOfUnread > 5 ? (
					<NumberOfNotification>
						5<FontAwesomeIcon icon={faPlus} />
					</NumberOfNotification>
				) : (
					<NumberOfNotification>{numOfUnread}</NumberOfNotification>
				)
			) : undefined}
			{isOn ? <AlertBox /> : undefined}
		</Container>
	) : null;
}

export default Alert;

const Container = styled.div`
	margin-top: 0.3rem;
	position: relative;
	color: #000;
`;

const NumberOfNotification = styled.span`
	width: 2rem;
	height: 2rem;
	border-radius: 50%;
	text-align: center;
	font-size: 1.2rem;
	font-weight: 600;
	background-color: red;
	color: #fff;
	position: absolute;
	top: -1.2rem;
	right: -1rem;
`;
