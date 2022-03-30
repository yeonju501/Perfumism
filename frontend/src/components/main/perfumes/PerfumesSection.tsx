import Background from "assets/background2.webp";
import { Section, Button, Phrases } from "../index";

function PerfumesSection() {
	return (
		<Section image={Background}>
			<Phrases title="All fragrances" content="향수 둘러보기" />
			<Button to="/perfumes">바로가기</Button>
		</Section>
	);
}

export default PerfumesSection;
