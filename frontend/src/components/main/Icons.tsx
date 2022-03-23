import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import { authApi } from "apis";
import cookie from "react-cookies";
import styled from "styled-components";
import Search from "./Search";

function Icons() {
	const token = cookie.load("access_token");
	const navigate = useNavigate();

	const logout = () => {
		authApi.logout();
		location.reload();
	};

	return token ? (
		<ListItem>
			<Search />
			<FontAwesome icon={faBell} />
			<FontAwesome icon={faUser} />
			<FontAwesome icon={faArrowRightFromBracket} onClick={logout} />
		</ListItem>
	) : (
		<ListItem>
			<Search />
			<FontAwesome icon={faUser} onClick={() => navigate("/signin")} />
		</ListItem>
	);
}

export default Icons;

const ListItem = styled.li`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const FontAwesome = styled(FontAwesomeIcon)`
	width: 1.8rem;
	height: 1.8rem;
	margin-left: 2rem;
	cursor: pointer;
`;
