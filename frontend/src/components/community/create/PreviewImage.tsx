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
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	@media ${(props) => props.theme.tabletS} {
		grid-template-columns: repeat(2, 1fr);
	}
`;

const PreviewImg = styled.img`
	width: 95%;
	margin: 1rem;
`;

export default PreviewImage;
