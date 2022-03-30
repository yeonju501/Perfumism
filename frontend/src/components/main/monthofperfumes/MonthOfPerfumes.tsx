import perfumeApi from "apis/perfume";
import { useEffect, useState } from "react";
import styled from "styled-components";
import MonthPerfume from "./MonthPerfume";

function MonthOfPerfumes() {
	const [perfumes, setPerfumes] = useState([]);

	useEffect(() => {
		const getPerfumes = async () => {
			const monthOfPerfumes = await perfumeApi.getMonthOfPerfumes();
			setPerfumes(monthOfPerfumes.data);
		};
		getPerfumes();
	}, []);

	return (
		perfumes && (
			<Section>
				<Title>이 달의 인기 향수</Title>
				<Container>
					{perfumes.map((perfume) => (
						<MonthPerfume perfume={perfume} />
					))}
				</Container>
			</Section>
		)
	);
}

export default MonthOfPerfumes;

const Section = styled.section`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 50rem;
`;

const Title = styled.p`
	font-size: 3rem;
	font-weight: bold;
	margin: 2rem auto;
	margin-top: 3rem;
`;

const Container = styled.div`
	display: flex;
`;
