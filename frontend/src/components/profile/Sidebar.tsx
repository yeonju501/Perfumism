import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "store";

function Sidebar() {
	const username = useSelector((state: RootState) => state.user.username);

	return (
		<Container>
			<Title>PROFILE</Title>
			{/* <Line></Line> */}
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
	margin: 1rem 0;
	border-right: 0.03rem solid #dedede;
	text-align: center;
`;

const Title = styled.p`
	font-size: 1.5rem;
	color: #333333;
	font-weight: bold;
	margin-bottom: 4rem;
`;

const Line = styled.div`
	height: 0.1rem;
	background-color: #dedede;
`;
const LinkItem = styled(Link)`
	display: block;
	font-size: 1.5rem;
	margin-top: 2rem;
`;
export default Sidebar;
