import styled from "styled-components";
import { RecommendSection, PerfumesSection, ReviewSection, MonthOfPerfumes } from "components/main";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { profileApi } from "apis";
import { SET_USER } from "store/user";

function MainPage() {
	const dispatch = useDispatch();
	useEffect(() => {
		getUserInfo();
	});

	const getUserInfo = async () => {
		const res = await profileApi.getUserInfo();
		dispatch(SET_USER(res.data));
	};

	return (
		<Main>
			<RecommendSection />
			<ReviewSection />
			<PerfumesSection />
			<MonthOfPerfumes />
		</Main>
	);
}

export default MainPage;

const Main = styled.main`
	display: flex;
	flex-direction: column;
	height: 100%;
`;
