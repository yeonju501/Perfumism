import perfumeApi from "apis/perfume";
import reviewApi from "apis/review";
import React, { useEffect, useState } from "react";

interface useLikeButtonProps {
	type: string;
	typeId: string | number;
}

const useLikeButton = ({ type, typeId }: useLikeButtonProps) => {
	const [isLiked, setIsLiked] = useState(false);

	useEffect(() => {
		isTypeLiked();
	}, []);

	const isTypeLiked = async () => {
		if (type === "perfume") {
			await perfumeApi.isPerfumeLiked(typeId).then((res) => setIsLiked(res.data.is_liked));
		} else if (type === "review") {
			await reviewApi.isReviewLiked(typeId).then((res) => setIsLiked(res.data.is_liked));
		}
	};

	const handleHeartClick = async () => {
		isLiked
			? await perfumeApi.deleteFavoritePerfume(typeId)
			: await perfumeApi.addFavoritePerfume(typeId);
		setIsLiked((prev) => !prev);
	};

	return {
		isLiked,
		handleHeartClick,
	};
};

export default useLikeButton;
