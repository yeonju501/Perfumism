import PerfumeList from "components/perfume/PerfumeList";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

interface StateProps {
	keyword: string;
	results: [];
}

function SearchResultPage() {
	const location = useLocation();
	const state = location.state as StateProps;

	return (
		<Page>
			{state.results.length > 0 ? (
				<PerfumeList perfumes={state.results} />
			) : (
				<NoResult>입력하신 {state.keyword}에 대한 결과가 없습니다.</NoResult>
			)}
		</Page>
	);
}

export default SearchResultPage;

const Page = styled.main`
	height: 100vh;
`;

const NoResult = styled.h1`
	text-align: center;
	font-size: 3rem;
	margin-top: 5rem;
`;
