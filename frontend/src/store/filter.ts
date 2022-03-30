const SET = "filter/setFilter";

interface dataType {
	accord: string;
	sort: string;
	order: string;
}

interface actionType {
	type: string;
	data: dataType;
}

export const SET_FILTER = (data: dataType) => ({ type: SET, data });

const initialState = {
	accord: "",
	sort: "totalSurvey",
	order: "desc",
};

const filter = (state = initialState, action: actionType) => {
	switch (action.type) {
		case SET:
			return {
				...state,
				accord: action.data.accord,
				sort: action.data.sort,
				order: action.data.order,
			};
		default:
			return state;
	}
};

export default filter;
