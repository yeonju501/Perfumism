import styled from "styled-components";
import { RecommendSection, PerfumesSection } from "components/main";
import ReviewSection from "components/main/ReviewSection";

function MainPage() {
	return (
		<Main>
			<RecommendSection />
			<ReviewSection />
			<PerfumesSection />
		</Main>
	);
}

export default MainPage;

const Main = styled.main`
	display: flex;
	flex-direction: column;
	height: 100%;
`;
