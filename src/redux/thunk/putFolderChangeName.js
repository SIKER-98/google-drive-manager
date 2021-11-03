import axios from 'axios'
import folderActions from "../actions/folderActions";


export const apiPutFolderChangeName = ({folderId, newName}) =>
    async (dispatch, getState, api) => {
        const gdrive = getState().folderReducer.gdrive
        await axios.put(api + `gdrive/${gdrive}/folder/folderName`, {folderId, newName})
            .then(res => {
                console.log('putFolderChangeName:', newName)
                dispatch(folderActions.folderChangeName({folderId,newName}))
            })
            .catch(e => {
                console.log('putFolderChangeName PROBLEM', e)
            })
    }
