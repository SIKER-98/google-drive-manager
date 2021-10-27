import {combineReducers} from "redux";
import folderReducer from "./reducers/folderReducer";

const rootReducer = combineReducers({
    folderReducer:folderReducer,
    // googleFolderReducer:googleFolderReducer,
})

export default rootReducer
