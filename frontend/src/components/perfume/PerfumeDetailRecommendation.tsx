import styled from "styled-components";
import PerfumeList from "./PerfumeList";

interface PerfumeDataProps {
	perfumeData: PerfumeDataType;
}

interface PerfumeDataType {
	perfume_id: number;
	perfume_name: string;
	brand: {
		brand_id: number;
		brand_name: string;
	};
	image: string;
	launch_year: number;
	average_grade: number;
	top_notes: string;
	middle_notes: string | null;
	base_notes: string | null;
	total_survey: number;
	longevity: string;
	sillage: string;
	accords: AccordType[];
	similar_perfume: [];
	likes: number;
}

interface AccordType {
	accord_id: number;
	kor_name: string;
	eng_name: string;
}

function PerfumeDetailRecommendation({ perfumeData }: PerfumeDataProps) {
	return (
		<div>
			<Recommendation>
				<p>{perfumeData.perfume_name}과 비슷한 향수</p>
				<PerfumeList perfumes={perfumeData.similar_perfume} />
				<p>{perfumeData.brand.brand_name}의 다른 향수</p>
			</Recommendation>
		</div>
	);
}

const Recommendation = styled.div``;

export default PerfumeDetailRecommendation;
