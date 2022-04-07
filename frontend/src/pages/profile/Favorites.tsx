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
					<div ref={setTarget}>{isLoading && <p></p>}</div>
				</>
			) : (
				<p id="default">❤를 눌러 좋아하는 향수를 추가해주세요</p>
			)}
		</Container>
	);
}

const Container = styled.div`
	width: 100%;
	margin: 3rem 0;
	h1 {
		margin-left: 5%;
		font-size: 2.8rem;
		margin-bottom: 4rem;
		@media ${(props) => props.theme.mobileS} {
			font-size: 2rem;
			margin: 0;
			text-align: center;
		}
	}
	#default {
		font-size: 1.8rem;
		margin-left: 5%;
		@media ${(props) => props.theme.mobileS} {
			font-size: 1.8rem;
			margin-top: 50%;
			text-align: center;
		}
	}
`;

export default Favorites;
