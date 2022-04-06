import Sidebar from "components/profile/Sidebar";
import { Outlet } from "react-router";
import styled from "styled-components";

function ProfileRoute() {
	return (
		<Container>
			<Sidebar />
			<Outlet />
		</Container>
	);
}

export default ProfileRoute;

const Container = styled.div`
	display: flex;

	min-height: 100vh;
`;
