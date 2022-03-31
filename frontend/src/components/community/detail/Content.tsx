import styled from "styled-components";

function Content() {
	return (
		<Container>
			<p>제목</p>
			<p>작성자</p>
			<p>내용</p>
		</Container>
	);
}

const Container = styled.div`
	width: 100%;
	display: flex;
	margin-top: 8rem;
	flex-direction: column;
`;

export default Content;
