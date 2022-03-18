import AccordRecommend from "components/recommend/AccordRecommend";
import WordCloud from "components/recommend/WordCloud";
import PerfumeRecommend from "components/recommend/PerfumeRecommend";

function SurveyResult() {
	return (
		<div>
			<h1>result</h1>
			<AccordRecommend />
			<WordCloud />
			<PerfumeRecommend />
		</div>
	);
}

export default SurveyResult;
