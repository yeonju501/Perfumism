import { profileApi, authApi } from "apis";
import { FormContainer } from "components/account/Container";
import { Input, Label } from "components/account/Index";
import { useEffect, useState } from "react";
import { SET_USER } from "store/user";

import { useDispatch } from "react-redux";

interface Props {
	value: string;
	gender: number;
}

function UserName({ value, gender }: Props) {
	const [userName, setUserName] = useState(value);
	const [userGender, setGender] = useState(gender);
	const dispatch = useDispatch();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.type === "text") setUserName(e.target.value);
		if (e.target.type === "radio") setGender(+e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		profileApi.changeUserInfo(userName, userGender).then(() => location.reload());
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
			<br />
			<Label htmlFor="gender">성별</Label>
			<Label htmlFor="male">
				<input
					type="radio"
					name="gender"
					id="male"
					value="0"
					onChange={handleChange}
					checked={userGender === 0}
				/>
				남자
			</Label>
			<Label htmlFor="female">
				<input
					type="radio"
					name="gender"
					id="female"
					value="1"
					onChange={handleChange}
					checked={userGender === 1}
				/>
				여자
			</Label>
		</FormContainer>
	);
}

export default UserName;
