import React from "react";

interface Props {
	perfume_id: number;
	perfume_name: string;
	image: string;
	average_grade: number;
	likes: number;
	brand: {
		brand_id: number;
		brand_name: string;
	};
}

interface Perfumes {
	perfumes: Props[];
}

function MonthPerfume({ perfumes }: Perfumes) {
	return <div>MonthOfPerfume</div>;
}

export default MonthPerfume;
