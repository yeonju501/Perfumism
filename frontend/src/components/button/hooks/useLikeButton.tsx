import { useEffect, useState } from "react";

interface useLikeButtonProps {
	getIsLiked: () => Promise<any>;
	addLike: () => Promise<any>;
	cancelLike: () => Promise<any>;
}

const useLikeButton = ({ getIsLiked, addLike, cancelLike }: useLikeButtonProps) => {
	const [isLiked, setIsLiked] = useState(false);

	useEffect(() => {
		isTypeLiked();
	}, []);

	const isTypeLiked = async () => {
		const res = await getIsLiked();
		setIsLiked(res.data.is_liked);
	};

	const handleHeartClick = async () => {
		isLiked ? await cancelLike() : await addLike();
		setIsLiked((prev) => !prev);
	};

	return {
		isLiked,
		handleHeartClick,
	};
};

export default useLikeButton;
