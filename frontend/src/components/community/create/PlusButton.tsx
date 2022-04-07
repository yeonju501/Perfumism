import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

interface ImgProps {
	setSelectedImg: React.Dispatch<React.SetStateAction<FileList | null | undefined>>;
	setPreviewImg: React.Dispatch<React.SetStateAction<string[]>>;
}

function PlusButton({ setSelectedImg, setPreviewImg }: ImgProps) {
	const [isOpen, setIsOpen] = useState(false);

	const toggling = () => setIsOpen(!isOpen);

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const nowSelectImgList = e.target.files;
		setSelectedImg(nowSelectImgList);
		let nowImgUrlList = [];
		if (nowSelectImgList) {
			for (let i = 0; i < nowSelectImgList?.length; i++) {
				const nowImgUrl = URL.createObjectURL(nowSelectImgList[i]);
				nowImgUrlList.push(nowImgUrl);
			}
			if (nowSelectImgList?.length > 3) {
				nowImgUrlList = nowImgUrlList.slice(0, 3);
			}
			setPreviewImg(nowImgUrlList);
		}
	};

	return (
		<Container>
			{isOpen && (
				<DropDownListContainer>
					<DropDownList>
						<label htmlFor="inputFile" style={{ cursor: "pointer" }}>
							이미지 업로드
						</label>
						<input
							type="file"
							id="inputFile"
							multiple
							accept="image/*"
							style={{ display: "none" }}
							onChange={handleImageUpload}
						/>
					</DropDownList>
				</DropDownListContainer>
			)}
			<ButtonImg icon={faPlusCircle} onClick={toggling} />
		</Container>
	);
}

const Container = styled.div`
	position: absolute;
	bottom: 7rem;
	right: 0.5rem;
	cursor: pointer;
`;

const ButtonImg = styled(FontAwesomeIcon)`
	width: 4rem;
	height: 4rem;
	color: #c7c7c7;
`;

const DropDownListContainer = styled.div`
	position: absolute;
	top: -7rem;
	width: 15rem;
`;

const DropDownList = styled.ul`
	text-align: center;
	padding: 1rem;
	background: #ffffff;
	border: 2px solid #e5e5e5;
	box-sizing: border-box;
	font-size: 1.5rem;
	font-weight: 500;
	cursor: pointer;
`;

export default PlusButton;
