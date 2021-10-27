import axios from 'axios'
import folderActions from "../actions/folderActions";


export const apiGetFolderChildren = ( folderId) =>
    async (dispatch, getState, api) =>{
        const gdrive = getState().folderReducer.gdrive
        await axios.get(api+`gdrive/${gdrive}/folder/${folderId}`)
            .then(res=>{
                const children = res.data.data.fileList
                console.log(`folder = ${folderId}`)
                console.log(`folder children = ${children?.length}`)
                console.log(children)
                dispatch(folderActions.setChildren({children, folderId}))
            })
            .catch(e=>{
                console.log('getChildren PROBLEM',e)
                dispatch(folderActions.childrenClear())
            })
    }
