const LOGIN = "user/setUserInfo";
const DELETE = "user/deleteUserInfo";

interface dataType {
	email: string;
	gender: number;
	id: number;
	image: string;
	social_id: string;
	username: string;
}

interface actionType {
	type: string;
	data: dataType;
}

export const DELETE_USER = () => ({ type: DELETE });
export const SET_USER = (data: dataType) => ({ type: LOGIN, data });

const initialState = {
	email: "",
	gender: 0,
	id: 0,
	image: "",
	social_id: "",
	username: "",
};

const userInfo = (state = initialState, action: actionType) => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				email: action.data.email,
				gender: action.data.gender,
				id: action.data.id,
				image: action.data.image,
				social_id: action.data.social_id,
				username: action.data.username,
			};
		case DELETE:
			return {
				email: "",
				gender: 0,
				id: 0,
				image: "",
				social_id: "",
				username: "",
			};
		default:
			return state;
	}
};

export default userInfo;
