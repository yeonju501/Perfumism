import { Link } from "react-router-dom";
import { Container, FormContainer } from "components/community/create/Container";
import { Dropdown, Label, Input, Textarea, Button } from "components/community";
import { ErrorText } from "components/account/Index";
import { formValidator } from "utils";
import useForm from "../account/hooks/useForm";
import communityApi from "apis/community";

function CommunityCreate() {
	const { values, handleChange, handleSubmit, errors } = useForm({
		initialValues: {
			subject: "ALL",
			title: "",
			content: "",
		},

		onSubmit: async () => {
			try {
				const formData = new FormData();
				formData.append("subject", values.subject);
				formData.append("title", values.title);
				formData.append("content", values.content);
				await communityApi.communityCreate(formData);
			} catch (error) {
				console.log(error);
			}
		},

		validate: ({ subject, title, content }) => {
			const errors: { [key: string]: string } = {};
			if (!formValidator.validateSubject(subject)) errors.email = "말머리를 선택해주세요.";
			if (!formValidator.validateArticle(title)) errors.email = "제목을 입력해주세요.";
			if (!formValidator.validateArticle(content)) errors.password = "내용을 입력해주세요.";
			return errors;
		},
	});

	return (
		<Container>
			<FormContainer onSubmit={handleSubmit}>
				<Dropdown />
				<Label htmlFor="title">제목</Label>
				<Input
					name="title"
					type="text"
					onChange={handleChange}
					placeholder="제목을 입력해주세요."
				/>
				<ErrorText>{errors.title}</ErrorText>
				<Label htmlFor="content">내용</Label>
				<Input name="content" onChange={handleChange} placeholder="내용을 입력해주세요." />
				<ErrorText>{errors.content}</ErrorText>
				<Link to="/community">목록</Link>
				<Button>등록</Button>
			</FormContainer>
		</Container>
	);
}

export default CommunityCreate;
