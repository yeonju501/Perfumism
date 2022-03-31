import { Container, FormContainer } from "components/account/Container";
import { Button, Input, Label, ErrorText, Header } from "components/account/Index";
import { profileApi } from "apis";
import { formValidator } from "utils";
import useForm from "pages/account/hooks/useForm";
import { toast } from "react-toastify";

function ChangePassword() {
	const { handleChange, handleSubmit, errors } = useForm({
		initialValues: {
			password: "",
			confirmPassword: "",
		},
		onSubmit: async ({ password }) => {
			try {
				await profileApi.changePassword(password).then((res) => {
					console.log(res);
					if (res.status === 204) {
						toast.success("비밀번호가 변경 되었습니다");
						setTimeout(() => location.replace("/"), 2000);
					}
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
			<Header>비밀번호 변경</Header>
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
		</Container>
	);
}

export default ChangePassword;
