import PerfumeImage from "./PerfumeImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heart } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { LikeButton } from "components/button/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import perfumeApi from "apis/perfume";

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
	const [isLiked, setIsLiked] = useState(false);

	const handlePerfumeItemClick = (perfumeId: string) => {
		navigate(`/perfume/${perfumeId}`);
	};

	const isPerfumeLiked = async (perfumeId: string) => {
		await perfumeApi.isPerfumeLiked(perfumeId).then((res) => setIsLiked(res.data.is_liked));
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
					<LikeButton center isLiked={isLiked}>
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
