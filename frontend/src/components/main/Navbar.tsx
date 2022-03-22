
interface NavProps {
	justifyContent?: string;
}

interface HeaderProps {
	scrollHeader: number;
}

function Navbar() {


	return (
		
	);
}

const Header = styled.header<HeaderProps>`
	background: ${({ scrollHeader }) => (scrollHeader > 2 ? "#000" : "#fff")};
	color: ${({ scrollHeader }) => (scrollHeader > 2 ? "#fff" : "#000")};
	width: 100%;
	height: 10vh;
	position: fixed;
	z-index: 20;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid black;
`;

export default Navbar;
