import { faArrowRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { authApi } from "apis";
import cookie from "react-cookies";
import { useNavigate } from "react-router-dom";
import IconStyled from "./IconStyled";

function UserIcon() {
	const token = cookie.load("access_token");
	const navigate = useNavigate();

	const logout = () => {
		authApi.logout();
		location.reload();
	};

	return token ? (
		<>
			<IconStyled img={faUser} />
			<IconStyled img={faArrowRightFromBracket} handleClick={logout} />
		</>
	) : (
		<IconStyled img={faUser} handleClick={() => navigate("/signin")} />
	);
}

export default UserIcon;
