import { combineReducers } from "redux";
import EmployeeReducer from "./Employee-reducer";

export const rootReducer =combineReducers({
    AddReducer:EmployeeReducer
})