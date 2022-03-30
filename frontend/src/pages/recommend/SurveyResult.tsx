import { useLocation } from "react-router-dom";
import AccordRecommend from "components/recommend/AccordRecommend";
import WordCloud from "components/recommend/WordCloud";
import PerfumeRecommend from "components/recommend/PerfumeRecommend";
import styled from "styled-components";

function SurveyResult() {
	const location = useLocation();
	const { recommendData }: any = location.state;
	console.log(recommendData[0]);

	const perfumeData = [
		{
			id: recommendData[0]["perfume_id"],
			perfume: recommendData[0]["name"],
			image: recommendData[0]["image"],
		},
		{
			id: recommendData[1]["perfume_id"],
			perfume: recommendData[1]["name"],
			image: recommendData[1]["image"],
		},
		{
			id: recommendData[2]["perfume_id"],
			perfume: recommendData[2]["name"],
			image: recommendData[2]["image"],
		},
	];
	const accordData = {
		accords: ["powdery", "woody", "violet"],
	};

	return (
		<Container>
			<AccordRecommend accords={accordData["accords"]} />
			<WordCloud />
			<PerfumeRecommend perfumeData={perfumeData} />
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
