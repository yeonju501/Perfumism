import { authApi } from "apis";
import LoginButton from "components/account/LoginButton";
import { useNavigate } from "react-router";
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
	});
}

export default SignUp;
