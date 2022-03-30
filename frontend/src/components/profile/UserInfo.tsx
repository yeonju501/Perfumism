import { profileApi } from "apis";
import anonymous from "assets/anonymous.jpg";
import useSetImage from "hooks/useSetImage";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import styled from "styled-components";

function UserInfo() {
	const { email, image, social_id, username } = useSelector((state: RootState) => state.user);

	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const imageFile = useSetImage(e);
		const formData = new FormData();
		// if (imageFile) {
		// 	formData.append("image", imageFile);
		// 	await profileApi.setUserImage(formData).then(() => alert("프로필 이미지가 변경되었습니다"));
			// dispatch
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
`;
export default UserInfo;
