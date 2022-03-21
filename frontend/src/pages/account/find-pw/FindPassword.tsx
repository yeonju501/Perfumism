import { Container, FormContainer } from "components/account/Container";
import { Button, Input, Label, ErrorText, Header, LinkParagraph } from "components/account/Index";

function FindPassword() {
	return (
		<Container>
			<Header>비밀번호 찾기</Header>
			<FormContainer>
				<Label htmlFor="email">이메일</Label>
				<Input name="email" />
				<br />
				<Button backgroundColor="black" color="#fff">
					비밀번호 찾기
				</Button>
			</FormContainer>
			<LinkParagraph to="/signup">회원가입하러 가기</LinkParagraph>
			<LinkParagraph to="/signin">로그인하러 가기</LinkParagraph>
		</Container>
	);
}

export default FindPassword;
