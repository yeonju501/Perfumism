import perfumeApi from "apis/perfume";
import { useEffect, useState } from "react";
import useIntersectionObserver from "./useIntersectionObserver";

interface PerfumeType {
	perfume_id: string;
	perfume_name: string;
	image: string;
	average_grade: number;
	likes: number;
}

const useInfiniteScroll = () => {
	const [perfumes, setPerfumes] = useState<PerfumeType[]>([]);
	const [totalPage, setTotalPage] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (currentPage > totalPage) return;
		getPerfumes();
	}, [currentPage]);

	const getPerfumes = async () => {
		setIsLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 800));
		await perfumeApi.getPerfumes(currentPage).then((res) => {
			setPerfumes((prev) => prev.concat(res.data.perfumes));
			setTotalPage(res.data.total_page_count);
			setCurrentPage(res.data.current_page_count);
		});
		setIsLoading(false);
	};

	const onIntersect: IntersectionObserverCallback = async ([entry], observer) => {
		if (entry.isIntersecting && !isLoading) {
			observer.unobserve(entry.target);
			setCurrentPage((prev) => prev + 1);
			observer.observe(entry.target);
		}
	};

	const { setTarget } = useIntersectionObserver({
		root: null,
		rootMargin: "0px",
		threshold: 1,
		onIntersect,
	});

	return { setTarget, perfumes, isLoading };
};

export default useInfiniteScroll;
