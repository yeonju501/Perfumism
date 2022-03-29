import { useNavigate, useLocation } from "react-router-dom";
import { authApi } from "apis";
import { Container, FormContainer } from "components/account/Container";
import { Button, Input, Label, ErrorText, Header, LinkParagraph } from "components/account/Index";
import { formValidator } from "utils";
import useForm from "../hooks/useForm";

function ChangePasswordPage() {
	const navigate = useNavigate();
	const { state } = useLocation();
	const { handleChange, handleSubmit, errors } = useForm({
		initialValues: {
			password: "",
			confirmPassword: "",
		},
		onSubmit: async ({ password }) => {
			try {
				await authApi.changePassword(state as string, password).then((res) => {
					res.status === 204 ? navigate("/password/success") : null;
				});
			} catch (error) {
				console.log(error);
			}
		},
		validate: ({ password, confirmPassword }) => {
			const errors: { [key: string]: string } = {};
			if (!formValidator.validatePassword(password))
				errors.password = "숫자, 특수문자, 대문자를 포함하여 입력해주세요.";
			if (password !== confirmPassword) errors.password = "비밀번호가 일치하지 않습니다";
			return errors;
		},
	});
	return (
		<Container>
			<Header>비밀번호 찾기</Header>
			<FormContainer onSubmit={handleSubmit}>
				<Label htmlFor="password">새로운 비밀번호</Label>
				<Input type="password" name="password" onChange={handleChange} />
				<ErrorText>{errors.password}</ErrorText>
				<Label htmlFor="confirmPassword">새로운 비밀번호 확인</Label>
				<Input type="password" name="confirmPassword" onChange={handleChange} />
				<ErrorText>{errors.password}</ErrorText>
				<br />
				<Button backgroundColor="black" color="#fff">
					비밀번호 변경
				</Button>
			</FormContainer>
			<LinkParagraph to="/signup">회원가입하러 가기</LinkParagraph>
			<LinkParagraph to="/signin">로그인하러 가기</LinkParagraph>
		</Container>
	);
}

export default ChangePasswordPage;
