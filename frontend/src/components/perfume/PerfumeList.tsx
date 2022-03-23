import PerfumeImage from "./PerfumeImage";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LikeButton from "components/button/LikeButton";

interface PerfumeList {
	perfumes: Perfume[];
}

interface Perfume {
	perfume_id: string;
	perfume_name: string;
	brand_name?: string;
	image: string;
}

function PerfumeList({ perfumes }: PerfumeList) {
	const navigate = useNavigate();

	const handlePerfumeItemClick = (perfumeId: string) => {
		navigate(`/perfume/${perfumeId}`);
	};

	return (
		<Container>
			{perfumes.map((perfume: Perfume, idx: number) => (
				<Perfume key={idx}>
					<PerfumeItem onClick={() => handlePerfumeItemClick(perfume.perfume_id)}>
						<PerfumeImage
							src={`https://fimgs.net/mdimg/perfume/375x500.${perfume.image.slice(2)}`}
							alt="perfume image"
						/>
						<Name>{perfume.perfume_name}</Name>
					</PerfumeItem>
					<LikeButton center perfumeId={perfume.perfume_id} />
				</Perfume>
			))}
		</Container>
	);
}

const Container = styled.ul`
	display: flex;
`;

const Perfume = styled.li`
	width: 15%;
	height: auto;
	list-style: none;
	position: relative;
	&:hover {
		button {
			display: block;
		}
	}
`;

const PerfumeItem = styled.div`
	cursor: pointer;
`;

const Name = styled.p`
	text-align: center;
`;

export default PerfumeList;
