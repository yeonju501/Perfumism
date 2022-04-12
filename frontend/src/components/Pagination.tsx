import styled from "styled-components";
import { Article } from "types/article";
import { Comment } from "types/comment";

interface Props {
	total: number;
	page: number;
	setData: React.Dispatch<React.SetStateAction<DataType>>;
}

interface DataType {
	articleList?: Article[];
	commentList?: Comment[];
	total_page_count: number;
	current_page_count: number;
}

function Pagination({ total, page, setData }: Props) {
	return (
		<>
			<Nav>
				<Button
					onClick={() => setData((prev) => ({ ...prev, current_page_count: page - 1 }))}
					disabled={page === 0}
				>
					&lt;
				</Button>
				{Array(total)
					.fill("")
					.map((_, i) => (
						<Button
							key={i + 1}
							onClick={() => setData((prev) => ({ ...prev, current_page_count: i }))}
							aria-current={page === i && "true"}
						>
							{i + 1}
						</Button>
					))}
				<Button
					onClick={() => setData((prev) => ({ ...prev, current_page_count: page + 1 }))}
					disabled={page === total - 1}
				>
					&gt;
				</Button>
			</Nav>
		</>
	);
}

export default Pagination;

const Nav = styled.nav`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.4rem;
	margin: 2rem;
	margin-bottom: 5rem;
`;

const Button = styled.button`
	border: none;
	border-radius: 0.8rem;
	width: max-content;
	padding: 1rem;
	margin: 0;
	background: transparent;
	color: black;
	font-size: 2.2rem;
	&:hover {
		background: tomato;
		cursor: pointer;
		transform: translateY(-2px);
		height: auto;
	}

	&:disabled {
		background: transparent;
		cursor: revert;
		transform: revert;
	}
	&[aria-current="true"] {
		background: #000;
		font-weight: bold;
		color: white;
		cursor: revert;
		transform: revert;
		font-size: 1.5rem;
		width: max-content;
		height: auto;
	}
`;
