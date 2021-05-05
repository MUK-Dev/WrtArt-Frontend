import * as actionTypes from "./actions";

const initialState = {
	currentUser: null,
	validated: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_USER:
			return {
				...state,
				currentUser: action.user,
				validated: true,
			};
		case actionTypes.LOGOUT:
			return {
				...state,
				currentUser: null,
				validated: false,
			};
		default:
			return state;
	}
};

export default reducer;
