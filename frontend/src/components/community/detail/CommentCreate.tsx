import communityApi from "apis/community";
import { CreateButton } from "components/button/Button";
import useCreateForm from "components/review/hooks/useCreateForm";
import Textarea from "components/review/Textarea";
import styled from "styled-components";

interface Props {
	articleId: number;
	setUpdateComments: React.Dispatch<React.SetStateAction<boolean>>;
}

function CommentCreate({ articleId, setUpdateComments }: Props) {
	const { handleInputChange, content, setContent, handleFormSubmit } = useCreateForm({
		onSubmit: async () => {
			if (content.trim()) {
				await communityApi.createComment(articleId, { content });
				setContent("");
				setUpdateComments((prev) => !prev);
			} else {
				alert("댓글 내용을 입력해주세요");
			}
		},
	});

	return (
		<FormContainer onSubmit={handleFormSubmit}>
			<Textarea
				placeholder="댓글을 입력하세요"
				value={content}
				onChange={handleInputChange}
			></Textarea>
			<CreateButton>작성</CreateButton>
		</FormContainer>
	);
}

const FormContainer = styled.form`
	margin: 2rem 0;
	padding: 1rem;
	border: 0.3px solid #dedede;
	display: flex;
	align-items: center;
`;

export default CommentCreate;
