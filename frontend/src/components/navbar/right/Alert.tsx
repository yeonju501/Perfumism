import { faBell, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { alertApi } from "apis";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import AlertBox from "./AlertBox";
import cookie from "react-cookies";
import useOutside from "../hooks/useOutside";

function Alert() {
	const [isOn, setIsOn] = useState(false);
	const [numOfUnread, setNumOfUnread] = useState(0);
	const token = cookie.load("access_token");
	const Ref = useRef<HTMLDivElement>(null);

	useOutside({ Ref, setFunction: setIsOn });

	useEffect(() => {
		token && getNumOfUnread();
	}, [numOfUnread]);

	const getNumOfUnread = async () => {
		const num = await alertApi.getNumOfUnread();
		setNumOfUnread(num.data.unread_count);
	};

	return token ? (
		<Container ref={Ref}>
			<FontAwesome icon={faBell} onClick={() => setIsOn(!isOn)} />
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

const FontAwesome = styled(FontAwesomeIcon)`
	width: 1.8rem;
	height: 1.8rem;
	margin-left: 2rem;
	cursor: pointer;
	@media ${(props) => props.theme.mobile} {
		margin-left: 0.5rem;
	}
`;
