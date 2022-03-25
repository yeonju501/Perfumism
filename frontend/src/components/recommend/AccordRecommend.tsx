import styled from "styled-components";

interface AccordProps {
	accords: string[];
}

function AccordRecommend({ accords }: AccordProps) {
	return <Container>{accords}</Container>;
}

const Container = styled.div``;

export default AccordRecommend;
