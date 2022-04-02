import { useSearchParams, useLocation } from "react-router-dom";
import { SurveyItem } from "components/recommend";
import styled from "styled-components";
import {
	FruitSrc,
	FlowerSrc,
	NatureSrc,
	SeaSrc,
	SweetSrc,
	PowderySrc,
	SmoothSrc,
	OrientalSrc,
	GrassSrc,
} from "assets/survey/index";

function Survey() {
	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get("page");
	const queryString = useLocation().search;
	const surveyList = [
		{
			answerNumber: "1",
			question: "다음 중 가장 마음에 드는 사진은 ?",
			answer: [
				{ url: FruitSrc, content: "과일" },
				{ url: FlowerSrc, content: "꽃" },
				{ url: NatureSrc, content: "자연" },
				{ url: SeaSrc, content: "바다" },
			],
		},
		{
			answerNumber: "2",
			question: "다음 중 가장 마음에 드는 단어 조합은 ?",
			answer: [
				{ url: SweetSrc, content: "달콤한, 상큼한" },
				{ url: PowderySrc, content: "포근한, 깨끗한" },
				{ url: SmoothSrc, content: "부드러운, 편안한" },
				{ url: OrientalSrc, content: "몽환적, 독특한" },
				{ url: GrassSrc, content: "풀향의, 아로마틱한" },
			],
		},
		{
			answerNumber: "3",
			question: "향수를 고를 때 나는",
			answer: [
				{ content: "향수를 뿌렸는데 냄새도 안나면 안되지,, 향은 강해야 돼 !" },
				{ content: "냄새가 안나도 좋으니까 향이 약했으면 좋겠어.." },
			],
		},
		{
			answerNumber: "4",
			question: "외출할 때 나는",
			answer: [
				{ content: "틈틈이 향수를 뿌리기 위해 공병에 담은 향수를 챙겨간다." },
				{ content: "귀찮아.. 한 번만 뿌리면 되지,, 하고 향수를 챙겨가지 않는다." },
			],
		},
		{
			answerNumber: "5",
			question: "내가 추천 받고 싶은 향기는",
			answer: [
				{ content: "호불호가 갈리지 않는 향이 좋아!" },
				{ content: "나만의 특별한 향이 있으면 좋겠어!" },
			],
		},
	];

	return (
		<Container>
			{surveyList.map((survey, idx) =>
				page === survey.answerNumber ? (
					<SurveyItem queryString={queryString} surveyListItem={survey} key={idx} />
				) : null,
			)}
		</Container>
	);
}

const Container = styled.div`
	min-height: 80vh;
	font-size: 1.5rem;
	display: flex;
	flex-direction: column;
`;

export default Survey;
