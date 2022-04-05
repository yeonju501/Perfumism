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
			<Title>{articleData.title}</Title>
			<SubTitle>{articleData.member_name}</SubTitle>
			<Body>{articleData.content}</Body>
		</Container>
	);
}

const Container = styled.div`
	width: 100%;
	display: flex;
	margin-top: 2rem;
	flex-direction: column;
`;

const Title = styled.p`
	font-size: 2rem;
	margin: 1rem 0;
`;

const SubTitle = styled.p`
	font-size: 1.5rem;
	margin: 1rem 0;
`;

const Body = styled.p`
	min-height: 20vh;
	font-size: 1.5rem;
	margin: 1rem 0;
`;

export default Content;
