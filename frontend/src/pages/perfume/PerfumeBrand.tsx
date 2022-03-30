import perfumeApi from "apis/perfume";
import PerfumeList from "components/perfume/PerfumeList";
import { useParams } from "react-router-dom";
import useInfiniteScroll from "./hooks/useInfiniteScroll";

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
		<div>
			<h1>{brandName} 의 향수</h1>
			<PerfumeList perfumes={perfumes} />
			<div ref={setTarget}>{isLoading && <p>Loading..</p>}</div>
		</div>
	);
}

export default PerfumeBrand;
