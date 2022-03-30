import styled from "styled-components";

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
			<td>{articleItem["articleList"][0]["title"]}</td>
			<td>{articleItem["articleList"][0]["member_name"]}</td>
			<td>{articleItem["articleList"][0]["createAt"]}</td>
		</Container>
	);
}

const Container = styled.tr`
	width: 100%;
`;

export default CommunityListItem;
