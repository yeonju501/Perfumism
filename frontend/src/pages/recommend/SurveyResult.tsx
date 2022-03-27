import AccordRecommend from "components/recommend/AccordRecommend";
import WordCloud from "components/recommend/WordCloud";
import PerfumeRecommend from "components/recommend/PerfumeRecommend";
import styled from "styled-components";

function SurveyResult() {
	const perfumeData = [
		{
			id: 36998,
			perfume: "Belle de Tanger",
			brand: "Byredo",
			image: "o.40622.jpg",
			launch_year: 2016.0,
			main_accords: "citrus woody powdery iris violet fresh musky amber earthy",
			notes: "Orris Violet Cashmere Wood Bitter Orange",
			longevity: "very weak",
			sillage: "intimate",
			total_survey: 754,
			similar_perfume: [36964, 33652, 11346, 9168, 34486, 21911, 22504, 12473, 23957, 7388],
		},
		{
			id: 36999,
			perfume: "Biblioth",
			brand: "Byredo",
			image: "o.43324.jpg",
			launch_year: 2017.0,
			main_accords: "fruity leather powdery sweet violet animalic patchouli vanilla floral woody",
			notes: "Violet Peony Leather Patchouli Vanilla Musk Plum Peach",
			longevity: "weak",
			sillage: "moderate",
			total_survey: 1044,
			similar_perfume: [19586, 5834, 26164, 16383, 7120, 6373, 24857, 17389, 27290, 3550],
		},
		{
			id: 37000,
			perfume: "Black Saffron",
			brand: "Byredo",
			image: "o.16220.jpg",
			launch_year: 2012.0,
			main_accords:
				"leather fruity woody aromatic warm spicy sweet powdery animalic fresh spicy violet",
			notes:
				"Leather Black Violet Raspberry Cashmeran Vetiver Saffron Juniper Berries Chinese Grapefruit",
			longevity: "eternal",
			sillage: "moderate",
			total_survey: 1617,
			similar_perfume: [33739, 24400, 19642, 12382, 34789, 14633, 5294, 10675, 1081, 13304],
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
