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
                ...INITIAL_STATE,
            }
        case folderOperations.FOLDER_SELECT:
            return {
                ...state,
                selectedFolder: action.item
            }
        case folderOperations.FOLDER_SELECT_CLEAR:
            return {
                ...state,
                selectedFolder: null,
            }
        case folderOperations.FOLDER_ENTER:
            state.folderStack.push(action.item)
            return {
                ...state,
                selectedFolder: null
            }
        case folderOperations.FOLDER_BACK:
            state.folderStack.pop()
            return {
                ...state,
                selectedFolder: null
            }
        case folderOperations.FOLDER_CHANGE_COLOR:
            return {
                ...state,
                currentFolderChildren: state.currentFolderChildren.map(child => {
                    if (child.id === action.item.folderId)
                        child.folderColorRgb = action.item.newColor
                    return child
                })
            }

        case folderOperations.FOLDER_DELETE:
            return {
                ...state,
                currentFolderChildren: state.currentFolderChildren.filter(child => child.id !== action.item)
            }

        default:
            return state
    }
}

export default folderReducer
