import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function StarRating() {
	const starRatingState: Array<string> = [];

	const [starRatingOnOff, setStarRatingOnOff] = useState(starRatingState);

	function mouseOverStarRating(inx: number) {
		const tempStarRating: Array<string> = [];
		for (let i = 0; i < 5; i++) {
			if (i < inx) {
				tempStarRating.push("item-rating pointer zmdi zmdi-star");
			} else {
				tempStarRating.push("item-rating pointer zmdi zmdi-star-outline");
			}
		}
		setStarRatingOnOff(tempStarRating); //새로운 state를 세팅한다.
	}

	useEffect(() => {
		for (let i = 0; i < 5; i++) {
			starRatingState.push("item-rating pointer zmdi zmdi-star-outline");
		}
		setStarRatingOnOff(starRatingState);
	}, []);

	return (
		<div>
			<FontAwesomeIcon
				icon={faStar}
				className={starRatingOnOff[0]}
				onClick={() => mouseOverStarRating(0)}
			/>
			<FontAwesomeIcon
				icon={faStar}
				className={starRatingOnOff[1]}
				onClick={() => mouseOverStarRating(1)}
			/>
			<FontAwesomeIcon
				icon={faStar}
				className={starRatingOnOff[2]}
				onClick={() => mouseOverStarRating(2)}
			/>
			<FontAwesomeIcon
				icon={faStar}
				className={starRatingOnOff[3]}
				onClick={() => mouseOverStarRating(3)}
			/>
			<FontAwesomeIcon
				icon={faStar}
				className={starRatingOnOff[4]}
				onClick={() => mouseOverStarRating(4)}
			/>
		</div>
	);
}

export default StarRating;
