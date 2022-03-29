import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import filter from "./filter";

const rootReducer = combineReducers({
	filter,
});

const persistConfig = {
	key: "root",
	storage,
	whitelist: [],
};

export default persistReducer(persistConfig, rootReducer);
