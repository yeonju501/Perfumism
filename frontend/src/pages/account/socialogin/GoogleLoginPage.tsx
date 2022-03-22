import socialLogin from "apis/socialLogin";
import { useEffect } from "react";

function GoogleLoginPage() {
	useEffect(() => {
		const params = new URL(document.location.toString()).searchParams;
		const code = params.get("code");
		socialLogin.googleLogin(code as string);
	});
	return <div>Spinner</div>;
}

export default GoogleLoginPage;
