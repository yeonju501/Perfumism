import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as star } from "@fortawesome/free-solid-svg-icons";

interface StarRatingProps {
	grade: number;
	setGrade: Dispatch<SetStateAction<number>>;
}

function StarRating({ grade, setGrade }: StarRatingProps) {
	const [starRatingOnOff, setStarRatingOnOff] = useState<{ color: string; cursor: string }[]>([]);

	function handleStarClick(idx: number) {
		setGrade(idx + 1);
	}

	useEffect(() => {
		const tempStarRating: { color: string; cursor: string }[] = [];
		for (let i = 0; i < 5; i++) {
			if (i < grade) {
				tempStarRating.push({ color: "#ffcb14", cursor: "pointer" });
			} else {
				tempStarRating.push({ color: "#cecece", cursor: "pointer" });
			}
		}
		setStarRatingOnOff(tempStarRating);
	}, [grade]);

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
