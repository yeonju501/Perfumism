import { Navigate, Outlet } from "react-router-dom";
import cookie from "react-cookies";

function PrivateRoute() {
	const token = cookie.load("access_token");
	return token ? <Outlet /> : <Navigate to="/signin" />;
}

export default PrivateRoute;
