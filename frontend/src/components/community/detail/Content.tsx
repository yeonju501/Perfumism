import PreviewImage from "../create/PreviewImage";
import styled from "styled-components";
import EngToKor from "../utils/EngToKor";
import anonymous from "../../../assets/anonymous.jpg";

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
	const ImageUrl = [] as string[];
	if (articleData.image_url_list) {
		articleData.image_url_list.map((imageList) => ImageUrl.push(imageList.image_url));
	}

	return (
		<Container>
			<Header>
				<Title>
					[{EngToKor(articleData.subject)}] {articleData.title}
				</Title>
				<Profile>
					<ProfileImg
						src={articleData.member_image ? articleData.member_image : anonymous}
						alt=""
					/>
					<NickName>{articleData.member_name}</NickName>
				</Profile>
			</Header>
			{ImageUrl.length ? <PreviewImage previewImg={ImageUrl} /> : null}
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
	border-top: 1px solid #c0c0c0;
	border-bottom: 1px solid #c0c0c0;
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
	height: 5rem;
	border: 1px solid #c0c0c0;
	border-radius: 50%;
	margin-top: 1rem;
`;

const NickName = styled.p`
	font-size: 1.5rem;
	margin: 1rem 0;
`;

const Body = styled.div`
	min-height: 20vh;
	font-size: 1.5rem;
	margin: 1rem 0;
`;

export default Content;
