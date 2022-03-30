import perfumeApi from "apis/perfume";
import { useEffect, useState } from "react";
import styled from "styled-components";

function MonthOfPerfumes() {
	const [perfumes, setPerfumes] = useState([]);

	useEffect(() => {
		const getPerfumes = async () => {
			const monthOfPerfumes = await perfumeApi.getMonthOfPerfumes();
			setPerfumes(monthOfPerfumes.data.perfumes);
		};
		getPerfumes();
	}, []);

	return perfumes && <Section></Section>;
}

export default MonthOfPerfumes;

const Section = styled.section`
	display: flex;
	width: 100%;
	height: 50rem;
`;
