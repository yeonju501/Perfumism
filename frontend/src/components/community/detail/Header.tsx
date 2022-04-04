import { useNavigate } from "react-router-dom";
import communityApi from "apis/community";
import styled from "styled-components";
import { Button } from "../index";

interface ArticleIdType {
	articleId: string | undefined;
}

function Header({ articleId }: ArticleIdType) {
	const handleDeleteClick = async (articleId: string) => {
		if (window.confirm("리뷰를 삭제 하시겠습니까?")) {
			await communityApi.deleteCommunity(articleId);
			navigate("/community");
		}
	};

	const navigate = useNavigate();

	const handleListButtonClick = () => {
		navigate("/community");
	};

	return (
		<Container>
			<Button onClick={handleListButtonClick}>목록</Button>
			<div>
				<Button>수정</Button>
				<Button onClick={() => handleDeleteClick(articleId)}>삭제</Button>
			</div>
		</Container>
	);
}

const Container = styled.div`
	width: 100%;
	display: flex;
	margin-top: 8rem;
	justify-content: space-between;
`;

export default Header;
