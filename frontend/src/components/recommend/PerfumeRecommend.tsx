import styled from "styled-components";
import PerfumeList from "components/perfume/PerfumeList";

interface RecommendProps {
	perfumeData: {
		perfume_id: string;
		perfume_name: string;
		image: string;
	}[];
}

function PerfumeRecommend({ perfumeData }: RecommendProps) {
	return (
		<Container>
			<Header>추천 향수</Header>
			<PerfumeList perfumes={perfumeData} />
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Header = styled.h1``;

export default PerfumeRecommend;
