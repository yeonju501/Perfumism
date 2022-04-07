import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, FormContainer, Header, Footer } from "components/community/create/Container";
import { Dropdown, TitleInput, ContentInput, Button, PreviewImage } from "components/community";
import { ErrorText } from "components/account/Index";
import { formValidator } from "utils";
import useForm from "../account/hooks/useForm";
import communityApi from "apis/community";
import PlusButton from "components/community/create/PlusButton";

function CommunityCreate() {
	const [subject, setSubject] = useState("TALK");
	const [selectedImg, setSelectedImg] = useState<FileList | null>();
	const [previewImg, setPreviewImg] = useState<string[]>([]);
	const navigate = useNavigate();
	const toCommunity = () => {
		navigate("/community");
	};
	const { values, handleChange, handleTextAreaChange, handleSubmit, errors } = useForm({
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
					? [...selectedImg].forEach((file) => formData.append("image", file))
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
			<FormContainer onSubmit={handleSubmit}>
				<Header>
					<Dropdown setSubject={setSubject} defaultSubject={"TALK"} />
					<ErrorText>{errors.subject}</ErrorText>
					<TitleInput
						name="title"
						type="text"
						onChange={handleChange}
						placeholder="제목을 입력해주세요."
					/>
					<ErrorText>{errors.title}</ErrorText>
				</Header>
				{previewImg ? <PreviewImage previewImg={previewImg} /> : <PreviewImage />}
				<ContentInput
					name="content"
					onChange={handleTextAreaChange}
					placeholder="내용을 입력해주세요."
				/>
				<ErrorText>{errors.content}</ErrorText>
				<Footer>
					<Button onClick={toCommunity}>목록</Button>
					<Button>등록</Button>
				</Footer>
				<PlusButton setSelectedImg={setSelectedImg} setPreviewImg={setPreviewImg} />
			</FormContainer>
		</Container>
	);
}

export default CommunityCreate;
