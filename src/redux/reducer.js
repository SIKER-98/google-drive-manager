import {combineReducers} from "redux";
import folderReducer from "./reducers/folderReducer";
import driveReducer from './reducers/driveReducer'
import authReducer from './reducers/authReducer'

const rootReducer = combineReducers({
    folderReducer: folderReducer,
    driveReducer: driveReducer,
    authReducer: authReducer,
    // googleFolderReducer:googleFolderReducer,
})

export default rootReducer
