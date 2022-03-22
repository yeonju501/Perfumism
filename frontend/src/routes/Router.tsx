import FindPassword from "pages/account/find-pw/FindPassword";
import SignIn from "pages/account/signin/SignIn";
import SignUp from "pages/account/signup/SignUp";
import GoogleLoginPage from "pages/account/socialogin/GoogleLoginPage";
import KaKaoLoginPage from "pages/account/socialogin/KaKaoLoginPage";
import PageNotFoundPage from "pages/pagenotfound/PageNotFoundPage";
import PerfumeDetail from "pages/perfume/PerfumeDetail";
import Favorites from "pages/profile/Favorites";
import MyArticles from "pages/profile/MyArticles";
import MyComments from "pages/profile/MyComments";
import Profile from "pages/profile/Profile";
import Recommend from "pages/recommend/Recommend";
import Survey from "pages/recommend/Survey";
import SurveyResult from "pages/recommend/SurveyResult";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" />
				<Route path="/:username" element={<Profile />} />
				<Route path="/:username/favorites" element={<Favorites />} />
				<Route path="/:username/my-articles" element={<MyArticles />} />
				<Route path="/:username/my-comments" element={<MyComments />} />
				<Route path="/perfume/:perfumeId" element={<PerfumeDetail />} />
				<Route path="/recommend" element={<Recommend />} />
				<Route path="/survey" element={<Survey />} />
				<Route path="/survey/result" element={<SurveyResult />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/find-password" element={<FindPassword />} />
				<Route path="/login/oauth2/code/kakao" element={<KaKaoLoginPage />} />
				<Route path="/login/oauth2/code/google" element={<GoogleLoginPage />} />
				<Route path="/*" element={<PageNotFoundPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
