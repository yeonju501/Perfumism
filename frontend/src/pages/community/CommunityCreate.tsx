import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, FormContainer } from "components/community/create/Container";
import { Dropdown, Label, Input, Button } from "components/community";
import { ErrorText } from "components/account/Index";
import { formValidator } from "utils";
import useForm from "../account/hooks/useForm";
import communityApi from "apis/community";

function CommunityCreate() {
	const [subject, setSubject] = useState("TALK");
	const [selectedImg, setSelectedImg] = useState();
	const { values, handleChange, handleSubmit, errors } = useForm({
		initialValues: {
			title: "",
			content: "",
		},

		onSubmit: async (values) => {
			try {
				const formData = new FormData();
				const article = { subject: subject, title: values.title, content: values.content };
				formData.append(
					"article",
					new Blob([JSON.stringify(article)], { type: "application/json" }),
				);
				selectedImg
					? formData.append("image", selectedImg)
					: formData.append("image", new Blob([]));
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
