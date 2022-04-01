import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../index";

function Header() {
	const navigate = useNavigate();

	const handleListButtonClick = () => {
		navigate("/community");
	};

	return (
		<Container>
			<Button onClick={handleListButtonClick}>목록</Button>
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
