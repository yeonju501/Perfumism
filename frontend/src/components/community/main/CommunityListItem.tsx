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
		<Tr>
			<Td>{articleItem.article_id}</Td>
			<Td>{articleItem.subject}</Td>
			<Td>
				<Link to={`/community/${articleItem.article_id}`}>{articleItem.title}</Link>
			</Td>
			<Td>{articleItem.member_name}</Td>
			<Td>{articleItem.created_at.slice(0, 10)}</Td>
		</Tr>
	);
}

const Tr = styled.tr`
	width: 100%;
	&:hover {
		background-color: #eceaea;
		cursor: default;
	}
`;

const Td = styled.td`
	padding: 10px 5px;
`;

export default CommunityListItem;
