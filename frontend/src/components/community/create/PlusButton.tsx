import { useState } from "react";
import PlusSrc from "assets/plus.png";
import VoteCreate from "./VoteCreate";
import styled from "styled-components";

interface ImgProps {
	setSelectedImg: React.Dispatch<React.SetStateAction<FileList | null | undefined>>;
	setPreviewImg: React.Dispatch<React.SetStateAction<string[]>>;
}

function PlusButton({ setSelectedImg, setPreviewImg }: ImgProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggling = () => setIsOpen(!isOpen);
	const handleShow = () => setIsModalOpen(!isModalOpen);

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const nowSelectImgList = e.target.files;
		setSelectedImg(nowSelectImgList);
		const nowImgUrlList = [];
		if (nowSelectImgList) {
			for (let i = 0; i < nowSelectImgList?.length; i++) {
				const nowImgUrl = URL.createObjectURL(nowSelectImgList[i]);
				nowImgUrlList.push(nowImgUrl);
			}
			setPreviewImg(nowImgUrlList);
		}
	};

	return (
		<>
			<ButtonContainer>
				{isOpen && (
					<div>
						<input type="file" multiple accept="image/*" onChange={handleImageUpload} />
						<br />
						<button onClick={handleShow}>투표 추가</button>
					</div>
				)}
				<ButtonImg src={PlusSrc} alt="" onClick={toggling} />
			</ButtonContainer>
			{isModalOpen && <VoteCreate isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}
		</>
	);
}

const ButtonContainer = styled.div`
	position: absolute;
	bottom: 5rem;
	right: 5rem;
	cursor: pointer;
`;

const ButtonImg = styled.img`
	width: 12rem;
`;

export default PlusButton;
