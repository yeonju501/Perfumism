import perfumeApi from "apis/perfume";
import { useEffect, useState } from "react";
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
	const [brandBasedRecommendation, setBrandBasedRecommendation] = useState([]);

	useEffect(() => {
		perfumeApi.getBrandPerfumes(perfumeData.brand.brand_name, 0, "totalLike").then((res) => {
			setBrandBasedRecommendation(res.data.perfumes);
		});
	}, []);

	return (
		<div>
			<Recommendation>
				<p>
					<span style={{ fontWeight: "bold", fontSize: "2.2rem" }}>{perfumeData.perfume_name}</span>{" "}
					과 비슷한 향수
				</p>
				<PerfumeList perfumes={perfumeData.similar_perfume} />
				<p>
					<span style={{ fontWeight: "bold", fontSize: "2.2rem" }}>
						{perfumeData.brand.brand_name}
					</span>{" "}
					의 다른 향수
				</p>
				<PerfumeList perfumes={brandBasedRecommendation} />
			</Recommendation>
		</div>
	);
}

const Recommendation = styled.div`
	border-top: 0.5px solid #dedede;
	border-bottom: 0.5px solid #dedede;
	padding: 5rem 0;
`;

export default PerfumeDetailRecommendation;
