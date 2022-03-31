import { profileApi, authApi } from "apis";
import { FormContainer } from "components/account/Container";
import { Input, Label } from "components/account/Index";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { SET_USER } from "store/user";
import { RootState } from "store";

import { useDispatch, useSelector } from "react-redux";

interface Props {
	value: string;
}

function UserName({ value }: Props) {
	const [userName, setUserName] = useState(value);
	const dispatch = useDispatch();
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserName(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		profileApi.changeUsername(userName).then(() => location.reload());
	};

	useEffect(() => {
		const get = async () => {
			const res = await profileApi.getUserInfo();
			console.log(res.data);
			await dispatch(SET_USER(res.data));
		};
		get();
	}, [userName]);
	return (
		<FormContainer onSubmit={handleSubmit}>
			<Label htmlFor="username">닉네임</Label>
			<Input
				name="username"
				type="text"
				onChange={handleChange}
				placeholder="변경할 닉네임을 입력해주세요"
				value={userName}
			/>
		</FormContainer>
	);
}

export default UserName;
