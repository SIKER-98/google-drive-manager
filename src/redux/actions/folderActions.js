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

const selectFolder = item => ({
    type: folderOperations.FOLDER_SELECT, item
})

const folderEnter = item => ({
    type: folderOperations.FOLDER_ENTER, item
})

const folderBack = () => ({
    type: folderOperations.FOLDER_BACK
})

const folderActions = {
    clear, rootId, setChildren, childrenClear, selectFolder, folderEnter, folderBack
}

export default folderActions
