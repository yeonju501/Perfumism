import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import reviewApi from "apis/review";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ReviewText from "./ReviewText";

function ReviewSection() {
	const [reviews, setReviews] = useState([]);
	const [screenSize, setScreenSize] = useState(1);

	window.onresize = function () {
		setScreenSize(window.outerWidth);
		screenSize;
	};

	useEffect(() => {
		const getReview = async () => {
			const review = await reviewApi.getLatestReviews();
			setReviews(review.data.reviews);
		};
		getReview();
	}, []);

	const handleScroll = (direction?: string) => {
		if (direction) return document.getElementById("hi")?.scrollBy(-250, 0);
		document.getElementById("hi")?.scrollBy(250, 0);
	};

	return (
		reviews && (
			<Section id="hi">
				<Button icon={faChevronRight} onClick={() => handleScroll()} direction="right" />
				<Button icon={faChevronLeft} onClick={() => handleScroll("left")} />
				<Container>
					{reviews.slice(0, 10).map((review, idx) => (
						<ReviewText review={review} key={idx} />
					))}
				</Container>
			</Section>
		)
	);
}

export default ReviewSection;

const Section = styled.section`
	display: flex;
	justify-content: space-between;
	height: 50rem;
	width: 100vw;
	overflow-x: scroll;
	&::-webkit-scrollbar {
		display: none;
	}
	position: relative;
`;

const Container = styled.div`
	display: flex;
	margin: 0 auto;
`;

interface Button {
	direction?: string;
}
const Button = styled(FontAwesomeIcon)<Button>`
	display: block;
	font-size: 3rem;
	z-index: 2;
	cursor: pointer;
	position: sticky;
	color: gray;
	top: 50%;
	left: ${(props) => (props.direction ? `${window.outerWidth - 30}px` : "0")};
	@media ${(props) => props.theme.mobileS} {
		display: none;
	}
`;
