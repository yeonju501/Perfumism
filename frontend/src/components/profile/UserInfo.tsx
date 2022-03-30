import { profileApi } from "apis";
import anonymous from "assets/anonymous.jpg";
import useSetImage from "hooks/useSetImage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { SET_USER } from "store/user";
import styled from "styled-components";

function UserInfo() {
	const dispatch = useDispatch();
	const { email, image, social_id, username } = useSelector((state: RootState) => state.user);

	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const imageFile = useSetImage(e);
		const formData = new FormData();
		if (imageFile) {
			formData.append("img", imageFile);
			await profileApi.setUserImage(formData).then(async () => {
				const res = await profileApi.getUserInfo();
				await dispatch(SET_USER(res.data));
				setTimeout(() => {
					alert("프로필 이미지가 변경되었습니다.");
				}, 1000);
			});
		}
	};

	return (
		<div>
			<UserImage src={image ? image : anonymous} alt="user profile" />
			<input type="file" onChange={handleImageChange} />
			<p>{username}</p>
			<p>{email || social_id}</p>
		</div>
	);
}

const UserImage = styled.img`
	border-radius: 50%;
	width: 20rem;
	height: 20rem;
`;
export default UserInfo;
