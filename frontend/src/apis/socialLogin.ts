import { request } from "./request";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLENT_ID;
const GOOGLE_REDIRECT_URI = process.env.REACT_APP_GOOGLE_URL;
const KAKAO_CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENT_ID;
const KAKAO_URI = process.env.REACT_APP_KAKAO_URL;

const socialLogin = {
	google: () =>
		(window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&response_type=code&redirect_uri=${GOOGLE_REDIRECT_URI}&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`),
	kakao: () =>
		(window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_URI}&response_type=code`),
	kakaoLogin: (code: string) =>
		request.get(`oauth2/authorization/kakao?code=${code}`).then((res) => console.log(res)),
	googleLogin: (code: string) =>
		request.get(`oauth2/authorization/google?code=${code}`).then((res) => console.log(res)),
};

export default socialLogin;
