import { useNavigate, useLocation } from "react-router-dom";
import { authApi } from "apis";
import { Container, FormContainer } from "components/account/Container";
import { Button, Input, Label, ErrorText, Header } from "components/account/Index";
import { formValidator } from "utils";
import useForm from "pages/account/hooks/useForm";

function CheckPassword() {
	const navigate = useNavigate();
	const { state } = useLocation();

	const { handleChange, handleSubmit, errors } = useForm({
		initialValues: {
			password: "",
		},
		onSubmit: async ({ password }) => {
			try {
				await authApi.findPassword(password).then((res) => {
					res.status === 204 && navigate(`/profile${state}`);
				});
			} catch (error) {
				console.log(error);
			}
		},
		validate: ({ password }) => {
			const errors: { [key: string]: string } = {};
			if (!formValidator.validatePassword(password))
				errors.password = "올바른 비밀번호를 입력해주세요.";
			return errors;
		},
	});
	return (
		<Container>
			<Header>비밀번호 확인</Header>
			<FormContainer onSubmit={handleSubmit}>
				<Label htmlFor="password">비밀번호</Label>
				<Input name="password" onChange={handleChange} />
				<ErrorText>{errors.password}</ErrorText>
				<br />
				<Button backgroundColor="black" color="#fff">
					확인
				</Button>
			</FormContainer>
		</Container>
	);
}

export default CheckPassword;
