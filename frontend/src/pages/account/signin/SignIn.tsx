import { useNavigate } from "react-router";
import { FormContainer, Container } from "components/account/Container";
import { Button, Input, Label, ErrorText, Header, LinkParagraph } from "components/account/Index";
import { formValidator } from "utils";
import { authApi } from "apis";
import useForm from "../hooks/useForm";
import socialLogin from "apis/socialLogin";

function SignIn() {
	const navigate = useNavigate();
	const { handleChange, handleSubmit, errors } = useForm({
		initialValues: {
			email: "",
			password: "",
		},

		onSubmit: async ({ email, password }) => {
			try {
				await authApi
					.signin({
						email,
						password,
					})
					.then((res) => {
						res.status === 200 ? navigate("/") : null;
					});
			} catch (error) {
				console.log(error);
			}
		},

		validate: ({ email, password }) => {
			const errors: { [key: string]: string } = {};
			if (!formValidator.validateEmailForm(email)) errors.email = "올바른 이메일을 입력해주세요.";
			if (!formValidator.validatePassword(password))
				errors.password = "대문자와 특수문자를 1자 이상 포함해주세요.";
			return errors;
		},
	});

	return (
		<Container>
			<Header>로그인</Header>
			<FormContainer onSubmit={handleSubmit}>
				<Label htmlFor="email">이메일</Label>
				<Input
					name="email"
					type="text"
					onChange={handleChange}
					placeholder="이메일을 입력해주세요"
				/>
				<ErrorText>{errors.email}</ErrorText>
				<Label htmlFor="password">비밀번호</Label>
				<Input
					name="password"
					type="password"
					onChange={handleChange}
					placeholder="비밀번호를 입력해주세요"
				/>
				<ErrorText>{errors.password}</ErrorText>
				<Button backgroundColor="black" color="#ffff">
					로그인하기
				</Button>
			</FormContainer>
			<Button backgroundColor="#FEE500" color="black" onClick={socialLogin.kakao}>
				카카오로 시작하기
			</Button>
			<Button backgroundColor="#f8f8f9" onClick={socialLogin.google}>
				구글로 시작하기
			</Button>
			<LinkParagraph to="/signup">회원가입하러 가기</LinkParagraph>
			<LinkParagraph to="/find-password">비밀번호 찾기</LinkParagraph>
		</Container>
	);
}

export default SignIn;
