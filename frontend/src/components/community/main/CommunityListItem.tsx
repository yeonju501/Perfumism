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
			<td>{articleItem.article_id}</td>
			<td>{articleItem.subject}</td>
			<td>
				<Link
					to={`/community/${articleItem.article_id}`}
					state={{ articleId: articleItem.article_id }}
				>
					{articleItem.title}
				</Link>
			</td>
			<td>{articleItem.member_name}</td>
			<td>{articleItem.created_at.slice(0, 10)}</td>
		</Container>
	);
}

const Container = styled.tr`
	width: 100%;
`;

export default CommunityListItem;
