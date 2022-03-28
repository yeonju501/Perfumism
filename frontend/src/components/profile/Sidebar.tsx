import { Link } from "react-router-dom";

function Sidebar() {
	return (
		<div>
			<Link to="">회원 정보수정</Link>
			<Link to="/profile/favorites">좋아요한 향수 관리</Link>
			<Link to="">내가 작성한 글</Link>
			<Link to="">내가 작성한 댓글</Link>
		</div>
	);
}

export default Sidebar;
