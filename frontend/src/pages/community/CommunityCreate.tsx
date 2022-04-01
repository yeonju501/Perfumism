import { Container, FormContainer } from "components/community/create/Container";
import { Dropdown, Label, Input, Textarea } from "components/community";

function CommunityCreate() {
	return (
		<Container>
			<FormContainer>
				<Dropdown />
				<Label htmlFor="title">제목</Label>
				<Input name="title" type="text" placeholder="제목을 입력해주세요." />
				<Label htmlFor="content">내용</Label>
				<Textarea name="content" placeholder="내용을 입력해주세요." />
			</FormContainer>
			<div>
				<button>목록</button>
				<button>등록</button>
			</div>
		</Container>
	);
}

export default CommunityCreate;
