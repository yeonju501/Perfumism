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
			<PerfumeList perfumes={perfumeData} />
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

export default PerfumeRecommend;
