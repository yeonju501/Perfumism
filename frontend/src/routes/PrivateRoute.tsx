import { Navigate, Outlet } from "react-router-dom";
import cookie from "react-cookies";

function PrivateRoute() {
	const token = cookie.load("accessToken");
	return token ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default PrivateRoute;
