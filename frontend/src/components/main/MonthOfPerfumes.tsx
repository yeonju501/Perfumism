import perfumeApi from "apis/perfume";
import { useEffect, useState } from "react";
import styled from "styled-components";
import MonthPerfume from "./MonthPerfume";

function MonthOfPerfumes() {
	const [perfumes, setPerfumes] = useState([]);

	useEffect(() => {
		const getPerfumes = async () => {
			const monthOfPerfumes = await perfumeApi.getMonthOfPerfumes();
			console.log(monthOfPerfumes.data);
			setPerfumes(monthOfPerfumes.data);
		};
		getPerfumes();
	}, []);

	return (
		perfumes && (
			<Section>
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
