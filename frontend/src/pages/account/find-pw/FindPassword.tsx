import { useNavigate } from "react-router-dom";
import { authApi } from "apis";
import { Container, FormContainer } from "components/account/Container";
import { Button, Input, Label, ErrorText, Header, LinkParagraph } from "components/account/Index";
import { formValidator } from "utils";
import useForm from "../hooks/useForm";

function FindPassword() {
	const navigate = useNavigate();
	const { handleChange, handleSubmit, errors } = useForm({
		initialValues: {
			email: "",
		},
		onSubmit: async ({ email }) => {
			try {
				await authApi.findPassword(email).then((res) => {
					res.status === 200 ? navigate("/") : null;
				});
			} catch (error) {
				console.log(error);
			}
		},
		validate: ({ email }) => {
			const errors: { [key: string]: string } = {};
			if (!formValidator.validateEmailForm(email)) errors.email = "올바른 이메일을 입력해주세요.";
			return errors;
		},
	});
	return (
		<Container>
			<Header>비밀번호 찾기</Header>
			<FormContainer onSubmit={handleSubmit}>
				<Label htmlFor="email">이메일</Label>
				<Input name="email" onChange={handleChange} />
				<ErrorText>{errors.email}</ErrorText>
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
