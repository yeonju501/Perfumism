import styled from "styled-components";
import PerfumeList from "components/perfume/PerfumeList";

interface RecommendProps {
	perfumeData: {
		id: number;
		perfume: string;
		brand: string;
		image: string;
		launch_year: number;
		main_accords: string;
		notes: string;
		longevity: string;
		sillage: string;
		total_survey: number;
		similar_perfume: number[];
	}[];
}

function PerfumeRecommend({ perfumeData }: RecommendProps) {
	const perfumeList = [
		{
			perfume_id: String(perfumeData[0]["id"]),
			perfume_name: perfumeData[0]["perfume"],
			image: perfumeData[0]["image"],
		},
		{
			perfume_id: String(perfumeData[1]["id"]),
			perfume_name: perfumeData[1]["perfume"],
			image: perfumeData[1]["image"],
		},
		{
			perfume_id: String(perfumeData[2]["id"]),
			perfume_name: perfumeData[2]["perfume"],
			image: perfumeData[2]["image"],
		},
	];

	return (
		<Container>
			<PerfumeList perfumes={perfumeList} />
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

export default PerfumeRecommend;
