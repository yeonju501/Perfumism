import styled from "styled-components";
import Navbar from "components/navbar/Navbar";
import { RecommendSection, PerfumesSection } from "components/main";

function MainPage() {
	return (
		<Main>
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
