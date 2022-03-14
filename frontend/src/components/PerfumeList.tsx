type Perfume = {
	perfume_id: number;
	perfume_name: string;
	brand_name: string;
	image: string;
};

function PerfumeList({ perfumeList }) {
	return (
		<div>
			{perfumeList.map((perfume: Perfume) => (
				<div>
					<img src={perfume.image} alt="perfume image" />
					<p>{perfume.perfume_name}</p>
				</div>
			))}
		</div>
	);
}

export default PerfumeList;
