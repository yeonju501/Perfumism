import styled from "styled-components";
import { Link } from "react-router-dom";

interface ArticleProps {
	articleItem: {
		articleList: {
			article_id: number;
			member_id: number;
			member_name: string;
			subject: string;
			title: string;
			content: string;
			createAt: string;
			updateAt: string;
			deleteAt: string;
		}[];
		total_page_count: number;
		current_page_count: number;
	};
}

function CommunityListItem({ articleItem }: ArticleProps) {
	return (
		<Container>
			<td>{articleItem["articleList"][0]["article_id"]}</td>
			<td>{articleItem["articleList"][0]["subject"]}</td>
			<td>
				<Link
					to={`/community/${articleItem["articleList"][0]["article_id"]}`}
					state={{ articleId: articleItem["articleList"][0]["article_id"] }}
				>
					{articleItem["articleList"][0]["title"]}
				</Link>
			</td>
			<td>{articleItem["articleList"][0]["member_name"]}</td>
			<td>{articleItem["articleList"][0]["createAt"].slice(0, 9)}</td>
		</Container>
	);
}

const Container = styled.tr`
	width: 100%;
`;

export default CommunityListItem;
