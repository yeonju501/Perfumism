import socialLogin from "apis/socialLogin";
import Spinner from "components/Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GoogleLoginPage() {
	const navigate = useNavigate();
	useEffect(() => {
		const params = new URL(document.location.toString()).searchParams;
		const code = params.get("code");
		socialLogin.googleLogin(code as string).then(() => location.replace("/"));
	});
	return <Spinner />;
}

export default GoogleLoginPage;
