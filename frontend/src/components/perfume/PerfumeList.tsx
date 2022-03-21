import PerfumeImage from "./PerfumeImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heart } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { LikeButton } from "components/button/Button";
import { useNavigate } from "react-router-dom";

type PerfumeList = {
	perfumes: [];
};

type Perfume = {
	perfume_id: string;
	perfume_name: string;
	brand_name: string;
	image: string;
};

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
						<p>{perfume.perfume_name}</p>
					</PerfumeItem>
					<LikeButton>
						<FontAwesomeIcon icon={heart} />
					</LikeButton>
				</Perfume>
			))}
		</Container>
	);
}

const Container = styled.ul`
	display: flex;
`;

const Perfume = styled.li`
	list-style: none;
`;

const PerfumeItem = styled.div`
	cursor: pointer;
`;

export default PerfumeList;
