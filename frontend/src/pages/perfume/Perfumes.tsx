import perfumeApi from "apis/perfume";
import PerfumeList from "components/perfume/PerfumeList";
import { useEffect, useState } from "react";
import useIntersectionObserver from "./hooks/useIntersectionObserver";

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
	const [isLoading, setIsLoading] = useState(false);
	console.log(0);
	console.log(perfumes);
	console.log(currentPage, totalPage);

	useEffect(() => {
		// console.log(1);
		// perfumeApi.getPerfumes(0).then((res) => {
		// 	setPerfumes(res.data.perfumes);
		// 	setTotalPage(res.data.total_page_count);
		// });
	}, []);

	const getPerfumes = async () => {
		// console.log("getPerfumes 실행");
		// setIsLoading(true);
		// console.log("setloading true 실행");
		// await new Promise((resolve) => setTimeout(resolve, 1000));
		// setCurrentPage((prev) => prev + 1);
		// console.log("currentpage + 1 실행");
		// console.log(`현재페이지 ${currentPage}`);
		// await perfumeApi.getPerfumes(currentPage).then((res) => {
		// 	console.log(res.data);
		// 	setPerfumes((prev) => prev.concat(res.data.perfumes));
		// 	setCurrentPage(res.data.current_page_count);
		// });
		// setIsLoading(false);
	};

	const onIntersect: IntersectionObserverCallback = async ([entry], observer) => {
		// if (entry.isIntersecting && !isLoading) {
		// 	console.log(3);
		// 	observer.unobserve(entry.target);
		// 	await getPerfumes();
		// 	observer.observe(entry.target);
		// }
	};

	const { setTarget } = useIntersectionObserver({
		root: null,
		rootMargin: "0px",
		threshold: 0.5,
		onIntersect,
	});

	return (
		<div>
			<PerfumeList perfumes={perfumes} />
			<div ref={setTarget}>{isLoading && <p>Loading..</p>}</div>
		</div>
	);
}

export default Perfumes;
