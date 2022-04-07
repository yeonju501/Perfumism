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

	useEffect(() => {
		setPerfumes([]);
		setCurrentPage(0);
		getPerfumes(0);
	}, [accord, sort, order]);

	useEffect(() => {
		if (currentPage) getPerfumes(currentPage);
	}, [currentPage]);

	const getPerfumes = async (currentPage: number) => {
		// console.log(accord, sort, order);
		// console.log(currentPage, totalPage);
		setIsLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 500));
		const res = await requestApi(currentPage);
		setTotalPage(res.data.total_page_count);
		setPerfumes((prev) => [...prev, ...res.data.perfumes]);
		setIsLoading(false);
		// console.log(perfumes);
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

	return { setTarget, perfumes, isLoading, setPerfumes };
};

export default useInfiniteScroll;
