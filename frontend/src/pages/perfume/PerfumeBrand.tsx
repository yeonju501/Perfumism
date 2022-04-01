import perfumeApi from "apis/perfume";
import PerfumeList from "components/perfume/PerfumeList";
import { useParams } from "react-router-dom";
import useInfiniteScroll from "./hooks/useInfiniteScroll";
import styled from "styled-components";

type Params = {
	brandName: string;
};

function PerfumeBrand() {
	const { brandName } = useParams() as Params;

	const { setTarget, perfumes, isLoading } = useInfiniteScroll({
		requestApi: (currentPage) => {
			return perfumeApi.getBrandPerfumes(brandName, currentPage, "totalSurvey");
		},
	});

	return (
		<Container>
			<Title>{brandName} 의 향수</Title>
			<PerfumeList perfumes={perfumes} />
			<div ref={setTarget}>{isLoading && <p></p>}</div>
		</Container>
	);
}

const Container = styled.div`
	width: 80%;
	margin: 5rem auto;
`;

const Title = styled.h1`
	font-size: 3rem;
	margin: 0 0 5rem 5rem;
`;

export default PerfumeBrand;
