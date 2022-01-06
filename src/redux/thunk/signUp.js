import axios from 'axios'
import authActions from "../actions/authActions";
import {signIn} from "./signIn";

export const signUp = ({username, password, email}) =>
    async (dispatch, getState, api) => {
        console.log('signIn')
        await axios.post(api + `auth/signup`, {
            username,
            password,
            email
        })
            .then(res => {
                const message = res.data.message
                console.log('registered: ', message)
                dispatch(authActions.setMessage('Registered'))
            })
            .catch(e => {
                console.log('signUp PROBLEM', e)
                dispatch(authActions.setMessage('AlreadyExist'))
            })
    }
