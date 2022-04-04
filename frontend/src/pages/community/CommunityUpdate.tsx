import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, FormContainer } from "components/community/create/Container";
import { Dropdown, Label, Input, Button } from "components/community";
import { ErrorText } from "components/account/Index";
import { formValidator } from "utils";
import useForm from "../account/hooks/useForm";
import communityApi from "apis/community";

interface CustomizedState {
	articleData: {
		article_id: number;
		member_id: number;
		member_name: string;
		member_image: string;
		subject: string;
		title: string;
		content: string;
		createAt: string;
		updateAt: string;
		deleteAt: string;
		vote_exist: boolean;
		image_url_list: {
			article_image_id: number;
			createdAt: string;
			deletedAt: string;
			updatedAt: string;
			image_url: string;
		}[];
	};
}

function CommnuityUpdate() {
	const { articleData } = useLocation().state as CustomizedState;
	const [subject, setSubject] = useState(articleData.subject);
	const [selectedImg, setSelectedImg] = useState();
	const navigate = useNavigate();

	const { values, handleChange, handleSubmit, errors } = useForm({
		initialValues: {
			title: articleData.title,
			content: articleData.content,
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
				await communityApi.updateCommunity(articleData.article_id, formData);
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
				<Dropdown defaultSubject={subject} />
				<Label htmlFor="title">제목</Label>
				<Input
					name="title"
					type="text"
					onChange={handleChange}
					value={values.title}
					placeholder="제목을 입력해주세요."
				/>
				<ErrorText>{errors.title}</ErrorText>
				<Label htmlFor="content">내용</Label>
				<Input
					name="content"
					onChange={handleChange}
					value={values.content}
					placeholder="내용을 입력해주세요."
				/>
				<ErrorText>{errors.content}</ErrorText>
				<Button>수정</Button>
			</FormContainer>
		</Container>
	);
}

export default CommnuityUpdate;
