import axios from "axios";
import folderActions from "../actions/folderActions";

export const apiPutFolderChangeColor = ({folderId, newColor}) =>
    async (dispatch, getState, api) => {
        // const gdrive = getState().folderReducer.gdrive
        const gdrive = getState().driveReducer.selectedDrive
        await axios.put(api + `gdrive/${gdrive}/folder/color`, {folderId, newColor})
            .then(res => {
                console.log(`putFolderChangeColor ${newColor}`)
                dispatch(folderActions.folderChangeColor({folderId, newColor}))
            })
            .catch(e => {
                console.log('putFolderChangeColor PROBLEM', e)
            })
    }
