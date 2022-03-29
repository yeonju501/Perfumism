import { Container } from "components/account/Container";
import { Button, Header } from "components/account/Index";
import { useEffect, useState } from "react";
import styled from "styled-components";

function SuccessPage() {
	const [count, setCount] = useState(5);

	useEffect(() => {
		setTimeout(() => location.replace("/"), 5000);
		changeCount();
	}, [count]);

	const changeCount = () => {
		setTimeout(() => setCount(count - 1), 1000);
	};

	return (
		<Container>
			<Header>비밀번호 변경 완료</Header>
			<Paragraph>{count}초후에 자동으로 메인 페이지로 이동합니다</Paragraph>
			<Button>회원가입하러 가기</Button>
			<Button>로그인하러 가기</Button>
		</Container>
	);
}

export default SuccessPage;

const Paragraph = styled.p`
	font-size: 2rem;
	margin-bottom: 5rem;
`;
