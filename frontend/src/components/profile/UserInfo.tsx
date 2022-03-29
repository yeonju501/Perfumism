import anonymous from "assets/anonymous.jpg";
import { useSelector } from "react-redux";
import { RootState } from "store";
import styled from "styled-components";

function UserInfo() {
	const { email, image, social_id, username } = useSelector((state: RootState) => state.user);

	return (
		<div>
			<UserImage src={anonymous} alt="user profile" />
			<input type="file" />
			<p>{username}</p>
			<p>{email || social_id}</p>
		</div>
	);
}

const UserImage = styled.img`
	border-radius: 50%;
`;
export default UserInfo;
