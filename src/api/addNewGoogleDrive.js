import axios from "axios";
import api from '../config/api'

const addNewGoogleDrive = async (gdrive, authCode) => {
    return await axios.post(api + `gdrive/${gdrive}/authorise`, {authCode})
        .then(res => {
            console.log("addNewGoogleDrive", res.data)
            return res.status
        })
        .catch(e => {
            console.log('getAuthGoogleUrl PROBLEM', e)
            return 500
        })
}

export default addNewGoogleDrive
