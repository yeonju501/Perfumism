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
	});
}

export default SignUp;
