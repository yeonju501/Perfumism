import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "store";

function Sidebar() {
	const username = useSelector((state: RootState) => state.user.username);

	return (
		<Container>
			<LinkItem to={`/profile/${username}`}>회원 정보수정</LinkItem>
			<LinkItem to="/profile/favorites">좋아요한 향수 관리</LinkItem>
			<LinkItem to="/profile/my-articles">내가 작성한 글</LinkItem>
			<LinkItem to="/profile/my-comments">내가 작성한 댓글</LinkItem>
			<LinkItem to="/profile/change-pw">비밀번호 변경</LinkItem>
		</Container>
	);
}

const Container = styled.div`
	width: 20%;
	border: 0.03rem solid black;
	margin-left: 20rem;
`;

const LinkItem = styled(Link)`
	display: block;
	font-size: 1.5rem;
	text-align: center;
`;
export default Sidebar;
