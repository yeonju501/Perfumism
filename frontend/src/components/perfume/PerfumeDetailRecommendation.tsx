import perfumeApi from "apis/perfume";
import { useEffect, useState } from "react";
import styled from "styled-components";
import PerfumeList from "./PerfumeList";

interface PerfumeDataProps {
	perfumeData: {
		perfume_name: string;
		brand: {
			brand_name: string;
		};
		similar_perfume: [];
	};
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
