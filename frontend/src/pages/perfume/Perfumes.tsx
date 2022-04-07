import perfumeApi from "apis/perfume";
import PerfumeFilter from "components/perfume/PerfumeFilter";
import PerfumeList from "components/perfume/PerfumeList";
import { useSelector } from "react-redux";
import { RootState } from "store";
import styled from "styled-components";
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

	return (
		<Container>
			<PerfumeFilter />
			<ListContainer>
				<PerfumeList perfumes={perfumes} />
			</ListContainer>
			<div ref={setTarget}>{isLoading && <p></p>}</div>
		</Container>
	);
}

const Container = styled.div`
	width: 80%;
	margin: 0 auto;
	@media ${(props) => props.theme.mobileS} {
		width: 100%;
	}
`;

const ListContainer = styled.div`
	margin-top: 4rem;
`;
export default Perfumes;
