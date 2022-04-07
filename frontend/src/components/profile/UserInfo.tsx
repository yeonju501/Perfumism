import { profileApi } from "apis";
import anonymous from "assets/anonymous.jpg";
import useSetImage from "components/profile/hooks/useSetImage";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { SET_USER } from "store/user";
import styled from "styled-components";

function UserInfo() {
	const dispatch = useDispatch();
	const { email, image } = useSelector((state: RootState) => state.user);
	const profileImage = useRef<any>(null);

	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const imageFile = useSetImage(e);
		const formData = new FormData();
		if (imageFile) {
			formData.append("img", imageFile);
			await profileApi.setUserImage(formData);
			const res = await profileApi.getUserInfo();
			dispatch(SET_USER(res.data));
			setTimeout(() => {
				alert("프로필 이미지가 변경되었습니다.");
			}, 1000);
		}
	};

	return (
		<div>
			<ImageContainer>
				<UserImage
					src={image ? image : anonymous}
					alt="user profile"
					onClick={() => profileImage.current.click()}
				/>
				<ImageUpdate onClick={() => profileImage.current.click()}>수정</ImageUpdate>
				<ImageInput ref={profileImage} type="file" onChange={handleImageChange} accept="image/*" />
			</ImageContainer>
			<Label>email</Label>
			<Email>{email}</Email>
		</div>
	);
}

const ImageContainer = styled.div`
	width: 20rem;
	&:hover {
		div {
			display: block;
		}
	}
	position: relative;
	margin-bottom: 5rem;
	@media ${(props) => props.theme.mobileS} {
		margin-left: 20%;
	}
`;

const UserImage = styled.img`
	border-radius: 50%;
	width: 18rem;
	height: 18rem;
	display: block;
	cursor: pointer;
	&:hover {
		filter: brightness(80%);
	}
`;

const ImageUpdate = styled.div`
	background-color: inherit;
	cursor: pointer;
	display: none;
	position: absolute;
	color: white;
	top: 55%;
	left: 45%;
	transform: translate(-50%, -100%);
	&:hover {
	}
`;

const ImageInput = styled.input`
	display: none;
`;

const Label = styled.p`
	font-weight: bold;
`;

const Email = styled.p`
	margin: 2rem 0 4rem;
`;
export default UserInfo;
