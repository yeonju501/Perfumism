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
				<ImageBox>
					<Image src={`https://fimgs.net/mdimg/perfume/375x500.${perfumeData.image}`} />
					{token && <LikeButton perfumeId={String(perfumeData.perfume_id)} />}
				</ImageBox>
				<Info>
					<h1 style={{ fontSize: "4rem", margin: "0 0 1rem" }}>
						{perfumeData.perfume_name}
						<Year>{perfumeData.launch_year > 0 && `(${perfumeData.launch_year})`}</Year>
					</h1>
					<Link to={`/perfumes/${perfumeData.brand.brand_name}`}>
						{perfumeData.brand.brand_name}
					</Link>
					<p>
						<span style={{ color: "#ffcb14" }}>★</span>
						{perfumeData.average_grade}
					</p>
					<h3>main accords</h3>
					<ul>
						{perfumeData.accords.map((accord) => (
							<li key={accord.accord_id}>{accord.eng_name}</li>
						))}
					</ul>
				</Info>
			</PerfumeMainInfo>
			<PerfumeSubInfo>
				<h1 style={{ marginBottom: "4rem" }}>Notes</h1>
				{perfumeData.middle_notes && perfumeData.base_notes ? (
					<div>
						<h2>Top</h2>
						<Note>{perfumeData.top_notes}</Note>
						<h2>Middle</h2>
						<Note>{perfumeData.middle_notes}</Note>
						<h2>Base</h2>
						<Note>{perfumeData.base_notes}</Note>
					</div>
				) : (
					<p>{perfumeData.top_notes}</p>
				)}
				<p>지속력 : {perfumeData.longevity}</p>
				<p>잔향 : {perfumeData.sillage}</p>
			</PerfumeSubInfo>
		</div>
	);
}

const PerfumeMainInfo = styled.div`
	display: flex;
	button {
		display: block;
	}
	margin-bottom: 10rem;
`;

const ImageBox = styled.div`
	position: relative;
`;

const Image = styled.img`
	width: 25rem;
	height: auto;
`;

const Info = styled.div`
	margin-left: 20rem;
`;
const PerfumeSubInfo = styled.div`
	margin-bottom: 10rem;
	text-align: center;
`;

const Year = styled.span`
	font-weight: 400;
	font-size: 1.4rem;
	margin-left: 1rem;
`;

const Note = styled.p`
	margin-bottom: 8rem;
`;
export default PerfumeInfo;
