import axios from 'axios'
import folderActions from "../actions/folderActions";

export const apiPutFolderMove = ({folder, destination}) =>
    async (dispatch, getState, api) => {
        // const gdrive = getState().folderReducer.gdrive
        const gdrive = getState().driveReducer.selectedDrive

        await axios.put(api + `gdrive/${gdrive}/folder/parent`, {
            folderId: folder.id,
            newParentId: destination,
            oldParentId: folder.parents[0]
        })
            .then(res => {
                console.log('putFolderMove', folder.name)
                // dispatch(folderActions.unselectFolder(folder))
            })
            .catch(e => {
                console.log('putFolderMove PROBLEM', e)
            })
    }


// {
//     "folderId":"144368E68C_Lupk9sa1XwoceS6eMGAuDi",
//     "newParentId":"176KmQyoswexFIXZwODTVsyE08AtcRz57",
//     "oldParentId":"0AKDB-V4TgcVwUk9PVA"
// }
