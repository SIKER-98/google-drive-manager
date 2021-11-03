import folderOperations from "../constants/folderOperations";

const clear = () => ({
    type: folderOperations.FOLDER_CLEAR
})

const rootId = item => ({
    type: folderOperations.FOLDER_SET_ROOT_ID, item
})

const setChildren = item => ({
    type: folderOperations.FOLDER_SET_CHILDREN, item
})

const childrenClear = () => ({
    type: folderOperations.FOLDER_CLEAR_CHILDREN
})


const folderEnter = item => ({
    type: folderOperations.FOLDER_ENTER, item
})

const folderBack = () => ({
    type: folderOperations.FOLDER_BACK
})

const folderChangeColor = item => ({
    type: folderOperations.FOLDER_CHANGE_COLOR, item
})

const folderDelete = item => ({
    type: folderOperations.FOLDER_DELETE, item
})

const folderChangeName = item => ({
    type: folderOperations.FOLDER_SET_NAME, item
})

const folderSetPermission = item => ({
    type: folderOperations.FOLDER_SET_PERMISSION, item
})

const folderMoveEnter = item => ({
    type: folderOperations.FOLDER_MOVE_ENTER, item
})

const folderMoveBack = () => ({
    type: folderOperations.FOLDER_MOVE_BACK
})

const selectFolder = item => ({
    type: folderOperations.FOLDER_SELECT, item
})

const unselectFolder = item => ({
    type: folderOperations.FOLDER_UNSELECT, item
})

const folderSelectClear = () => ({
    type: folderOperations.FOLDER_SELECT_CLEAR
})

const folderActions = {
    clear, rootId, setChildren, childrenClear, selectFolder, folderEnter, folderBack, folderSelectClear,
    folderChangeColor, folderDelete, folderChangeName, folderSetPermission, folderMoveEnter, folderMoveBack,
    unselectFolder,
}


export default folderActions
