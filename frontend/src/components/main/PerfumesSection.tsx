import Background from "assets/background2.webp";
import { Section, Button } from "./index";

function PerfumesSection() {
	return (
		<Section image={Background}>
			<Button to="/perfumes">향수 목록 바로가기</Button>
		</Section>
	);
}

export default PerfumesSection;
