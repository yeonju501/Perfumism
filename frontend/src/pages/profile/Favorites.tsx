import PerfumeList from "components/perfume/PerfumeList";
import useInfiniteScroll from "pages/perfume/hooks/useInfiniteScroll";

function Favorites() {
	const { setTarget, perfumes, isLoading } = useInfiniteScroll({
		type: "favoritePerfumes",
	});

	return (
		<div>
			<h1>내가 좋아요한 향수 목록</h1>
			<PerfumeList perfumes={perfumes} />
			<div ref={setTarget}>{isLoading && <p>Loading..</p>}</div>
		</div>
	);
}

export default Favorites;
