import { useState } from "react";
import { useDispatch } from "react-redux";
import { SET_FILTER } from "store/filter";
import styled from "styled-components";

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

	const handleCategoryClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		const category = e.target as HTMLElement;
		const accord = category.innerText;
		if (accord === "All") {
			dispatch(SET_FILTER({ accord: "", sort: "totalSurvey", order: "desc" }));
		} else {
			setAccord(accord);
			dispatch(SET_FILTER({ accord, sort: "totalSurvey", order: "desc" }));
		}
	};

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (accord === "All") {
			if (e.target.selectedIndex === 1)
				dispatch(SET_FILTER({ accord: "", sort: "name", order: "asc" }));
			else dispatch(SET_FILTER({ accord: "", sort: "name", order: "desc" }));
		}
		if (e.target.value === "name" && e.target.selectedIndex === 1) {
			dispatch(SET_FILTER({ accord, sort: "name", order: "asc" }));
		} else {
			dispatch(SET_FILTER({ accord, sort: e.target.value, order: "desc" }));
		}
	};

	return (
		<Container>
			<div>
				{categories.map((category, idx) => (
					<TagButton onClick={handleCategoryClick} key={idx}>
						{category}
					</TagButton>
				))}
			</div>
			<Select onChange={handleSelectChange} defaultValue="totalSurvey">
				<option value="totalSurvey">트렌딩</option>
				<option value="name">오름차순</option>
				<option value="name">내림차순</option>
			</Select>
		</Container>
	);
}

const Container = styled.div``;

const TagButton = styled.button`
	background-color: inherit;
	margin-right: 1rem;
	border: 0.1rem solid black;
	font-size: 1.4rem;
	font-weight: bold;
	padding: 0.7rem 1.2rem;
	border-radius: 1.5rem;
	cursor: pointer;
	&:hover {
		background-color: black;
		color: white;
	}
`;

const Select = styled.select``;

export default PerfumeFilter;
