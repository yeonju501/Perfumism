import perfumeApi from "apis/perfume";
import PerfumeList from "components/perfume/PerfumeList";
import { useEffect, useState } from "react";

interface PerfumeType {
	perfume_id: string;
	perfume_name: string;
	image: string;
	average_grade: number;
	likes: number;
}

function Perfumes() {
	const [perfumes, setPerfumes] = useState<PerfumeType[]>([]);
	const [totalPage, setTotalPage] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);

	useEffect(() => {
		getPerfumes();
	}, []);

	const getPerfumes = async () => {
		await perfumeApi.getPerfumes().then((res) => {
			setPerfumes(res.data.perfumes);
			setTotalPage(res.data.total_page_count);
			setCurrentPage(res.data.current_page_count);
		});
	};

	return <PerfumeList perfumes={perfumes} />;
}

export default Perfumes;
