import axios from 'axios'
import authActions from "../actions/authActions";

export const refreshToken = () =>
    async (dispatch, getState, api) => {
        console.log('refreshToken')
        const refreshToken = getState().authReducer.refreshToken
        await axios.post(api + `auth/refreshtoken`, {
            refreshToken
        })
            .then(res => {
                const token = res.data
                console.log('refreshToken: ', token)
                dispatch(authActions.set(token))
            })
            .catch(e => {
                console.log('refreshToken PROBLEM', e)
                dispatch(authActions.clear())
            })
    }
