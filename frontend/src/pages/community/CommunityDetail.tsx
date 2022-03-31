import { DetailHeader, DetailContent, DetailComment } from "components/community";
import styled from "styled-components";

function CommunityDetaul() {
	return (
		<Container>
			<DetailHeader />
			<DetailContent />
			<DetailComment />
		</Container>
	);
}

const Container = styled.div`
	height: 80vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 30%;
`;

export default CommunityDetaul;
