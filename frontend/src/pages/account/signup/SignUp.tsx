import { authApi } from "apis";
import LoginButton from "components/account/LoginButton";
import { useNavigate } from "react-router";
import styled from "styled-components";
import useForm from "./hooks/useForm";

function SignUp() {
	const navigate = useNavigate();

	const { handleChange, handleSubmit, isValid } = useForm({
		initialValues: {
			email: "",
			password: "",
			username: "",
		},

		onSubmit: async ({ email, username, password }) => {
			try {
				await authApi
					.signup({
						email,
						password,
						username,
					})
					.then(() => navigate("/sign-in"));
			} catch (error) {
				// 에러 추후에 토스티파이로 변경
				console.log(error);
			}
		},
		onBlur: async (name, value) => {
			try {
				const isExist = await authApi.isExist(name, value);
				return isExist.data.result;
			} catch (error) {
				console.log(error);
			}
		},
	});

	return (
		<Container>
			<h1>회원 가입</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="">이메일</label>
				<input name="email" type="text" onChange={handleChange} />
				<label htmlFor="username">닉네임</label>
				<input name="username" type="text" onChange={handleChange} />
				<label htmlFor="password">비밀번호</label>
				<input name="password" type="password" onChange={handleChange} />
				<LoginButton label="로그인" />
			</form>
			<br />
			<div>
				<button>구글로 로그인하기</button>
				<button>네이버로 로그인하기</button>
			</div>
			{/* 로그인 페이지 구현후 link로 구현하기 */}
			<p>로그인하기</p>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

export default SignUp;
