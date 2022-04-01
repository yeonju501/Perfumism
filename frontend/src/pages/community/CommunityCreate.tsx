import { useNavigate } from "react-router-dom";
import { Container, FormContainer } from "components/community/create/Container";
import { Dropdown, Label, Input, Textarea, Button } from "components/community";
import { formValidator } from "utils";
import useForm from "../account/hooks/useForm";
import communityApi from "apis/community";

function CommunityCreate() {
	const navigate = useNavigate();

	const handleListButtonClick = () => {
		navigate("/community");
	};

	const { handleChange, handleSubmit, errors } = useForm({
		initialValues: {
			subject: "",
			title: "",
			content: "",
		},

		onSubmit: async () => {
			try {
				await communityApi.communityCreate();
			} catch (error) {
				console.log(error);
			}
		},

		validate: ({ subject, title, content }) => {
			const errors: { [key: string]: string } = {};
			if (!formValidator.validateEmailForm(title)) errors.email = "올바른 이메일을 입력해주세요.";
			if (!formValidator.validatePassword(content))
				errors.password = "대문자와 특수문자를 1자 이상 포함해주세요.";
			return errors;
		},
	});

	return (
		<Container>
			<FormContainer>
				<Dropdown />
				<Label htmlFor="title">제목</Label>
				<Input name="title" type="text" placeholder="제목을 입력해주세요." />
				<Label htmlFor="content">내용</Label>
				<Textarea name="content" placeholder="내용을 입력해주세요." />
			</FormContainer>
			<div>
				<Button onClick={handleListButtonClick}>목록</Button>
				<Button>등록</Button>
			</div>
		</Container>
	);
}

export default CommunityCreate;
