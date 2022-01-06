import axios from "axios";
import api from '../config/api'
import download from 'downloadjs';

const downloadFile = async (gdrive, fileId, fileName) => {
    return await axios
        .get(api + `gdrive/${gdrive}/download/${fileId}/${fileName}`,
            {responseType: 'blob'})
        .then(res => {
            console.log("downloadFile", res.data)
            const blob = res.data
            download(blob, fileName)
            return res.data
        })
        .catch(e => {
            console.log('downloadFile PROBLEM', e)
            return null
        })
}

export default downloadFile
