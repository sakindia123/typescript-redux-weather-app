import { createStore } from "redux";
import { favouriteReducer } from "./Reducer";

const store = createStore(
    favouriteReducer
)

export default store