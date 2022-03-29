import styled from "styled-components";

function Loading() {
	return (
		<Container>
			<h1>loading</h1>
			<img />
		</Container>
	);
}

const Container = styled.div`
	min-height: 80vh;
	font-size: 1.5rem;
`;

export default Loading;
