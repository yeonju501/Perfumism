import { faArrowRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { authApi } from "apis";
import cookie from "react-cookies";
import { useNavigate } from "react-router-dom";

interface Props {
	userIcon?: boolean;
}

function UserIcon() {
	const token = cookie.load("access_token");
	const navigate = useNavigate();

	const logout = () => {
		authApi.logout();
		location.reload();
	};

	return token ? (
		<>
			<FontAwesome icon={faUser} />
			<FontAwesome icon={faArrowRightFromBracket} userIcon={true} onClick={logout} />
		</>
	) : (
		<FontAwesome icon={faUser} onClick={() => navigate("/signin")} />
	);
}

export default UserIcon;

const FontAwesome = styled(FontAwesomeIcon)<Props>`
	width: 1.8rem;
	height: 1.8rem;
	margin-left: 2rem;
	cursor: pointer;
	@media ${(props) => props.theme.mobile} {
		margin: 0;
		position: absolute;
		left: ${(props) => (props.userIcon ? "7rem" : "4rem")};
`;
