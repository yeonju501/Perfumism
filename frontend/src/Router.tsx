import PerfumeDetail from "pages/PerfumeDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" />
				<Route path="/perfume/:perfumeId" element={<PerfumeDetail />} />
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
