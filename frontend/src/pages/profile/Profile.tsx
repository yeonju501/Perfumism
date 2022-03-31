import Button from "components/profile/Button";
import { Container, FormContainer } from "components/profile/Container";
import { Input, Radio } from "components/profile/Input";
import Label from "components/profile/Label";
import Sidebar from "components/profile/Sidebar";
import UserInfo from "components/profile/UserInfo";
import UserName from "components/profile/UserName";
import { useSelector } from "react-redux";
import { RootState } from "store";
import styled from "styled-components";

function Profile() {
	const { gender, image, username } = useSelector((state: RootState) => state.user);
	return (
		<Container>
			<Sidebar />
			<Section>
				<UserInfo />
				{username && <UserName value={username} gender={gender}></UserName>}

				{/* 추가정보 */}
				<Button>회원 탈퇴</Button>
			</Section>
		</Container>
	);
}

const Section = styled.div`
	margin-left: 15%;
`;

export default Profile;
