import { Link } from "react-router-dom";
import styled from "styled-components";

function Recommend() {
	return (
		<Container>
			<div>
				<h1>Find your signature scent</h1>
			</div>
			<div>
				<Link to={"/survey?page=1"}>
					<button>누구나 자신만의 향기가 있습니다.</button>
				</Link>
			</div>
			<div>
				<button>자신만의 향기가 있는 당신, 비슷한 향기를 찾아보세요</button>
			</div>
		</Container>
	);
}

const Container = styled.div`
	height: 80vh;
	font-size: 1.5rem;
	display: flex;
	flex-direction: column;
`;

export default Recommend;
