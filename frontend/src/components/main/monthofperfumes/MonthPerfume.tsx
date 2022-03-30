import styled from "styled-components";
import { Link } from "react-router-dom";

interface Props {
	perfume_id: number;
	perfume_name: string;
	image: string;
	average_grade: number;
	likes: number;
	brand: {
		brand_id: number;
		brand_name: string;
	};
}

interface Perfume {
	perfume: Props;
}

function MonthPerfume({ perfume }: Perfume) {
	return (
		<Container to={`perfume/${perfume.perfume_id}`}>
			<Image src={`https://fimgs.net/mdimg/perfume/375x500.${perfume.image}`} />
			<PerfumeName>{perfume.perfume_name}</PerfumeName>
			<BrandName>{perfume.brand.brand_name}</BrandName>
			<Grade>{perfume.average_grade}</Grade>
		</Container>
	);
}

export default MonthPerfume;

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

const BrandName = styled.span`
	font-size: 1.5rem;
`;

const Grade = styled.span`
	font-size: 1.3rem;
`;
