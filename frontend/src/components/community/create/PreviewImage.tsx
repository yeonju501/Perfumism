import styled from "styled-components";

interface PreviewImgPorps {
	previewImg: string[];
}

function PreviewImage({ previewImg }: PreviewImgPorps) {
	console.log(previewImg);
	return (
		<Container>
			{previewImg.map((imgUrl) => (
				<PreviewImg src={imgUrl} alt="" />
			))}
		</Container>
	);
}

const Container = styled.div`
	display: flex;
`;

const PreviewImg = styled.img`
	width: 15rem;
	height: 15rem;
	margin: 1rem;
`;

export default PreviewImage;
