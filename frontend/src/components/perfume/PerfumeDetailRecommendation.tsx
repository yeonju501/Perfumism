import perfumeApi from "apis/perfume";
import { useEffect, useState } from "react";
import styled from "styled-components";
import PerfumeList from "./PerfumeList";

interface Props {
	perfumeData: {
		perfume_name: string;
		brand: {
			brand_name: string;
		};
		similar_perfume: [];
	};
}

function PerfumeDetailRecommendation({ perfumeData }: Props) {
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
					<Title>{perfumeData.perfume_name}</Title>과 비슷한 향수
				</p>
				<PerfumeList perfumes={perfumeData.similar_perfume} />
				<BrandRecommendation>
					<Title>{perfumeData.brand.brand_name}</Title>의 다른 향수
				</BrandRecommendation>
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

const Title = styled.span`
	font-weight: bold;
	font-size: 2.2rem;
	margin-right: 1rem;
`;

const BrandRecommendation = styled.p`
	padding-top: 5rem;
	border-top: 0.3px solid #eeeeee;
`;

export default PerfumeDetailRecommendation;
