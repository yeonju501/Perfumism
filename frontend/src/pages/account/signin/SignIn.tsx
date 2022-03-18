import { useNavigate } from "react-router";
import { FormContainer, Container } from "components/account/Container";
import { Button, Input, Label, ErrorText, Header, LinkParagraph } from "components/account/Index";
import { formValidator } from "utils";
import { authApi } from "apis";
import useForm from "../hooks/useForm";

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
					.then(() => navigate("/"));
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
		</Container>
	);
}

export default SignIn;
