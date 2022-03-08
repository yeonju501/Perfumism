import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

const rootReducer = combineReducers({});

const persistConfig = {
	key: "root",
	storage,
	whitelist: [],
};

export default persistReducer(persistConfig, rootReducer);
