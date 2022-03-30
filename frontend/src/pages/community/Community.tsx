import { Header, CommunityList, Pagination } from "components/community";
import styled from "styled-components";

function Community() {
	return (
		<Container>
			<Header />
			<CommunityList />
			<Pagination />
		</Container>
	);
}

const Container = styled.div`
	height: 80vh;
	width: 80rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 20rem;
`;

export default Community;
