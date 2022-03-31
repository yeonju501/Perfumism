import { faArrowRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { authApi } from "apis";
import cookie from "react-cookies";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { persistor } from "index";

interface Props {
	usericon?: string;
}

function UserIcon() {
	const userName = useSelector((state: RootState) => state.user.username);
	const token = cookie.load("access_token");
	const navigate = useNavigate();

	const logout = () => {
		authApi.logout();
		persistor.purge();
		location.reload();
	};

	return token ? (
		<>
			<FontAwesome
				icon={faUser}
				onClick={() => navigate("profile/check-password", { state: userName })}
			/>
			<FontAwesome icon={faArrowRightFromBracket} usericon="1" onClick={logout} />
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
	z-index: 1;
	cursor: pointer;
	@media ${(props) => props.theme.mobile} {
		margin: 0;
		position: absolute;
		left: ${(props) => (props.usericon ? "7rem" : "4rem")};
	}
`;
