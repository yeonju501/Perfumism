import useInfiniteScroll from "pages/perfume/hooks/useInfiniteScroll";

function Favorites() {
	const { setTarget, perfumes, isLoading } = useInfiniteScroll({
		type: "favoritePerfumes",
	});

	return <div>내가 좋아요한 향수 목록</div>;
}

export default Favorites;
