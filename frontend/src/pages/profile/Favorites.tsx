import { profileApi } from "apis";
import PerfumeList from "components/perfume/PerfumeList";
import useInfiniteScroll from "pages/perfume/hooks/useInfiniteScroll";
import { useSelector } from "react-redux";
import { RootState } from "store";
import styled from "styled-components";

function Favorites() {
	const userName = useSelector((state: RootState) => state.user.username);

	const { setTarget, perfumes, isLoading, setPerfumes } = useInfiniteScroll({
		requestApi: (currentPage) => {
			return profileApi.getFavorites(currentPage);
		},
	});

	return (
		<Container>
			<h1>{userName} 님이 좋아요한 향수 목록</h1>
			{perfumes.length > 0 ? (
				<>
					<PerfumeList perfumes={perfumes} favorites setPerfumes={setPerfumes} />
					<div ref={setTarget}>{isLoading && <p>Loading..</p>}</div>
				</>
			) : (
				<p id="default">❤를 눌러 좋아하는 향수를 추가해주세요</p>
			)}
		</Container>
	);
}

const Container = styled.div`
	width: 80%;
	margin: 5rem auto;
	h1 {
		font-size: 2.8rem;
		margin-bottom: 4rem;
	}
	#default {
		font-size: 1.8rem;
	}
`;

export default Favorites;
