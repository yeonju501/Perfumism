import { Container, FormContainer } from "components/community/create/Container";
import { Dropdown, Label, Input } from "components/community";

function CommunityCreate() {
	return (
		<Container>
			<FormContainer>
				<div>
					<Dropdown />
					<Label htmlFor="title">제목</Label>
					<Input name="title" type="text" />
				</div>
				<Label htmlFor="content">내용</Label>
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
