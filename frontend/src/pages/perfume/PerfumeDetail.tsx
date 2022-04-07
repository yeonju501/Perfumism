import perfumeApi from "apis/perfume";
import ReviewList from "components/review/ReviewList";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PerfumeInfo from "components/perfume/PerfumeInfo";
import PerfumeDetailRecommendation from "components/perfume/PerfumeDetailRecommendation";
import ReviewCreate from "components/review/ReviewCreate";

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

type Params = {
	perfumeId: string;
};

function PerfumeDetail() {
	const { perfumeId } = useParams() as Params;
	const [perfumeData, setPerfumeData] = useState<PerfumeDataType | null>(null);
	const [updateReviews, setUpdateReviews] = useState(false);

	useEffect(() => {
		getPerfume();
	}, [perfumeId]);

	const getPerfume = async () => {
		await perfumeApi.getPerfume(perfumeId).then((res) => setPerfumeData(res.data));
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
