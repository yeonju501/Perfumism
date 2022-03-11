import axios from "axios";
import { useEffect, useState } from "react";

function PerfumeDetail() {
	const URL = process.env.REACT_APP_MAIN_URL;
	const [perfumeData, setPerfumeData] = useState({});

	useEffect(() => {
		getPerfumeData();
	});

	const getPerfumeData = () => {
		axios({
			url: `${URL}/api/perfumes/1`,
			method: "GET",
		}).then((res) => setPerfumeData(res));
	};

	return (
		<div>
			<div>
				<img />
				<h1>향수 이름</h1>
				<h3>출시년도</h3>
				<h3>브랜드명</h3>
				<h3>평점</h3>
				<p>main accords</p>
			</div>
			<div>
				<p>notes</p>
				<p>지속력</p>
				<p>잔향</p>
			</div>
			<div>
				{/* 향수 사진+좋아요버튼 목록을 컴포넌트화 할것인가...? => 어디에 쓸수 있는가? */}
				<p>000과 비슷한 향수</p>
				<p>브랜드의 다른 향수</p>
			</div>
			<div>
				<p>Review 컴포넌트</p>
			</div>
		</div>
	);
}

export default PerfumeDetail;
