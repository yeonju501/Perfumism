import styled from "styled-components";
import RecommendList from "./RecommendList";

interface RecommendProps {
	perfumeData: {
		perfume_id: string;
		name: string;
		image: string;
	}[];
}

function PerfumeRecommend({ perfumeData }: RecommendProps) {
	return (
		<>
			<Header>추천 향수</Header>
			<Container>
				{perfumeData.map((perfume, idx) => (
					<RecommendList perfume={perfume} key={idx} />
				))}
			</Container>
		</>
	);
}

const Container = styled.div`
	display: flex;
	@media ${(props) => props.theme.mobileS} {
		flex-direction: column;
	}
	margin-bottom: 3rem;
`;

const Header = styled.h1``;

export default PerfumeRecommend;
