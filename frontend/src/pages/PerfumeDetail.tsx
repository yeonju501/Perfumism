import axios from "axios";
import PerfumeList from "components/PerfumeList";
import { useEffect, useState } from "react";

type perfumeDataType = {
	perfume_id: number;
	perfume_name: string;
	brand: {
		brand_id: number;
		brand_name: string;
	};
	image: string;
	launch_year: number;
	average_grade: number;
	top_notes: string;
	middle_notes: string | null;
	base_notes: string | null;
	total_survey: number;
	longevity: string;
	sillage: string;
	accords: [];
	similar_perfume: [];
};

type accordType = {
	accord_id: number;
	kor_name: string;
	eng_name: string;
};

function PerfumeDetail() {
	const URL = process.env.REACT_APP_MAIN_URL;
	const [perfumeData, setPerfumeData] = useState<perfumeDataType | null>(null);

	useEffect(() => {
		getPerfumeData();
	}, []);

	const getPerfumeData = () => {
		axios({
			url: `${URL}/api/perfumes/1`,
			method: "GET",
		}).then((res) => {
			console.log(res.data);
			setPerfumeData(res.data);
		});
	};

	return (
		perfumeData && (
			<div>
				<div>
					<img />
					<h1>{perfumeData.perfume_name}</h1>
					<h3>{perfumeData.launch_year}</h3>
					<h3>{perfumeData.brand.brand_name}</h3>
					<h3>{perfumeData.average_grade}</h3>
					<p>main accords</p>
					<ul>
						{perfumeData.accords.map((accord: accordType) => (
							<li key={accord.accord_id}>{accord.eng_name}</li>
						))}
					</ul>
				</div>
				<div>
					<p>{perfumeData.top_notes}</p>
					<p>{perfumeData.middle_notes}</p>
					<p>{perfumeData.base_notes}</p>
					<p>{perfumeData.longevity}</p>
					<p>{perfumeData.sillage}</p>
				</div>
				<div>
					<p>000과 비슷한 향수</p>
					{perfumeData && <PerfumeList perfumes={perfumeData.similar_perfume} />}
					<p>브랜드의 다른 향수</p>
				</div>
				<div>
					<p>Review 컴포넌트</p>
				</div>
			</div>
		)
	);
}

export default PerfumeDetail;
