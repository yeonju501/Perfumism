import PerfumeDetail from "pages/PerfumeDetail";
import RecommendPage from "pages/RecommendPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" />
				<Route path="/perfume/:perfumeId" element={<PerfumeDetail />} />
				<Route path="/recommend" element={<RecommendPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
