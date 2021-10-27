import axios from 'axios'
import folderActions from "../actions/folderActions";

export const apiFetchFolder = () =>
    async (dispatch, getState, api) => {
        const gdrive = getState().folderReducer.gdrive
        console.log('gdrive', gdrive)
        await axios.get(api + `gdrive/${gdrive}/folder`)
            .then(res => {
                const children = res.data.files
                console.log('all Folders: ', children.length)
                const {rootFolderId} = getState()
                dispatch(folderActions.setChildren({children, rootFolderId}))
            })
            .catch(e=>{
                console.log('fetchFolder PROBLEM',e)
                dispatch(folderActions.childrenClear())
            })
    }
