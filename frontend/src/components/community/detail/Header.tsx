import styled from "styled-components";
import { Button } from "../index";

function Header() {
	return (
		<Container>
			<Button>목록</Button>
			<div>
				<Button>수정</Button>
				<Button>삭제</Button>
			</div>
		</Container>
	);
}

const Container = styled.div`
	width: 100%;
	display: flex;
	margin-top: 8rem;
	justify-content: space-between;
`;

export default Header;
