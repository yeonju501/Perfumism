import Button from "components/profile/Button";
import { Container, FormContainer } from "components/profile/Container";
import { Input, Radio } from "components/profile/Input";
import Label from "components/profile/Label";
import Sidebar from "components/profile/Sidebar";
import UserInfo from "components/profile/UserInfo";
import { useSelector } from "react-redux";
import { RootState } from "store";

function Profile() {
	const { gender, image, username } = useSelector((state: RootState) => state.user);
	return (
		<Container>
			<Sidebar />
			<UserInfo></UserInfo>
			<FormContainer>
				<Label>닉네임</Label>
				{username && <Input value={username}></Input>}
				<Label>새로운 비밀번호</Label>
				<Input></Input>
				<Label>비밀번호 확인</Label>
				<Input></Input>
				{/* 추가정보 */}
				<p>성별</p>
				<p>알림 설정</p>
				<Button>회원 탈퇴</Button>
				<Button>제출</Button>
			</FormContainer>
		</Container>
	);
}

export default Profile;
