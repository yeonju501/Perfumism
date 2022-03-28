import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebookF, faTwitter } from "@fortawesome/free-brands-svg-icons";

function Footer() {
	return (
		<Container>
			<SubContainer>
				<FontAwesome icon={faInstagram} />
				<FontAwesome icon={faFacebookF} />
				<FontAwesome icon={faTwitter} />
			</SubContainer>
			<Content>
				주소: 서울 강남구 밤고개로 99 | 사업자등록번호: 123-45-678910 사업자정보확인 | 상호:
				PERFUMISM | 대표: 김대표
			</Content>
			<Content>
				고객 문의 이메일: help@perfumism.com | 고객 센터: 123-456-789 | 개인정보취급방침 및 이용약관
				| 개인정보관리책임자: 김대표
			</Content>
			<Content>Created by SADARITAJO. © PERFUMISM All right reserved.</Content>
		</Container>
	);
}

export default Footer;

const Container = styled.footer`
	background: #000;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 20rem;
`;

const SubContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 3rem;
`;

const FontAwesome = styled(FontAwesomeIcon)`
	width: 2rem;
	height: 2rem;
	color: #fff;
	margin-right: 2rem;
	cursor: pointer;
`;

const Content = styled.span`
	font-size: 1.3rem;
	color: rgb(123, 123, 123);
	margin: 0;
	margin-bottom: 0.5rem;
	@media ${(props) => props.theme.mobile} {
		font-size: 1rem;
	}
`;
