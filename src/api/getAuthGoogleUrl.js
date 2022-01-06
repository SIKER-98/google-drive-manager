import axios from "axios";
import api from '../config/api'

const getAuthGoogleUrl = async (gdrive) => {
    return await axios.get(api + `gdrive/${gdrive}/authorise`)
        .then(res => {
            console.log("getAuthGoogleUrl", res.data)
            return res.data.data
        })
        .catch(e => {
            console.log('getAuthGoogleUrl PROBLEM', e)
            return null
        })
}

export default getAuthGoogleUrl
