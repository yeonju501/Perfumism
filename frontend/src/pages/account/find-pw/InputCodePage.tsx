import { useNavigate, useLocation } from "react-router-dom";
import { authApi } from "apis";
import { Container, FormContainer } from "components/account/Container";
import { Button, Input, Label, ErrorText, Header, LinkParagraph } from "components/account/Index";
import useForm from "../hooks/useForm";
import { toast } from "react-toastify";

function InputCodePage() {
	const navigate = useNavigate();
	const { state } = useLocation();
	const { handleChange, handleSubmit, errors } = useForm({
		initialValues: {
			code: "",
		},
		onSubmit: async ({ code }) => {
			try {
				await authApi.checkCode(code).then((res) => {
					res.data.result === true
						? navigate("/password/change-pw", { state })
						: toast.error("코드가 일치하지 않습니다.");
				});
			} catch (error) {
				console.log(error);
			}
		},
		validate: ({ code }) => {
			const errors: { [key: string]: string } = {};
			if (!code) errors.code = "코드를 입력해주세요";
			return errors;
		},
	});
	return (
		<Container>
			<Header>비밀번호 찾기</Header>
			<FormContainer onSubmit={handleSubmit}>
				<Label htmlFor="code">CODE</Label>
				<Input name="code" onChange={handleChange} />
				<ErrorText>{errors.code}</ErrorText>
				<br />
				<Button backgroundColor="black" color="#fff">
					확인
				</Button>
			</FormContainer>
			<LinkParagraph to="/signup">회원가입하러 가기</LinkParagraph>
			<LinkParagraph to="/signin">로그인하러 가기</LinkParagraph>
		</Container>
	);
}

export default InputCodePage;
