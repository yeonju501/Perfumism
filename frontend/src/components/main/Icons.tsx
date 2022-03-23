import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { authApi } from "apis";
import cookie from "react-cookies";
import { useNavigate } from "react-router-dom";

function Icons() {
	const token = cookie.load("access_token");
	const navigate = useNavigate();

	const logout = () => {
		authApi.logout();
		location.reload();
	};

	return token ? (
		<>
			<FontAwesome icon={faBell} />
			<FontAwesome icon={faUser} />
			<FontAwesome icon={faArrowRightFromBracket} onClick={logout} />
		</>
	) : (
		<FontAwesome icon={faUser} onClick={() => navigate("/signin")} />
	);
}

export default Icons;

const FontAwesome = styled(FontAwesomeIcon)`
	width: 1.8rem;
	height: 1.8rem;
	margin-left: 2rem;
	cursor: pointer;
`;
