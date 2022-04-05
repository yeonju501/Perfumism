import styled from "styled-components";
import { Link } from "react-router-dom";

interface Props {
	perfume_id: string;
	name: string;
	image: string;
}

interface Perfume {
	perfume: Props;
}

function RecommendList({ perfume }: Perfume) {
	return (
		<Container to={`/perfume/${perfume.perfume_id}`}>
			<Image src={`https://fimgs.net/mdimg/perfume/375x500.${perfume.image}`} />
			<PerfumeName>{perfume.name}</PerfumeName>
		</Container>
	);
}

const Container = styled(Link)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	position: relative;
	color: #000;
	width: 100%;
`;

const Image = styled.img`
	width: 20rem;
	height: 30rem;
`;

const PerfumeName = styled.p`
	font-size: 2.3rem;
	font-weight: 800;
	margin-bottom: 0;
`;

export default RecommendList;
