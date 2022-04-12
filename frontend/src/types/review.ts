import { Reply } from "./reply";

export interface Review {
	comment_id: number;
	review_id: number;
	member_id: number;
	member_name: string;
	member_image: string;
	grade: number;
	content: string;
	likes: number;
	created_at?: string;
	replyList: Reply[];
	deletion?: boolean;
}
