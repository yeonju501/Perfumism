import styled from "styled-components";
import Navbar from "components/main/Navbar";
import { RecommendSection, PerfumesSection } from "components/main";

function MainPage() {
	return (
		<Main>
			<Navbar />
			<RecommendSection />
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
