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
				{perfumes.map((perfume) => (
					<MonthPerfume perfume={perfume} />
				))}
			</Section>
		)
	);
}

export default MonthOfPerfumes;

const Section = styled.section`
	display: flex;
	width: 100%;
	height: 50rem;
`;

const Title = styled.p`
	font-size: 3rem;
	font-weight: bold;
	margin: 0 auto;
	margin-top: 3rem;
`;
