import PerfumeImage from "./PerfumeImage";
import styled from "styled-components";
import LikeButton from "components/perfume/LikeButton";
import cookie from "react-cookies";
import perfumeApi from "apis/perfume";

interface PerfumeList {
	perfumes: Perfume[];
	favorites?: boolean;
	setPerfumes?: React.Dispatch<React.SetStateAction<PerfumeType[]>>;
}

interface PerfumeType {
	perfume_id: string;
	perfume_name: string;
	image: string;
	average_grade: number;
	likes: number;
}

interface Perfume {
	perfume_id: string;
	perfume_name: string;
	brand?: { brand_id: number; brand_name: string };
	brand_name?: string;
	image: string;
}

function PerfumeList({ perfumes, favorites, setPerfumes }: PerfumeList) {
	const token = cookie.load("access_token");

	const handlePerfumeItemClick = (perfumeId: string) => {
		window.location.replace(`/perfume/${perfumeId}`);
	};

	const handleDeleteClick = async (perfumeId: string) => {
		await perfumeApi.deleteFavoritePerfume(perfumeId);
		if (setPerfumes)
			setPerfumes((perfumes) => perfumes.filter((perfume) => perfume.perfume_id !== perfumeId));
	};

	return (
		<Container>
			{perfumes.length > 0 &&
				perfumes.map((perfume: Perfume, idx: number) => (
					<Perfume key={idx}>
						<PerfumeItem onClick={() => handlePerfumeItemClick(perfume.perfume_id)}>
							<PerfumeImage
								src={`https://fimgs.net/mdimg/perfume/375x500.${perfume.image}`}
								alt="perfume image"
								favorites={favorites}
							/>
							<Brand>{perfume.brand ? perfume.brand.brand_name : perfume.brand_name}</Brand>
							<Name>{perfume.perfume_name}</Name>
						</PerfumeItem>
						{token &&
							(favorites ? (
								<DelButton onClick={() => handleDeleteClick(perfume.perfume_id)}>x</DelButton>
							) : (
								<LikeButton center perfumeId={perfume.perfume_id} />
							))}
					</Perfume>
				))}
		</Container>
	);
}

const Container = styled.ul`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin: 0 auto;
`;

const Perfume = styled.li`
	width: 14%;
	margin: 4rem 3rem;
	height: auto;
	list-style: none;
	font-size: 1.4rem;
	position: relative;
	@media ${(props) => props.theme.mobileS} {
		width: 30%;
	}
	&:hover {
		button {
			display: block;
			@media ${(props) => props.theme.mobileS} {
				display: none;
			}
		}
	}
`;

const PerfumeItem = styled.div`
	cursor: pointer;
`;

const Brand = styled.p`
	text-align: center;
	font-size: 1.2rem;
	font-family: "MinSans-Light";
`;

const Name = styled.p`
	text-align: center;
	font-weight: bold;
	font-size: 1.6rem;
`;

const DelButton = styled.button`
	background-color: inherit;
	border: none;
	outline: none;
	cursor: pointer;
	position: absolute;
	top: 0%;
	left: 95%;
	font-size: 1.8rem;
	color: #797979;
	display: none;
`;
export default PerfumeList;
