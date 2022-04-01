import { Container, FormContainer } from "components/community/create/Container";
import { Dropdown } from "components/community";

function CommunityCreate() {
	return (
		<Container>
			<FormContainer>
				<Dropdown />
				<label htmlFor="title">제목</label>
				<input name="title" type="text" />
				<label htmlFor="content">내용</label>
				<textarea name="title" />
			</FormContainer>
			<div>
				<button>목록</button>
				<button>등록</button>
			</div>
		</Container>
	);
}

export default CommunityCreate;
