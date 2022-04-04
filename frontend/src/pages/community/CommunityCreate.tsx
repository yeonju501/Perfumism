import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, FormContainer } from "components/community/create/Container";
import { Dropdown, Label, Input, Button } from "components/community";
import { ErrorText } from "components/account/Index";
import { formValidator } from "utils";
import useForm from "../account/hooks/useForm";
import communityApi from "apis/community";
import PlusButton from "components/community/create/PlusButton";

function CommunityCreate() {
	const [subject, setSubject] = useState("RECOMMEND");
	const [selectedImg, setSelectedImg] = useState();
	const navigate = useNavigate();
	const toCommunity = () => {
		navigate("/community");
	};
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
				await communityApi.createCommunity(formData);
				navigate("/community");
			} catch (error) {
				console.log(error);
			}
		},

		validate: ({ subject, title, content }) => {
			const errors: { [key: string]: string } = {};
			if (!formValidator.validateSubject(subject)) errors.subject = "말머리를 선택해주세요.";
			if (!formValidator.validateArticle(title)) errors.title = "제목을 입력해주세요.";
			if (!formValidator.validateArticle(content)) errors.content = "내용을 입력해주세요.";
			return errors;
		},
	});

	return (
		<Container>
			<Dropdown setSubject={setSubject} defaultSubject={"RECOMMEND"} />
			<ErrorText>{errors.subject}</ErrorText>
			<FormContainer onSubmit={handleSubmit}>
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
				<Button onClick={toCommunity}>목록</Button>
				<Button>등록</Button>
			</FormContainer>
			<PlusButton />
		</Container>
	);
}

export default CommunityCreate;
