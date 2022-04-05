import styled from "styled-components";
import NoImageSrc from "assets/noimage.gif";

interface PreviewImgPorps {
	previewImg?: string[];
}

function PreviewImage({ previewImg }: PreviewImgPorps) {
	return (
		<Container>
			{previewImg?.length ? (
				previewImg.map((imgUrl) => <PreviewImg src={imgUrl} alt="" />)
			) : (
				<PreviewImg src={NoImageSrc} alt="" />
			)}
		</Container>
	);
}

const Container = styled.div`
	display: flex;
`;

const PreviewImg = styled.img`
	width: 30%;
	margin: 1rem;
`;

export default PreviewImage;
