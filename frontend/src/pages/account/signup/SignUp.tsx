import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { authApi } from "apis";
import Button from "components/account/Button";
import Input from "components/account/Input";
import Label from "components/account/Label";
import styled from "styled-components";
import useForm from "./hooks/useForm";
import { formValidator } from "utils";
import ErrorText from "components/account/ErrorsText";
function SignUp() {
	const navigate = useNavigate();

	const { handleChange, handleSubmit, checkDuplicate, errors } = useForm({
		initialValues: {
			email: "",
			password: "",
			username: "",
		},

		onSubmit: async ({ email, username, password }) => {
			try {
				await authApi
					.signup({
						email,
						password,
						username,
					})
					.then(() => navigate("/signin"));
			} catch (error) {
				console.log(error);
			}
		},
		onBlur: async (name, value) => {
			try {
				const isExist = await authApi.isExist(name, value);
				return isExist.data.result;
			} catch (error) {
				console.log(error);
			}
		},
		validate: ({ email, username, password }) => {
			const errors: { [key: string]: string } = {};
			if (!formValidator.validateEmailForm(email)) errors.email = "올바른 이메일을 입력해주세요.";
			if (!formValidator.validateUsername(username)) errors.username = "유저네임을 입력해주세요.";
			if (!formValidator.validatePassword(password))
				errors.password = "대문자와 특수문자를 1자 이상 포함해주세요.";

			return errors;
		},
	});

	return (
		<Container>
			<Header>회원 가입</Header>
			<FormContainer onSubmit={handleSubmit}>
				<Label htmlFor="email">이메일</Label>
				<Input
					name="email"
					type="text"
					onChange={handleChange}
					onBlur={checkDuplicate}
					placeholder="이메일을 입력해주세요"
				/>
				<ErrorText>{errors.email}</ErrorText>
				<Label htmlFor="username">유저네임</Label>
				<Input
					name="username"
					type="text"
					onChange={handleChange}
					onBlur={checkDuplicate}
					placeholder="유저네임을 입력해주세요"
				/>
				<ErrorText>{errors.username}</ErrorText>

				<Label htmlFor="password">비밀번호</Label>
				<Input
					name="password"
					type="password"
					onChange={handleChange}
					placeholder="비밀번호를 입력해주세요"
				/>
				<ErrorText>{errors.password}</ErrorText>

				<Button backgroundColor="black" color="#ffff">
					회원가입
				</Button>
			</FormContainer>
			<Button backgroundColor="#00c73c" color="#ffff">
				네이버로 로그인하기
			</Button>
			<Button backgroundColor="#f8f8f9">구글로 로그인하기</Button>
			<Paragraph to="/signin">로그인하기</Paragraph>
		</Container>
	);
}

const Header = styled.p`
	font-size: 3rem;
	font-weight: 800;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

const FormContainer = styled.form`
	display: flex;
	width: 50rem;
	flex-direction: column;
	justify-content: center;
`;

const Paragraph = styled(Link)`
	font-size: 1.4rem;
	font-weight: 700;
	text-decoration: none;
	margin-top: 3rem;
	color: black;
`;

export default SignUp;
