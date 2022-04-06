import { profileApi } from "apis";
import { Container } from "components/profile/Container";
import UserInfo from "components/profile/UserInfo";
import UserInfoEdit from "components/profile/UserInfoEdit";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SET_USER } from "store/user";
import styled from "styled-components";

interface Data {
	id: number;
	email: string;
	username: string;
	gender: null | number;
	image: null | number;
	social_id: null | number;
}

function Profile() {
	const dispatch = useDispatch();
	const [userInfo, setUserInfo] = useState<Data | null>(null);

	useEffect(() => {
		const getUserInfo = async () => {
			const res = await profileApi.getUserInfo();
			setUserInfo(res.data);
			dispatch(SET_USER(res.data));
		};
		getUserInfo();
	}, []);

	return (
		userInfo && (
			<Container>
				<Section>
					<UserInfo />
					<UserInfoEdit value={userInfo.username} gender={userInfo.gender as number}></UserInfoEdit>
					<Button>회원 탈퇴</Button>
				</Section>
			</Container>
		)
	);
}

const Section = styled.div`
	margin-left: 15%;
`;

const Button = styled.button`
	background-color: inherit;
	border: none;
	outline: none;
	padding: 0;
	cursor: pointer;
	margin-top: 10rem;
	font-size: 1.2rem;
	margin-left: auto;
	color: #999999;
	&:hover {
		color: black;
	}
`;

export default Profile;
