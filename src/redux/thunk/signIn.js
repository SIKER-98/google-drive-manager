import axios from 'axios'
import authActions from "../actions/authActions";

export const signIn = ({username, password}) =>
    async (dispatch, getState, api) => {
        console.log('signIn')
        await axios.post(api + `auth/signin`, {
            username,
            password
        })
            .then(res => {
                const token = res.data
                console.log('token: ', token)
                dispatch(authActions.setToken(token))
                dispatch(authActions.setMessage('LoginSuccess'))
            })
            .catch(e => {
                console.log('signIn PROBLEM', e)
                dispatch(authActions.setMessage('LoginFailed'))
            })
    }
