import {combineReducers} from "redux";
import folderReducer from "./reducers/folderReducer";
import driveReducer from './reducers/driveReducer'

const rootReducer = combineReducers({
    folderReducer: folderReducer,
    driveReducer: driveReducer,
    // googleFolderReducer:googleFolderReducer,
})

export default rootReducer
