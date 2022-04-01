import { useNavigate } from "react-router-dom";
import { authApi } from "apis";
import { Container, FormContainer } from "components/account/Container";
import { Button, Input, Label, ErrorText, Header, LinkParagraph } from "components/account/Index";
import { formValidator } from "utils";
import useForm from "../hooks/useForm";
import { useState } from "react";
import Spinner from "components/Spinner";

function FindPassword() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const { handleChange, handleSubmit, errors } = useForm({
		initialValues: {
			email: "",
		},
		onSubmit: async ({ email }) => {
			setLoading(true);
			try {
				await authApi.findPassword(email).then((res) => {
					res.status === 204 && navigate("/check-code", { state: email });
				});
			} catch (error) {
				console.log(error);
			}
			setLoading(false);
		},
		validate: ({ email }) => {
			const errors: { [key: string]: string } = {};
			if (!formValidator.validateEmailForm(email)) errors.email = "올바른 이메일을 입력해주세요.";
			return errors;
		},
	});
	return loading ? (
		<Spinner />
	) : (
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
