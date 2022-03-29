import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import filter from "./filter";
import userInfo from "./user";

const rootReducer = combineReducers({
	filter,
	user: userInfo,
});

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["user"],
};

export default persistReducer(persistConfig, rootReducer);
export type RootState = ReturnType<typeof rootReducer>;
