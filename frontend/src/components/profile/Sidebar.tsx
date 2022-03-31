import { Link } from "react-router-dom";
import styled from "styled-components";

function Sidebar() {
	return (
		<Container>
			<LinkItem to="">회원 정보수정</LinkItem>
			<LinkItem to="/profile/favorites">좋아요한 향수 관리</LinkItem>
			<LinkItem to="">내가 작성한 글</LinkItem>
			<LinkItem to="">내가 작성한 댓글</LinkItem>
			<LinkItem to="">비밀번호 변경</LinkItem>
		</Container>
	);
}

const Container = styled.div`
	width: 20%;
	border: 0.03rem solid black;
`;

const LinkItem = styled(Link)`
	display: block;
`;
export default Sidebar;
