import { profileApi } from "apis";
import { FormContainer } from "components/account/Container";
import { Input } from "components/account/Index";
import Label from "components/profile/Label";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_USER } from "store/user";
import styled from "styled-components";
interface Props {
	value: string;
	gender: number;
}

function UserInfoEdit({ value, gender }: Props) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [userName, setUserName] = useState(value);
	const [userGender, setGender] = useState(gender);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.type === "text") setUserName(e.target.value);
		if (e.target.type === "radio") setGender(+e.target.value);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (window.confirm("회원정보를 변경하시겠습니까?")) {
			profileApi.changeUserInfo(userName, userGender);
			const data = { username: userName };
			dispatch(SET_USER(data));
			navigate(`/profile/${userName}`);
		}
	};

	return (
		<FormContainer onSubmit={handleSubmit}>
			<Label htmlFor="username">유저네임</Label>
			<Input
				name="username"
				type="text"
				onChange={handleChange}
				placeholder="변경할 닉네임을 입력해주세요"
				value={userName}
			/>
			<br />
			<Label htmlFor="gender">성별</Label>
			<GenderButtons>
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
			</GenderButtons>
			<Button>제출</Button>
		</FormContainer>
	);
}

const GenderButtons = styled.div`
	margin-bottom: 2rem;
	#female {
		margin-left: 1.5rem;
	}
`;

const Button = styled.button`
	width: 100%;
	background-color: inherit;
	margin: 2rem auto;
	border: 0.5px solid #cecece;
	padding: 0.5rem 0;
	color: #111111;
	outline: none;
	cursor: pointer;
	&:hover {
		background-color: #f7f7f7;
	}
`;
export default UserInfoEdit;
