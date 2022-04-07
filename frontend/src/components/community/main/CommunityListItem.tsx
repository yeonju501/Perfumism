import styled from "styled-components";
import { Link } from "react-router-dom";
import EngToKor from "../utils/EngToKor";

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
			<Td>{EngToKor(articleItem.subject)}</Td>
			<Td>
				<Link to={`/community/${articleItem.article_id}`}>{articleItem.title}</Link>
			</Td>
			<Td>{articleItem.member_name}</Td>
			<Date>{articleItem.created_at.slice(0, 10)}</Date>
		</Tr>
	);
}

const Tr = styled.tr`
	width: 100%;
`;

const Td = styled.td`
	padding: 1rem 0.5rem;
`;

const Date = styled(Td)`
	@media ${(props) => props.theme.mobile} {
		display: none;
	}
`;

const ArticleId = styled(Td)`
	@media ${(props) => props.theme.mobileXS} {
		display: none;
	}
`;
export default CommunityListItem;
