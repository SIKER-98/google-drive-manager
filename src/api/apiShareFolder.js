import axios from "axios";
import api from '../config/api'

const apiShareFolder = async (gdrive, {folderId, role}) => {
    return await axios.put(api + `gdrive/${gdrive}/folder/share`, {folderId, role})
        .then(res => {
            return res.data
        })
        .catch(e => {
            console.log('apiShareFolder PROBLEM', e)
            return null
        })
}

export default apiShareFolder
