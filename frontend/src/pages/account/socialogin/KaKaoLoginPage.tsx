import socialLogin from "apis/socialLogin";
import { useEffect } from "react";

function KaKaoLoginPage() {
	useEffect(() => {
		const params = new URL(document.location.toString()).searchParams;
		const code = params.get("code");
		socialLogin.kakaoLogin(code as string);
	});
	return <div>Spinner</div>;
}

export default KaKaoLoginPage;
