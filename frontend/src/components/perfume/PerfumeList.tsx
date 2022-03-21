import PerfumeImage from "./PerfumeImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heart } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { LikeButton } from "components/button/Button";

type PerfumeList = {
	perfumes: [];
};

type Perfume = {
	perfume_id: number;
	perfume_name: string;
	brand_name: string;
	image: string;
};

function PerfumeList({ perfumes }: PerfumeList) {
	return (
		<Container>
			{perfumes.map((perfume: Perfume, idx: number) => (
				<Perfume key={idx}>
					<div>
						<PerfumeImage
							src={`https://fimgs.net/mdimg/perfume/375x500.${perfume.image.slice(2)}`}
							alt="perfume image"
						/>
						<LikeButton>
							<FontAwesomeIcon icon={heart} />
						</LikeButton>
					</div>
					<p>{perfume.perfume_name}</p>
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

export default PerfumeList;
