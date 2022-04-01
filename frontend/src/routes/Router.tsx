import Navbar from "components/navbar/Navbar";
import ScrollToTop from "components/ScrollToTop";
import FindPassword from "pages/account/find-pw/FindPassword";
import SignIn from "pages/account/signin/SignIn";
import SignUp from "pages/account/signup/SignUp";
import GoogleLoginPage from "pages/account/socialogin/GoogleLoginPage";
import KaKaoLoginPage from "pages/account/socialogin/KaKaoLoginPage";
import Main from "pages/main/Main";
import PageNotFoundPage from "pages/pagenotfound/PageNotFoundPage";
import PerfumeBrand from "pages/perfume/PerfumeBrand";
import PerfumeDetail from "pages/perfume/PerfumeDetail";
import Perfumes from "pages/perfume/Perfumes";
import Favorites from "pages/profile/Favorites";
import MyArticles from "pages/profile/MyArticles";
import MyComments from "pages/profile/MyComments";
import Profile from "pages/profile/Profile";
import Recommend from "pages/recommend/Recommend";
import Survey from "pages/recommend/Survey";
import SurveyResult from "pages/recommend/SurveyResult";
import SearchResultPage from "pages/search/SearchResultPage";
import Loading from "pages/recommend/Loading";
import Community from "pages/community/Community";
import CommunityDetail from "pages/community/CommunityDetail";
import CommunityCreate from "pages/community/CommunityCreate";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import InputCodePage from "pages/account/find-pw/InputCodePage";
import ChangePasswordPage from "pages/account/find-pw/ChangePasswordPage";
import SuccessPage from "pages/account/find-pw/SuccessPage";
import CheckPassword from "pages/profile/CheckPassword";
import ChangePassword from "pages/profile/ChangePassword";

function Router() {
	return (
		<BrowserRouter>
			<ScrollToTop />
			<Navbar />
			<Routes>
				<Route path="/recommend" element={<Recommend />} />
				<Route path="/profile/:username" element={<Profile />} />
				<Route path="/profile/favorites" element={<Favorites />} />
				<Route path="/profile/my-articles" element={<MyArticles />} />
				<Route path="/profile/my-comments" element={<MyComments />} />
				<Route path="/perfume/:perfumeId" element={<PerfumeDetail />} />
				<Route path="/perfumes" element={<Perfumes />} />
				<Route path="/perfumes/:brandName" element={<PerfumeBrand />} />
				<Route path="/survey" element={<Survey />} />
				<Route path="/survey/result" element={<SurveyResult />} />
				<Route path="/loading" element={<Loading />} />
				<Route path="/" element={<Main />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/find-password" element={<FindPassword />} />
				<Route path="/login/oauth2/code/kakao" element={<KaKaoLoginPage />} />
				<Route path="/login/oauth2/code/google" element={<GoogleLoginPage />} />
				<Route path="/*" element={<PageNotFoundPage />} />
				<Route path="/search/:keyword" element={<SearchResultPage />} />
				<Route path="/community" element={<Community />} />
				<Route path="/community/:articleId" element={<CommunityDetail />} />
				<Route path="/community/create" element={<CommunityCreate />} />
				<Route path="/check-code" element={<InputCodePage />} />
				<Route path="/password/change-pw" element={<ChangePasswordPage />} />
				<Route path="/password/success" element={<SuccessPage />} />
				<Route path="/profile/check-password" element={<CheckPassword />} />
				<Route path="/profile/change-pw" element={<ChangePassword />} />
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
