import axios from "axios";
import {apiGetFolderChildren} from "./getFolderChildren";


export const apiPostCreateFolder = ({folderName, parents}) =>
    async (dispatch, getState, api) => {
        // const gdrive = getState().folderReducer.gdrive
        const gdrive = getState().driveReducer.selectedDrive
        console.log(folderName, parents)
        await axios.post(api + `gdrive/${gdrive}/folder`, {folderName, parents})
            .then(res => {
                console.log('postCreateFolder SUCCEDD')
                dispatch(apiGetFolderChildren(parents[0]))
            })
            .catch(e => {
                console.log('postCreateFolder PROBLEM', e)
            })
    }
