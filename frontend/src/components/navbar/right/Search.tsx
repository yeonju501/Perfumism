import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { searchApi } from "apis";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

interface InputProps {
	isOn: boolean;
}

function Search() {
	const navigate = useNavigate();
	const [toggleSearch, setToggleSearch] = useState(false);

	const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		runSearch(event.target.value);
	};

	const handleSearchInput = () => {
		setToggleSearch(!toggleSearch);
	};

	const runSearch = debounce(async (keyword) => {
		if (keyword.length > 2) {
			const perfume = await searchApi.searchPerfume(keyword);
			navigate(`/search/${keyword}`, {
				state: { results: perfume.data.perfumes, keyword },
			});
		}
	}, 1000);

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
	transform: ${({ isOn }) => isOn && "translate(-19rem, -.4rem)"};
	&:focus {
		outline: none;
	}

	@media ${(props) => props.theme.tabletS} {
		width: 15rem;
		transform: ${({ isOn }) => isOn && "translate(-13.5rem, -.4rem)"};
	}

	@media ${(props) => props.theme.mobileS} {
		width: 8rem;
		transform: ${({ isOn }) => isOn && "translate(-6rem, -.4rem)"};
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
	margin-top: 0.3rem;
`;
