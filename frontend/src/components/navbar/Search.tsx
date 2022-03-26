import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import searchApi from "apis/serach";

interface InputProps {
	isOn: boolean;
}

function Search() {
	const [searchContent, setSearchContent] = useState("");
	const [toggleSearch, setToggleSearch] = useState(false);
	const [searchResult, setSearchResult] = useState([]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchContent(event.target.value);
	};

	const handleSearchInput = () => {
		setToggleSearch(!toggleSearch);
	};

	return (
		<SearchForm>
			<Input placeholder="향수명, 브랜드, 키워드" onChange={handleChange} isOn={toggleSearch} />
			<FontAwesome icon={faMagnifyingGlass} onClick={handleSearchInput}></FontAwesome>
		</SearchForm>
	);
}

export default Search;

const Input = styled.input<InputProps>`
	width: 20rem;
	height: 3rem;
	padding: 1rem;
	position: absolute;
	display: ${({ isOn }) => (isOn ? "block" : "none")};
	border-radius: 0.5rem;
	transform: ${({ isOn }) => isOn && "translateX(-19rem)"};
	&:focus {
		outline: none;
	}
`;

const FontAwesome = styled(FontAwesomeIcon)`
	width: 1.8rem;
	height: 1.8rem;
	margin-left: 2rem;
	cursor: pointer;
`;

const SearchForm = styled.form`
	display: flex;
	align-items: center;
`;
