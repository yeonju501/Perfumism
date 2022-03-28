import styled from "styled-components";
import LikeButton from "components/perfume/LikeButton";
import cookie from "react-cookies";
import { Link } from "react-router-dom";

interface PerfumeDataProps {
	perfumeData: PerfumeDataType;
}

interface PerfumeDataType {
	perfume_id: number;
	perfume_name: string;
	brand: {
		brand_id: number;
		brand_name: string;
	};
	image: string;
	launch_year: number;
	average_grade: number;
	top_notes: string;
	middle_notes: string | null;
	base_notes: string | null;
	total_survey: number;
	longevity: string;
	sillage: string;
	accords: AccordType[];
	similar_perfume: [];
	likes: number;
}

interface AccordType {
	accord_id: number;
	kor_name: string;
	eng_name: string;
}

function PerfumeInfo({ perfumeData }: PerfumeDataProps) {
	const token = cookie.load("access_token");

	return (
		<div>
			<PerfumeMainInfo>
				<Image src={`https://fimgs.net/mdimg/perfume/375x500.${perfumeData.image}`} />
				{token && <LikeButton perfumeId={String(perfumeData.perfume_id)} />}
				<div>
					<h1>
						{perfumeData.perfume_name}
						<span>({perfumeData.launch_year})</span>
					</h1>
					<Link to={`/perfumes/${perfumeData.brand.brand_name}`}>
						{perfumeData.brand.brand_name}
					</Link>
					<h4>
						<span style={{ color: "#ffcb14" }}>★</span>
						{perfumeData.average_grade}
					</h4>
					<p>main accords</p>
					<ul>
						{perfumeData.accords.map((accord) => (
							<li key={accord.accord_id}>{accord.eng_name}</li>
						))}
					</ul>
				</div>
			</PerfumeMainInfo>
			<PerfumeSubInfo>
				<p>{perfumeData.top_notes}</p>
				<p>{perfumeData.middle_notes}</p>
				<p>{perfumeData.base_notes}</p>
				<p>{perfumeData.longevity}</p>
				<p>{perfumeData.sillage}</p>
			</PerfumeSubInfo>
		</div>
	);
}

const PerfumeMainInfo = styled.div`
	display: flex;
	button {
		display: block;
	}
`;

const Image = styled.img`
	width: 15%;
	height: auto;
`;
const PerfumeSubInfo = styled.div``;

export default PerfumeInfo;
