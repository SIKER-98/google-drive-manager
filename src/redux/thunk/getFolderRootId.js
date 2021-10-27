import axios from 'axios'
import folderActions from "../actions/folderActions";


export const apiGetFolderRootId = () =>
    async (dispatch, getState, api) => {
        const gdrive = getState().folderReducer.gdrive
        await axios.get(api + `gdrive/${gdrive}/folder/root`)
            .then(res => {
                const rootId = res.data.data.rootId
                console.log(`rootFolderID = ${rootId}`)
                dispatch(folderActions.rootId(rootId))
            })
            .catch(e => {
                console.log('getFolderRootId PROBLEM', e)
                dispatch(folderActions.clear())
            })
    }
