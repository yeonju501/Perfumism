import perfumeApi from "apis/perfume";
import profileApi from "apis/profile";
import { AxiosResponse } from "axios";
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
	initialValues?: { currentPage: number };
	requestApi: (currentPage: number) => Promise<any>;
}

interface resDataType {
	perfumes: [];
	total_page_count: number;
	current_page_count: number;
}

const useInfiniteScroll = ({ requestApi }: useInfiniteScrollProps) => {
	const [perfumes, setPerfumes] = useState<PerfumeType[]>([]);
	const [totalPage, setTotalPage] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const { accord, sort, order } = useSelector((state: RootState) => state.filter);

	console.log(currentPage, totalPage);
	useEffect(() => {
		console.log("초기화");
		setPerfumes([]);
		setCurrentPage(0);
	}, [accord, sort, order]);

	useEffect(() => {
		console.log(currentPage, totalPage);
		getPerfumes();
	}, [currentPage, accord, sort, order]);

	const getPerfumes = async () => {
		setIsLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 800));
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
