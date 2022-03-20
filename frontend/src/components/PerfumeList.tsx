import LikeButton from "./perfume/LikeButton";
import PerfumeImage from "./perfume/PerfumeImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heart } from "@fortawesome/free-solid-svg-icons";

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
		<ul>
			{perfumes.map((perfume: Perfume, idx: number) => (
				<li key={idx}>
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
				</li>
			))}
		</ul>
	);
}

export default PerfumeList;
