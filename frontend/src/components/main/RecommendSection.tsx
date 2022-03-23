import Background from "assets/background.webp";
import { Section, Button } from "./index";

function RecommendSection() {
	return (
		<Section image={Background}>
			<Button to="/recommend">추천 페이지 바로가기</Button>
		</Section>
	);
}

export default RecommendSection;
