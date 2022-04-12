export interface Perfume {
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
	accords: Accords[];
	similar_perfume: [];
	likes: number;
}

interface Accords {
	accord_id: number;
	kor_name: string;
	eng_name: string;
}
