import { Link } from "react-router-dom";

function RecommendPage() {
	return (
		<div>
			<div>
				<h1>Find your signature scent</h1>
			</div>
			<div>
				<Link to={"/survey"}>
					<button>누구나 자신만의 향기가 있습니다.</button>
				</Link>
			</div>
			<div>
				<button>자신만의 향기가 있는 당신, 비슷한 향기를 찾아보세요</button>
			</div>
		</div>
	);
}

export default RecommendPage;
