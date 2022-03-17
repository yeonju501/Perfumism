import { useState, Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as star } from "@fortawesome/free-solid-svg-icons";

interface StarRatingProps {
	setRating: Dispatch<SetStateAction<number>>;
}

function StarRating({ setRating }: StarRatingProps) {
	const [starRatingOnOff, setStarRatingOnOff] = useState([
		{ color: "#a0a0a0", cursor: "pointer" },
		{ color: "#a0a0a0", cursor: "pointer" },
		{ color: "#a0a0a0", cursor: "pointer" },
		{ color: "#a0a0a0", cursor: "pointer" },
		{ color: "#a0a0a0", cursor: "pointer" },
	]);

	function handleStarClick(idx: number) {
		const tempStarRating: { color: string; cursor: string }[] = [];
		for (let i = 0; i < 5; i++) {
			if (i <= idx) {
				tempStarRating.push({ color: "#ffcb14", cursor: "pointer" });
			} else {
				tempStarRating.push({ color: "#a0a0a0", cursor: "pointer" });
			}
		}
		setRating(idx + 1);
		setStarRatingOnOff(tempStarRating);
	}

	return (
		<div>
			<FontAwesomeIcon icon={star} style={starRatingOnOff[0]} onClick={() => handleStarClick(0)} />
			<FontAwesomeIcon icon={star} style={starRatingOnOff[1]} onClick={() => handleStarClick(1)} />
			<FontAwesomeIcon icon={star} style={starRatingOnOff[2]} onClick={() => handleStarClick(2)} />
			<FontAwesomeIcon icon={star} style={starRatingOnOff[3]} onClick={() => handleStarClick(3)} />
			<FontAwesomeIcon icon={star} style={starRatingOnOff[4]} onClick={() => handleStarClick(4)} />
		</div>
	);
}

export default StarRating;
