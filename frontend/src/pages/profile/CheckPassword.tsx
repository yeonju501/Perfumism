import { useNavigate } from "react-router-dom";
import { profileApi } from "apis";
import { Container, FormContainer } from "components/account/Container";
import { Button, Input, Label, ErrorText, Header } from "components/account/Index";
import { formValidator } from "utils";
import useForm from "pages/account/hooks/useForm";
import { useSelector } from "react-redux";
import { RootState } from "store";

interface Prop {
	setIsCheck?: React.Dispatch<React.SetStateAction<boolean>>;
}

function CheckPassword({ setIsCheck }: Prop) {
	const navigate = useNavigate();
	const username = useSelector((state: RootState) => state.user.username);

	const { handleChange, handleSubmit, errors } = useForm({
		initialValues: {
			password: "",
		},
		onSubmit: async ({ password }) => {
			try {
				await profileApi.checkPassword(password).then((res) => {
					if (res.status === 204) {
						setIsCheck && setIsCheck(true);
						navigate(`/profile/${username}`);
					}
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
				<Input type="password" name="password" onChange={handleChange} />
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
