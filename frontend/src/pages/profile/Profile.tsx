import Button from "components/profile/Button";
import { Container, FormContainer } from "components/profile/Container";
import { Input, Radio } from "components/profile/Input";
import Label from "components/profile/Label";
import Sidebar from "components/profile/Sidebar";
import UserInfo from "components/profile/UserInfo";

function Profile() {
	return (
		<Container>
			<Sidebar />
			<UserInfo></UserInfo>
			<FormContainer>
				<Label>닉네임</Label>
				<Input></Input>
				<Label>새로운 비밀번호</Label>
				<Input></Input>
				<Label>비밀번호 확인</Label>
				<Input></Input>
				{/* 추가정보 */}
				<Label>닉네임</Label>
				<Radio></Radio>
				<Label>좋아하는 향수 브랜드</Label>
				<Input></Input>
				<Button>회원 탈퇴</Button>
				<Button>제출</Button>
			</FormContainer>
		</Container>
	);
}

export default Profile;
