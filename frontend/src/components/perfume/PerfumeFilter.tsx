import { useState } from "react";
import { useDispatch } from "react-redux";
import { SET_FILTER } from "store/filter";
import styled from "styled-components";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TagButton from "./TagButton";

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
	const [selected, setSelected] = useState("totalSurvey");
	const [clicked, setClicked] = useState(-1);

	const handleCategoryClick = (idx: number, e: React.MouseEvent<HTMLButtonElement>) => {
		const category = e.target as HTMLElement;
		const accord = category.innerText;
		if (accord === "All") {
			setAccord("");
			dispatch(SET_FILTER({ accord: "", sort: "totalSurvey", order: "desc" }));
		} else {
			setAccord(accord);
			dispatch(SET_FILTER({ accord, sort: "totalSurvey", order: "desc" }));
		}
		setSelected("totalSurvey");
		setClicked(idx);
	};

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (accord === "All") {
			if (e.target.value === "asc")
				dispatch(SET_FILTER({ accord: "", sort: "name", order: "asc" }));
			else if (e.target.value === "desc")
				dispatch(SET_FILTER({ accord: "", sort: "name", order: "desc" }));
			else dispatch(SET_FILTER({ accord: "", sort: "totalSurvey", order: "desc" }));
		}
		if (e.target.value === "asc") {
			dispatch(SET_FILTER({ accord, sort: "name", order: "asc" }));
		} else if (e.target.value === "desc") {
			dispatch(SET_FILTER({ accord, sort: "name", order: "desc" }));
		} else dispatch(SET_FILTER({ accord, sort: "totalSurvey", order: "desc" }));
		setSelected(e.target.value);
	};

	const handleScroll = (direction?: string) => {
		if (direction) return document.getElementById("filter")?.scrollBy(-250, 0);
		document.getElementById("filter")?.scrollBy(250, 0);
	};

	return (
		<Container>
			<TagsContainer>
				<Button icon={faChevronLeft} onClick={() => handleScroll("left")} />
				<Tags id="filter">
					{categories.map((category, idx) => (
						<TagButton
							handleCategoryClick={handleCategoryClick}
							key={idx}
							category={category}
							idx={idx}
							clicked={clicked}
						/>
					))}
				</Tags>
				<Button icon={faChevronRight} onClick={() => handleScroll()} direction="right" />
			</TagsContainer>
			<SelectContainer>
				<Select id="select" onChange={handleSelectChange} value={selected}>
					<option value="totalSurvey">트렌딩</option>
					<option value="asc">오름차순</option>
					<option value="desc">내림차순</option>
				</Select>
			</SelectContainer>
		</Container>
	);
}

const Container = styled.div`
	width: 90%;
	margin: 3rem auto;
`;

const TagsContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 2rem;
`;

const Tags = styled.div`
	overflow: auto;
	white-space: nowrap;
	::-webkit-scrollbar {
		display: none;
	}
	margin: 0 2rem;
`;

const SelectContainer = styled.div`
	display: flex;
`;

const Select = styled.select`
	margin-left: auto;
`;

interface Button {
	direction?: string;
}

const Button = styled(FontAwesomeIcon)<Button>`
	color: #cacaca;
	font-size: 2rem;
	cursor: pointer;
	left: ${(props) => (props.direction ? `${window.outerWidth - 30}px` : "0")};
`;

export default PerfumeFilter;
