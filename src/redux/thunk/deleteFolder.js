import axios from "axios";
import folderActions from "../actions/folderActions";

export const apiDeleteFolder = (folderId) =>
    async (dispatch, getState, api) => {
        const gdrive = getState().folderReducer.gdrive
        await axios.delete(api + `gdrive/${gdrive}/folder/${folderId}`)
            .then(res => {
                console.log(`deleteFolder: ${folderId}`)
                dispatch(folderActions.folderDelete(folderId))
            })
            .catch(e => {
                console.log('deleteFolder PROBLEM', e)
            })
    }
