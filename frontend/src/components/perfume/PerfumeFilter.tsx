function PerfumeFilter() {
	const categories = [
		"All",
		"woody",
		"sweet",
		"fresh",
		"floral",
		"musky",
		"fruity",
		"green",
		"aromatic",
		"aquatic",
		"vanilla",
		"amber",
		"citrus",
		"powdery",
		"aldehydic",
		"tropical",
		"animalic",
		"fresh spicy",
		"white floral",
		"warm spicy",
	];

	return (
		<div>
			<div>
				{categories.map((category) => (
					<button>{category}</button>
				))}
			</div>
			<div>드롭다운 필터</div>
		</div>
	);
}

export default PerfumeFilter;
