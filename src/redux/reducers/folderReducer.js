import folderOperations from "../constants/folderOperations";

const INITIAL_STATE = {
    name: 'folderReducer',

    gdrive: 'sikorskieducation@gmail.com',
    rootFolderId: '',
    currentFolder: null,
    currentFolderChildren: [],
    folderStack: [],

    selectedFolder: [],
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
        case folderOperations.FOLDER_SET_NAME:
            return {
                ...state,
                currentFolderChildren: state.currentFolderChildren.map(child => {
                    if (child.id === action.item.folderId)
                        child.name = action.item.newName
                    return child
                })
            }
        case folderOperations.FOLDER_SET_PERMISSION:
            return {
                ...state,
                currentFolderChildren: state.currentFolderChildren.map(child => {
                    if (child.id === action.item.folderId) {
                        if (action.item.role === 'private')
                            child.permissions = child.permissions.filter(perm => perm.type !== 'anyone')
                        else
                            child.permissions = child.permissions.map(perm => {
                                if (perm.type === 'anyone')
                                    perm.role = action.item.role
                                return perm
                            })
                    }
                    return child
                })
            }

        case folderOperations.FOLDER_SELECT:
            state.selectedFolder.push(action.item)
            return {
                ...state,
            }

        case folderOperations.FOLDER_UNSELECT:
            return {
                ...state,
                selectedFolder: state.selectedFolder.filter(folder => folder.id !== action.item.id)
            }

        case folderOperations.FOLDER_SELECT_CLEAR:
            return {
                ...state,
                selectedFolder: [],
            }

        default:
            return state
    }
}

export default folderReducer
