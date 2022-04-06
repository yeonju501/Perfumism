export default function EngToKor(keyword: string | null) {
	if (keyword === "TALK") return "잡담";
	if (keyword === "RECOMMEND") return "추천";
	if (keyword === "CHOSE") return "투표";
	if (keyword === "ALL") return "전체";
	if (keyword === null) return null;
}
