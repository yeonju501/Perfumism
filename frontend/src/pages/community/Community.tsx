import { Header, CommunityList } from "components/community";
import styled from "styled-components";

function Community() {
	return (
		<Container>
			<Header />
			<CommunityList />
			<div>pagination</div>
		</Container>
	);
}

const Container = styled.div`
	height: 80vh;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export default Community;
