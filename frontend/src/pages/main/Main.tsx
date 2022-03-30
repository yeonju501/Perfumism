import styled from "styled-components";
import { RecommendSection, PerfumesSection, ReviewSection, MonthOfPerfumes } from "components/main";

function MainPage() {
	return (
		<Main>
			<RecommendSection />
			<ReviewSection />
			<PerfumesSection />
			<MonthOfPerfumes />
		</Main>
	);
}

export default MainPage;

const Main = styled.main`
	display: flex;
	flex-direction: column;
	height: 100%;
`;
