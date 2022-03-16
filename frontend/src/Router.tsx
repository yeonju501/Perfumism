import PerfumeDetail from "pages/PerfumeDetail";
import RecommendPage from "pages/RecommendPage";
import FirstSurveyPage from "pages/SurveyPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" />
				<Route path="/perfume/:perfumeId" element={<PerfumeDetail />} />
				<Route path="/recommend" element={<RecommendPage />} />
				<Route path="/survey" element={<FirstSurveyPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
