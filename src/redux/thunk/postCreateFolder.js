import axios from "axios";
import {apiGetFolderChildren} from "./getFolderChildren";


export const apiPostCreateFolder = ({folderName, parrents}) =>
    async (dispatch, getState, api) => {
        const gdrive = getState().folderReducer.gdrive
        await axios.put(api + `gdrive/${gdrive}/folder`, {folderName, parrents})
            .then(res => {
                console.log('postCreateFolder SUCCEDD')
                dispatch(apiGetFolderChildren(parrents[0]))
            })
            .catch(e => {
                console.log('postCreateFolder PROBLEM', e)
            })
    }
