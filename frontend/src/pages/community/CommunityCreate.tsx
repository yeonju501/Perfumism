import { useNavigate } from "react-router-dom";
import { Container, FormContainer } from "components/community/create/Container";
import { Dropdown, Label, Input, Textarea, Button } from "components/community";

function CommunityCreate() {
	const navigate = useNavigate();

	const handleListButtonClick = () => {
		navigate("/community");
	};

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
				<Button onClick={handleListButtonClick}>목록</Button>
				<Button>등록</Button>
			</div>
		</Container>
	);
}

export default CommunityCreate;
