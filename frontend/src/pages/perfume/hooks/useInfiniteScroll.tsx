import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import useIntersectionObserver from "./useIntersectionObserver";

interface PerfumeType {
	perfume_id: string;
	perfume_name: string;
	image: string;
	average_grade: number;
	likes: number;
}

interface useInfiniteScrollProps {
	requestApi: (currentPage: number) => Promise<any>;
}

const useInfiniteScroll = ({ requestApi }: useInfiniteScrollProps) => {
	const [perfumes, setPerfumes] = useState<PerfumeType[]>([]);
	const [totalPage, setTotalPage] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const { accord, sort, order } = useSelector((state: RootState) => state.filter);
	console.log(accord, sort, order);

	useEffect(() => {
		setCurrentPage(0);
		setPerfumes([]);
	}, [accord, sort, order]);

	useEffect(() => {
		console.log(currentPage, totalPage);
		getPerfumes();
	}, [currentPage]);

	const getPerfumes = async () => {
		setIsLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 500));
		const res = await requestApi(currentPage);
		setPerfumes((prev) => prev.concat(res.data.perfumes));
		setTotalPage(res.data.total_page_count);
		setCurrentPage(res.data.current_page_count);
		setIsLoading(false);
	};

	const onIntersect: IntersectionObserverCallback = async ([entry], observer) => {
		if (entry.isIntersecting && !isLoading) {
			if (currentPage && currentPage >= totalPage) return;
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
