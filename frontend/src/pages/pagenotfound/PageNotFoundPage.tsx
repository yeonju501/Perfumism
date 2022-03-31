import styled from "styled-components";
import { Link } from "react-router-dom";

function PageNotFoundPage() {
	return (
		<Container>
			<Header>Page not found</Header>
			<Button to="/">BACK HOME</Button>
		</Container>
	);
}

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Header = styled.h1`
	text-align: center;
	font-size: 5rem;
	margin-top: 0;
`;

const Button = styled(Link)`
	width: 30rem;
	height: 5rem;
	background-color: black;
	border: none;
	border-radius: 1rem;
	color: #fff;
	font-weight: bold;
	font-size: 2rem;
	text-decoration: none;
	display: flex;
	justify-content: center;
	align-items: center;
	:hover {
		cursor: pointer;
	}
`;

export default PageNotFoundPage;
