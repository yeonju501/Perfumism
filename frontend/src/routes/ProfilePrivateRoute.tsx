import CheckPassword from "pages/profile/CheckPassword";
import { useState } from "react";
import { Outlet } from "react-router-dom";

function ProfilePrivateRoutes() {
	const [isCheck, setIsCheck] = useState(false);
	return isCheck ? <Outlet /> : <CheckPassword setIsCheck={setIsCheck} />;
}

export default ProfilePrivateRoutes;
