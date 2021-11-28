import axios from "axios";
import driveActions from "../actions/driveActions";

export const apiGetGoogleDrive = () =>
    async (dispatch, getState, api) => {
        console.log('GetGoogle')
        await axios.get(api + `gdrive`)
            .then(res => {
                const drives = res.data.data
                dispatch(driveActions.clear())
                drives?.forEach(drive => {
                    dispatch(driveActions.add(drive))
                })
            })
            .catch(e => {
                console.log('getGoogleDrive PROBLEM', e)
            })
    }
