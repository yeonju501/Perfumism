function PerfumeList({ perfumeList }) {
	return (
		<div>
			{perfumeList.map((perfume) => (
				<div>
					<img src={perfume.image} alt="perfume image" />
					<p>{perfume.perfume_name}</p>
				</div>
			))}
		</div>
	);
}

export default PerfumeList;
