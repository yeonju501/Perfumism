import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, FormContainer, Header, Footer } from "components/community/create/Container";
import { Dropdown, TitleInput, ContentInput, Button, PreviewImage } from "components/community";
import { ErrorText } from "components/account/Index";
import { formValidator } from "utils";
import useForm from "../account/hooks/useForm";
import communityApi from "apis/community";
import EngToKor from "components/community/utils/EngToKor";
import PlusButton from "components/community/create/PlusButton";

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
	const [selectedImg, setSelectedImg] = useState<FileList | null>();
	const [previewImg, setPreviewImg] = useState<string[]>([]);
	const navigate = useNavigate();
	const goBack = () => {
		navigate(`/community/${articleData.article_id}`);
	};

	useEffect(() => {
		if (articleData.image_url_list.length) {
			const tempList = [] as string[];
			articleData.image_url_list.map((url) => tempList.push(url.image_url));
			setPreviewImg(tempList);
		}
	}, []);

	const { values, handleChange, handleTextAreaChange, handleSubmit, errors } = useForm({
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
					? [...selectedImg].forEach((file) => formData.append("image", file))
					: formData.append("image", new Blob([]));
				await communityApi.updateCommunity(articleData.article_id, formData);
				navigate(`/community/${articleData.article_id}`);
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
					<Dropdown defaultSubject={EngToKor(subject) as string} setSubject={setSubject} />
					<ErrorText>{errors.subject}</ErrorText>
					<TitleInput
						name="title"
						type="text"
						onChange={handleChange}
						value={values.title}
						placeholder="제목을 입력해주세요."
					/>
					<ErrorText>{errors.title}</ErrorText>
				</Header>
				{previewImg ? <PreviewImage previewImg={previewImg} /> : <PreviewImage />}
				<ContentInput
					name="content"
					onChange={handleTextAreaChange}
					value={values.content}
					placeholder="내용을 입력해주세요."
				/>
				<ErrorText>{errors.content}</ErrorText>
				<Footer>
					<Button onClick={goBack}>뒤로</Button>
					<Button>수정</Button>
				</Footer>
			</FormContainer>
			<PlusButton setSelectedImg={setSelectedImg} setPreviewImg={setPreviewImg} />
		</Container>
	);
}

export default CommnuityUpdate;
