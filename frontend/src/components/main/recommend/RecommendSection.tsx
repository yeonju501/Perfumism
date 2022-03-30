import Background from "assets/background.webp";
import { Section, Button, Phrases } from "../index";

function RecommendSection() {
	return (
		<Section image={Background}>
			<Phrases title="Find Your Signature" content="당신의 가치를 더욱 빛 내줄 향수를 찾아보세요" />
			<Button to="/recommend">바로가기</Button>
		</Section>
	);
}

export default RecommendSection;
