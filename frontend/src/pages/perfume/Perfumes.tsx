import perfumeApi from "apis/perfume";
import PerfumeFilter from "components/perfume/PerfumeFilter";
import PerfumeList from "components/perfume/PerfumeList";
import { useSelector } from "react-redux";
import { RootState } from "store";
import useInfiniteScroll from "./hooks/useInfiniteScroll";

function Perfumes() {
	const { accord, sort, order } = useSelector((state: RootState) => state.filter);

	const { setTarget, perfumes, isLoading } = useInfiniteScroll({
		requestApi: (currentPage) => {
			return accord
				? perfumeApi.getPerfumesByAccord(accord, currentPage, sort, order)
				: perfumeApi.getPerfumes(currentPage, sort, order);
		},
	});

	console.log(1);

	return (
		<div>
			<PerfumeFilter />
			<PerfumeList perfumes={perfumes} />
			<div ref={setTarget}>{isLoading && <p>Loading..</p>}</div>
		</div>
	);
}

export default Perfumes;
