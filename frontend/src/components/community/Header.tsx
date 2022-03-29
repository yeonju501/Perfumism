import styled from "styled-components";
import { Button } from "./index";

function Header() {
	return (
		<Container>
			<div>dropdown</div>
			<Button>글쓰기</Button>
		</Container>
	);
}

const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-top: 8rem;
`;

export default Header;
