import perfumeApi from "apis/perfume";
import ReviewList from "components/review/ReviewList";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PerfumeInfo from "components/perfume/PerfumeInfo";
import PerfumeDetailRecommendation from "components/perfume/PerfumeDetailRecommendation";
import ReviewCreate from "components/review/ReviewCreate";
import { Perfume } from "types/perfume";

type Params = {
	perfumeId: string;
};

function PerfumeDetail() {
	const { perfumeId } = useParams() as Params;
	const [perfumeData, setPerfumeData] = useState<Perfume | null>(null);
	const [updateReviews, setUpdateReviews] = useState(false);

	useEffect(() => {
		getPerfume();
	}, []);

	const getPerfume = async () => {
		const res = await perfumeApi.getPerfume(perfumeId);
		setPerfumeData(res.data);
	};

	return (
		perfumeData && (
			<Container>
				<PerfumeInfo perfumeData={perfumeData} />
				<PerfumeDetailRecommendation perfumeData={perfumeData} />
				<ReviewCreate perfumeId={perfumeId} setUpdateReviews={setUpdateReviews} />
				<ReviewList perfumeId={perfumeId} updateReviews={updateReviews} />
			</Container>
		)
	);
}

const Container = styled.div`
	font-size: 1.5rem;
	display: flex;
	flex-direction: column;
	width: 65%;
	margin: 7rem auto;
	@media ${(props) => props.theme.mobileS} {
		width: 90%;
	}
`;

export default PerfumeDetail;
