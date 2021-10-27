import folderOperations from "../constants/folderOperations";

const INITIAL_STATE = {
    name: 'folderReducer',

    gdrive: 'sikorskieducation@gmail.com',
    rootFolderId: '',
    selectedFolder: null,
    currentFolder: null,
    currentFolderChildren: [],
    folderStack: []
}

const folderReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case folderOperations.FOLDER_SET_ROOT_ID:
            return {
                ...state,
                rootFolderId: action.item
            }
        case folderOperations.FOLDER_SET_CHILDREN:
            return {
                ...state,
                currentFolderChildren: action.item.children,
                currentFolder: action.item.folderId,
            }
        case folderOperations.FOLDER_CLEAR_CHILDREN:
            return {
                ...state,
                currentFolderChildren: []
            }
        case folderOperations.FOLDER_CLEAR:
            return {
                state: INITIAL_STATE,
            }
        case folderOperations.FOLDER_SELECT:
            return {
                ...state,
                selectedFolder: action.item
            }
        case folderOperations.FOLDER_ENTER:
            state.folderStack.push(action.item)
            return {
                ...state,
            }
        case folderOperations.FOLDER_BACK:
            state.folderStack.pop()
            return {
                ...state,
            }

        default:
            return state
    }
}

export default folderReducer
