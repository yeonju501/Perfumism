import styled from "styled-components";

interface ArticleProps {
	articleData: {
		article_id: number;
		member_id: number;
		member_name: string;
		member_image: string;
		subject: string;
		title: string;
		content: string;
		createAt: string;
		updateAt: string;
		deleteAt: string;
		vote_exist: boolean;
		image_url_list: {
			article_image_id: number;
			createdAt: string;
			deletedAt: string;
			updatedAt: string;
			image_url: string;
		}[];
	};
}

function Content({ articleData }: ArticleProps) {
	return (
		<Container>
			<Header>
				<Title>
					[{articleData.subject}]{articleData.title}
				</Title>
				<Profile>
					<ProfileImg src={articleData.member_image} alt="" />
					<NickName>{articleData.member_name}</NickName>
				</Profile>
			</Header>
			<Body>{articleData.content}</Body>
		</Container>
	);
}

const Container = styled.div`
	width: 100%;
	display: flex;
	margin-top: 2rem;
	flex-direction: column;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-top: solid;
`;

const Title = styled.p`
	font-size: 2rem;
	margin: 1rem 0;
`;

const Profile = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
`;

const ProfileImg = styled.img`
	width: 5rem;
	border: 1px solid #c0c0c0;
	border-radius: 50%;
`;

const NickName = styled.p`
	font-size: 1.5rem;
	margin: 1rem 0;
`;

const Body = styled.p`
	min-height: 20vh;
	font-size: 1.5rem;
	margin: 1rem 0;
`;

export default Content;
