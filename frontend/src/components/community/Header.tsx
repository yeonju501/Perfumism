import styled from "styled-components";

function Header() {
	return (
		<Container>
			<div>dropdown</div>
			<div>글쓰기버튼</div>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
`;

export default Header;
