import PerfumeList from "components/perfume/PerfumeList";
import { useParams } from "react-router-dom";
import useInfiniteScroll from "./hooks/useInfiniteScroll";

type Params = {
	brandName: string;
};

function PerfumeBrand() {
	const { brandName } = useParams() as Params;

	const { setTarget, perfumes, isLoading } = useInfiniteScroll({
		type: "brandPerfumes",
		brandName,
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
