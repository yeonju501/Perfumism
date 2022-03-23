import styled from "styled-components";
import Navbar from "components/main/Navbar";
import RecommendSection from "components/main/RecommendSection";

function MainPage() {
	return (
		<Main>
			<Navbar />
			<RecommendSection />
		</Main>
	);
}

export default MainPage;

const Main = styled.main`
	display: flex;
	flex-direction: column;
	height: 100vh;
`;
