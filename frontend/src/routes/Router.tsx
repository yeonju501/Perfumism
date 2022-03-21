import SignIn from "pages/account/signin/SignIn";
import SignUp from "pages/account/signup/SignUp";
import PerfumeDetail from "pages/perfume/PerfumeDetail";
import Recommend from "pages/recommend/Recommend";
import Survey from "pages/recommend/Survey";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" />
				<Route path="/perfume/:perfumeId" element={<PerfumeDetail />} />
				<Route path="/recommend" element={<Recommend />} />
				<Route path="/survey" element={<Survey />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/signin" element={<SignIn />} />
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
