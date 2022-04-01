import styled from "styled-components";
import { Container, FormContainer } from "components/community/create/Container";

function CommunityCreate() {
	return (
		<Container>
			<FormContainer>
				<select name="">
					<option value="">말머리선택</option>
					<option value="추천">추천</option>
					<option value="골라">골라</option>
					<option value="잡담">잡담</option>
				</select>
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
