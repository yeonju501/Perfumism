import reviewApi from "apis/review";
import { CreateButton } from "components/button/Button";
import { FormContainer } from "./Container";
import StarRating from "./StarRating";
import Textarea from "./Textarea";
import cookie from "react-cookies";
import useReviewForm from "./hooks/useReviewForm";
import styled from "styled-components";

interface ReviewCreateProp {
	perfumeId: string;
	setUpdateReviews: React.Dispatch<React.SetStateAction<boolean>>;
}

function ReviewCreate({ perfumeId, setUpdateReviews }: ReviewCreateProp) {
	const token = cookie.load("access_token");

	const {
		handleInputChange,
		handleFormSubmit,
		handleNonMemberInputClick,
		setGrade,
		grade,
		content,
	} = useReviewForm({
		sendReviewData: () => {
			return reviewApi.createReview({ grade, content }, perfumeId);
		},
	});

	const handleSubmitReview = async (e: React.FormEvent<HTMLFormElement>) => {
		await handleFormSubmit(e);
		setUpdateReviews((prev) => !prev);
	};

	return (
		<FormContainer onSubmit={handleSubmitReview}>
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
