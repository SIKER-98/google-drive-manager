import axios from 'axios'
import folderActions from "../actions/folderActions";

export const apiGetFolderFolders = (folderId) =>
    async (dispatch, getState, api) => {
        // const gdrive = getState().folderReducer.gdrive
        const gdrive = getState().driveReducer.gdrive
        await axios.get(api + `gdrive/${gdrive}/folder/${folderId}`)
            .then(res => {
                const children = res.data.data.fileList.filter(folder => folder.mimeType === 'application/vnd.google-apps.folder')
                dispatch(folderActions.folderMoveEnter(children))
            })
            .catch(e => {
                console.log('getFolderFolders PROBLEM', e)
            })
    }
