import { profileApi } from "apis";
import PerfumeList from "components/perfume/PerfumeList";
import useInfiniteScroll from "pages/perfume/hooks/useInfiniteScroll";

function Favorites() {
	const { setTarget, perfumes, isLoading, setPerfumes } = useInfiniteScroll({
		requestApi: (currentPage) => {
			return profileApi.getFavorites(currentPage);
		},
	});

	return (
		<div>
			<h1>내가 좋아요한 향수 목록</h1>
			<PerfumeList perfumes={perfumes} favorites setPerfumes={setPerfumes} />
			<div ref={setTarget}>{isLoading && <p>Loading..</p>}</div>
		</div>
	);
}

export default Favorites;
