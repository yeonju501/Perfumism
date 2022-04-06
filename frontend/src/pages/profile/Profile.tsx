import { profileApi } from "apis";
import Button from "components/profile/Button";
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

export default Profile;
