import styled from "styled-components";
import Search from "./Search";
import Alert from "./alert/Alert";
import UserIcon from "./UserIcon";

function Icons() {
	return (
		<ListItem>
			<Search />
			<Alert />
			<UserIcon />
		</ListItem>
	);
}

export default Icons;

const ListItem = styled.li`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
