import styled from "styled-components";

interface ArticleProps {
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

function Content({ articleData }: ArticleProps) {
	return (
		<Container>
			<Title>제목</Title>
			<SubTitle>작성자</SubTitle>
			<Body>내용</Body>
		</Container>
	);
}

const Container = styled.div`
	width: 100%;
	display: flex;
	margin-top: 8rem;
	flex-direction: column;
	border-style: inset;
`;

const Title = styled.p`
	border-bottom-style: groove;
	font-size: 2rem;
	margin: 1rem 0;
`;

const SubTitle = styled.p`
	border-bottom-style: groove;
	font-size: 1.5rem;
	margin: 1rem 0;
`;

const Body = styled.p`
	min-height: 20vh;
	font-size: 1.5rem;
	margin: 1rem 0;
`;

export default Content;
