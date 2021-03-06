import { useLocation } from "react-router-dom";
import AccordRecommend from "components/recommend/AccordRecommend";
import WordCloud from "components/recommend/WordCloud";
import PerfumeRecommend from "components/recommend/PerfumeRecommend";
import styled from "styled-components";

interface CustomizedState {
	recommendData: {
		accords: [];
		filename: string;
		perfume_list: {
			perfume_id: string;
			name: string;
			image: string;
		}[];
	};
}

function SurveyResult() {
	const { recommendData } = useLocation().state as CustomizedState;
	const accordData = {
		accords: recommendData["accords"],
	};

	return (
		<Container>
			<AccordRecommend accords={accordData["accords"]} />
			<WordCloud url={recommendData["filename"]} />
			<PerfumeRecommend perfumeData={recommendData["perfume_list"]} />
		</Container>
	);
}

const Container = styled.div`
	min-height: 80vh;
	font-size: 1.5rem;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export default SurveyResult;
