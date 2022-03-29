import { useState } from "react";
import { useDispatch } from "react-redux";
import { SET_FILTER } from "store/filter";

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

function PerfumeFilter() {
	const dispatch = useDispatch();
	const [accord, setAccord] = useState("");
	const [sort, setSort] = useState("");
	const [order, setOrder] = useState("");

	const handleCategoryClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		const category = e.target as HTMLElement;
		const accord = category.innerText;
		if (accord === "All") {
			dispatch(SET_FILTER({ accord: "", sort: "", order: "" }));
		} else {
			setAccord(accord);
			dispatch(SET_FILTER({ accord, sort, order }));
		}
	};

	return (
		<div>
			<div>
				{categories.map((category) => (
					<button onClick={handleCategoryClick}>{category}</button>
				))}
			</div>
			<div>드롭다운 필터</div>
		</div>
	);
}

export default PerfumeFilter;
