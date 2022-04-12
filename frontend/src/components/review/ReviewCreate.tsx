import reviewApi from "apis/review";
import { CreateButton } from "components/button/Button";
import { FormContainer } from "./Container";
import StarRating from "./StarRating";
import Textarea from "./Textarea";
import cookie from "react-cookies";
import styled from "styled-components";
import useCreateForm from "./hooks/useCreateForm";

interface Props {
	perfumeId: string;
	setUpdateReviews: React.Dispatch<React.SetStateAction<boolean>>;
}

function ReviewCreate({ perfumeId, setUpdateReviews }: Props) {
	const token = cookie.load("access_token");

	const {
		handleInputChange,
		handleFormSubmit,
		handleNonMemberInputClick,
		setGrade,
		grade,
		content,
		setContent,
	} = useCreateForm({
		onSubmit: async () => {
			if (content.trim() && grade) {
				await reviewApi.createReview({ grade, content }, perfumeId);
				setGrade(0);
				setContent("");
				setUpdateReviews((prev) => !prev);
			} else {
				alert("평점과 리뷰 내용을 모두 입력해주세요");
			}
		},
	});

	return (
		<FormContainer onSubmit={handleFormSubmit}>
			<StarRating grade={grade} setGrade={setGrade} />
			{token ? (
				<FormArea>
					<Textarea
						value={content}
						onChange={handleInputChange}
						placeholder="리뷰를 입력하세요"
					></Textarea>
					<CreateButton>작성</CreateButton>
				</FormArea>
			) : (
				<Textarea
					placeholder="로그인 후 사용해주세요"
					onClick={handleNonMemberInputClick}
				></Textarea>
			)}
		</FormContainer>
	);
}

const FormArea = styled.div`
	display: flex;
	align-items: center;
`;

export default ReviewCreate;
