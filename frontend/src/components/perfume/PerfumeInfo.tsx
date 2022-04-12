import styled from "styled-components";
import LikeButton from "components/perfume/LikeButton";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { Perfume } from "types/perfume";

interface Props {
	perfumeData: Perfume;
}

function PerfumeInfo({ perfumeData }: Props) {
	const token = cookie.load("access_token");

	return (
		<div>
			<PerfumeMainInfo>
				<ImageBox>
					<Image src={`https://fimgs.net/mdimg/perfume/375x500.${perfumeData.image}`} />
					{token && <LikeButton perfumeId={String(perfumeData.perfume_id)} />}
				</ImageBox>
				<Info>
					<h1>
						{perfumeData.perfume_name}
						<Year>{perfumeData.launch_year > 0 && `(${perfumeData.launch_year})`}</Year>
					</h1>
					<Link to={`/perfumes/${perfumeData.brand.brand_name}`}>
						{perfumeData.brand.brand_name}
					</Link>
					<p>
						<span style={{ color: "#ffcb14" }}>★ </span>
						{perfumeData.average_grade.toFixed(1)}
					</p>
					<h3>main accords</h3>
					<Accords>
						{perfumeData.accords.map((accord) => (
							<li key={accord.accord_id}>{accord.eng_name}</li>
						))}
					</Accords>
				</Info>
			</PerfumeMainInfo>
			<PerfumeSubInfo>
				<h1>Notes</h1>
				{perfumeData.middle_notes && perfumeData.base_notes ? (
					<Notes>
						<h3>Top</h3>
						<Note>{perfumeData.top_notes}</Note>
						<h3>Middle</h3>
						<Note>{perfumeData.middle_notes}</Note>
						<h3>Base</h3>
						<Note>{perfumeData.base_notes}</Note>
					</Notes>
				) : (
					<Notes>{perfumeData.top_notes}</Notes>
				)}
				<Duration>
					<span>지속력</span> {perfumeData.longevity}
				</Duration>
				<Duration>
					<span>잔향</span> {perfumeData.sillage}
				</Duration>
			</PerfumeSubInfo>
		</div>
	);
}

const PerfumeMainInfo = styled.div`
	display: flex;
	button {
		display: block;
	}
	padding-bottom: 10rem;
	border-bottom: 0.3px solid #cecece;
	margin-bottom: 5rem;
	@media ${(props) => props.theme.mobileS} {
		display: flex;
		flex-direction: column;
		margin-bottom: 2rem;
		padding-bottom: 5rem;
		text-align: center;
	}
`;

const ImageBox = styled.div`
	position: relative;
	margin-left: 5rem;
	@media ${(props) => props.theme.mobileS} {
		margin-left: 0;
		margin-bottom: 2rem;
	}
`;

const Image = styled.img`
	width: 25rem;
	height: auto;
`;

const Info = styled.div`
	margin-left: 25rem;
	h1 {
		font-size: 3.8rem;
		margin: 0 0 1rem;
	}
	@media ${(props) => props.theme.mobileS} {
		margin-left: 0;
	}
`;

const PerfumeSubInfo = styled.div`
	margin: 7rem 0 10rem;
	text-align: center;
	h1 {
		margin-bottom: 5rem;
	}
`;

const Notes = styled.div`
	margin-bottom: 15rem;
`;

const Year = styled.span`
	font-weight: 400;
	font-size: 1.4rem;
	margin-left: 1rem;
`;

const Note = styled.p`
	margin-bottom: 9rem;
`;

const Accords = styled.ul`
	display: flex;
	flex-direction: column;
	li {
		margin-bottom: 0.5rem;
	}
`;

const Duration = styled.div`
	margin: 5rem 0;
	span {
		font-weight: bold;
		margin-right: 3rem;
	}
`;
export default PerfumeInfo;
