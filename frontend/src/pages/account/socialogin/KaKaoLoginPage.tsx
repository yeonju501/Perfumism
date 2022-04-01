import socialLogin from "apis/socialLogin";
import Spinner from "components/Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function KaKaoLoginPage() {
	const navigate = useNavigate();
	useEffect(() => {
		const params = new URL(document.location.toString()).searchParams;
		const code = params.get("code");
		socialLogin.kakaoLogin(code as string).then(() => location.replace("/"));
	});
	return <Spinner />;
}

export default KaKaoLoginPage;
