import styled from "styled-components";
import { Link } from "react-router-dom";

interface ArticleProps {
	articleItem: {
		article_id: number;
		member_id: number;
		member_name: string;
		subject: string;
		title: string;
		content: string;
		created_at: string;
		updated_at: string | null;
		deleted_at: string | null;
	};
}

function CommunityListItem({ articleItem }: ArticleProps) {
	return (
		<Container>
			<Td>{articleItem.article_id}</Td>
			<Td>{articleItem.subject}</Td>
			<Td>
				<Link to={`/community/${articleItem.article_id}`}>{articleItem.title}</Link>
			</Td>
			<Td>{articleItem.member_name}</Td>
			<Td>{articleItem.created_at.slice(0, 10)}</Td>
		</Container>
	);
}

const Container = styled.tr`
	width: 100%;
`;

const Td = styled.td``;

export default CommunityListItem;
